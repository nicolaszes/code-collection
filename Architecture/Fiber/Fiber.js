/**
 * @format
 * @Author: your name
 * @Date: 2021-01-20 09:53:10
 * @LastEditTime: 2021-01-20 09:53:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-collection/Architecture/Fiber/Fiber.js
 */

class Node {
  constructor(instance) {
    this.instance = instance
    this.child = null
    this.sibling = null
    this.return = null
  }
}

function link(parent, elements = []) {
  parent.child = (elements || []).reduceRight((previous, current) => {
    const node = new Node(current)
    node.return = parent
    node.sibling = previous
    return node
  }, null)

  return parent.child
}

function doWork(node) {
  console.log(node.instance.name)
  const children = node.instance.render()
  return link(node, children)
}

function walk(o) {
  let root = o
  let current = o

  while (true) {
    // perform work for a node, retrieve & link the children
    let child = doWork(current)

    // if there's a child, set it as the current active node
    if (child) {
      current = child
      continue
    }

    // if we've returned to the top, exit the function
    if (current === root) {
      return
    }

    // keep going up until we find the sibling
    while (!current.sibling) {
      // if we've returned to the top, exit the function
      if (!current.return || current.return === root) {
        return
      }

      // set the parent as the current active node
      current = current.return
    }

    // if found, set the sibling as the current active node
    current = current.sibling
  }
}

const parent = new Node({
  name: 'a1',
  render() {
    return [
      {
        name: 'b1',
        render() {
          return null
        }
      },
      {
        name: 'b2',
        render() {
          return [
            {
              name: 'c1',
              render() {
                return null
              }
            }
          ]
        }
      },
      {
        name: 'b3',
        render() {
          return [
            {
              name: 'c2',
              render() {
                return null
              }
            }
          ]
        }
      }
    ]
  }
})

walk(parent)

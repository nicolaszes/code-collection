// const timeScale = d3.scaleTime()
//   .domain([new Date(2016, 0, 1), new Date()])
//   .range([0, 100])
// 
// console.log(timeScale(new Date(2017, 4, 15)))
// console.log(timeScale(new Date()))
// console.log(timeScale.invert(50))

// const linearScale = d3.scaleLinear()
//   .domain([0, 100])
//   .range([0, 600])
//   .clamp(true)
// 
// console.log(linearScale(0))
// console.log(linearScale(50))
// console.log(linearScale(105))

// const scaleQuantize = d3.scaleQuantize()
//   .domain([0, 100])
//   .range(["red", "white", "green"])
// 
// console.log(scaleQuantize(22))
// console.log(scaleQuantize(50))
// console.log(scaleQuantize(88))
// console.log(scaleQuantize.invertExtent("white"))

// const scaleOrdinal = d3.scaleOrdinal()
// .domain(['poor', 'good', 'great'])
// .range(["red", "white", "green"])
// 
// console.log(scaleOrdinal('poor'))
// console.log(scaleOrdinal('good'))
// console.log(scaleOrdinal('great'))

// const link = d3.select('.title')
//   .selectAll('a')
// 
// console.log(link.size())

// const secondLink = d3.select('.title')
//   .attr('href', 'https://google.com')
//   // .style('color', 'red')
//   .classed('red', true)
//   // .text('Inventery')
//   .insert('button', 'a:first-child')
//     .style('color', 'red')
//     .html('Inventery <b>SALE</b>')
//   .append('button')
//     .classed('red', true)
//     .text('submit')

// d3.select('.action').remove()
// console.log(secondLink.nodes())

const scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 },
]

function scaleBar (selection, scale) {
  selection.style('transform', `scaleX(${scale})`)
}

function fade (selection, opacity) {
  selection.style('fill-opacity', opacity)
}

const bar = d3.select('.chart')
  .append('svg')
    .attr('width', 225)
    .attr('height', 300)
  .selectAll('rect')
  .data(scores, function (d) {
    return d ? d.name : this.innerText
  })
  .style('color', 'blue')
  .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 33})`)

bar.append('rect')
    .text((d) => d.name)
    .attr('class', 'bar')
    .style('width', d => d.score)
    .on('mouseover', function (d, i, elements) {
      d3.select(this).call(scaleBar, 2)
      // console.log(d3.selectAll(elements)
      // .filter(':not(:hover)'))
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .style('fill-opacity', .5)
        // .classed('barOn', true)
    })
    .on('mouseout', function (d, i, elements) {
      d3.selectAll(elements)
        .style('fill-opacity', 1)
      d3.select(this).classed('barOn', false)
      d3.select(this).call(scaleBar, 1)
    })

bar.append('text')
  .text(d => d.name)
  .attr('y', 20)
  .attr('x', 10)
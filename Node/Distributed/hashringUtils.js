var INT_MAX = 0x7FFFFFFF;

var node = function (nodeOpts) {
  nodeOpts = nodeOpts || {};
  if (nodeOpts.address) this.address = nodeOpts.address;
  if (nodeOpts.port) this.port = nodeOpts.port;
};
node.prototype.toString = function () {
  return this.address + ':' + this.port;
};

var ring = function (maxNodes, realNodes) {
  this.nodes = [];
  this.maxNodes = maxNodes;
  this.realNodes = realNodes;

  this.generate();
};
ring.compareNode = function (nodeA, nodeB) {
  return nodeA.address === nodeB.address &&
    nodeA.port === nodeB.port;
};

ring.hashCode = function (str) {
  if (typeof str !== 'string')
    str = str.toString();
  var hash = 1315423911, i, ch;
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }
  return  (hash & INT_MAX);
};
ring.prototype.generate = function () {
  var realLength = this.realNodes.length;
  this.nodes.splice(0); //clear all

  for (var i = 0; i < this.maxNodes; i++) {
    var realIndex = Math.floor(i / this.maxNodes * realLength);
    var realNode = this.realNodes[realIndex];
    var label = realNode.address + '#' + 
      (i - realIndex * Math.floor(this.maxNodes / realLength));
    var virtualNode = ring.hashCode(label);

    this.nodes.push({
      'hash': virtualNode,
      'label': label,
      'node': realNode
    });
  }

  this.nodes.sort(function(a, b){
    return a.hash - b.hash;
  });
};
ring.prototype.select = function (key) {
  if (typeof key === 'string')
    key = ring.hashCode(key);
  for(var i = 0, len = this.nodes.length; i<len; i++){
    var virtualNode = this.nodes[i];
    if(key <= virtualNode.hash) {
      console.log(virtualNode.label);
      return virtualNode.node;
    }
  }
  console.log(this.nodes[0].label);
  return this.nodes[0].node;
};
ring.prototype.add = function (node) {
  this.realNodes.push(node);

  this.generate();
};
ring.prototype.remove = function (node) {
  var realLength = this.realNodes.length;
  var idx = 0;
  for (var i = realLength; i--;) {
    var realNode = this.realNodes[i];
    if (ring.compareNode(realNode, node)) {
      this.realNodes.splice(i, 1);
      idx = i;
      break;
    }
  }
  this.generate();
};
ring.prototype.toString = function () {
  return JSON.stringify(this.nodes);
};

module.exports.node = node;
module.exports.ring = ring;
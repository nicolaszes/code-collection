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

// const scores = [
//   { name: 'Alice', score: 96 },
//   { name: 'Billy', score: 83 },
//   { name: 'Cindy', score: 91 },
//   { name: 'David', score: 96 },
//   { name: 'Emily', score: 88 },
// ]

// function scaleBar (selection, scale) {
//   selection.style('transform', `scaleX(${scale})`)
// }

// function fade (selection, opacity) {
//   selection.style('fill-opacity', opacity)
// }

// const bar = d3.select('.chart')
//   .append('svg')
//     .attr('width', 225)
//     .attr('height', 300)
//   .selectAll('rect')
//   .data(scores, function (d) {
//     return d ? d.name : this.innerText
//   })
//   .style('color', 'blue')
//   .enter()
//     .append('g')
//     .attr('transform', (d, i) => `translate(0, ${i * 33})`)

// bar.append('rect')
//     .text((d) => d.name)
//     .attr('class', 'bar')
//     .style('width', d => d.score)
//     .on('mouseover', function (d, i, elements) {
//       d3.select(this).call(scaleBar, 2)
//       // console.log(d3.selectAll(elements)
//       // .filter(':not(:hover)'))
//       d3.selectAll(elements)
//         .filter(':not(:hover)')
//         .style('fill-opacity', .5)
//         // .classed('barOn', true)
//     })
//     .on('mouseout', function (d, i, elements) {
//       d3.selectAll(elements)
//         .style('fill-opacity', 1)
//       d3.select(this).classed('barOn', false)
//       d3.select(this).call(scaleBar, 1)
//     })

// bar.append('text')
//   .text(d => d.name)
//   .attr('y', 20)
//   .attr('x', 10)

const margin = {
  top: 25,
  right: 25,
  bottom: 40,
  left: 40,
}
const width = 425 - margin.left - margin.right
const height = 625 - margin.top - margin.bottom

const fullWidth = width + margin.left + margin.right
const fullHeight = height + margin.top + margin.bottom

const svg = d3.select('.chart')
  .append('svg')
    .attr('width', fullWidth)
    .attr('height', fullHeight)
    .call(responsify)
    // .attr('viewBox', `0, 0, ${fullWidth * 2}, ${fullHeight * 2}`)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .style('fill', 'lightblue')
  .style('stroke', 'green')

// svg.append('rect')
//   .attr('x', width / 2)
//   .attr('width', width / 2)
//   .attr('height', height)
//   .style('fill', 'lightblue')
//   .style('stroke', 'green')

const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0])

const yAxis = d3.axisLeft(yScale)
  // .ticks(5, 's')
  // .tickValues([8, 19, 43, 77])
svg.call(yAxis)

const xScale = d3.scaleTime()
  .domain([new Date(2016, 0, 1, 6), new Date(2016, 0, 1, 9)])
  .range([0, width])

const xAxis = d3.axisBottom(xScale)
  // .ticks(d3.timeMinute.every(45))
  .ticks(5)
  .tickSizeInner(10)
  .tickSizeOuter(20)
  .tickPadding(15)
svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)

function responsify (svg) {
  console.log(svg)
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style('width')),
    height = parseInt(svg.style('height')),
    aspect = width / height
    console.log(container)

    svg.attr('viewBox', `0, 0, ${width}, ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize)

    d3.select(window).on(`resize.${container.attr('id')}`, resize)
    
    function resize () {
      var targetWidth = parseInt(container.style('width'))
      svg.attr('width', targetWidth)
      svg.attr('height', Math.round(targetWidth / aspect))
    }
}
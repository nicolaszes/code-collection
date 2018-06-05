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

const update = d3.select('.chart')
  .append('svg')
    .attr('width', 225)
    .attr('height', 300)
  .selectAll('rect')
  .data(scores, function (d) {
    return d ? d.name : this.innerText
  })
  .style('color', 'blue')
  .enter()
    .append('rect')
    .attr('y', (d, i) => i * 33)
    .text((d) => d.name)
    .attr('class', 'bar')
    .style('width', d => d.score)

// const enter = update.enter()
//   .append('div')
//   .text((d) => d.name)
//   .style('color', 'green')
  

// update.exit().remove()
// update.merge(enter)
//   // .classed('bar', true)
//   .attr('class', 'bar')
//   .style('width', d => d.score + 'px')
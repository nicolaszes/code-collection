const timeScale = d3.scaleTime()
  .domain([new Date(2016, 0, 1), new Date()])
  .range([0, 100])

const linearScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 600])
  .clamp(true)

const scaleQuantize = d3.scaleQuantize()
  .domain([0, 100])
  .range(["red", "white", "green"])

const scaleOrdinal = d3.scaleOrdinal()
.domain(['poor', 'good', 'great'])
.range(["red", "white", "green"])

// console.log(timeScale(new Date(2017, 4, 15)))
// console.log(timeScale(new Date()))
// console.log(timeScale.invert(50))

// console.log(linearScale(0))
// console.log(linearScale(50))
// console.log(linearScale(105))

// console.log(scaleQuantize(22))
// console.log(scaleQuantize(50))
// console.log(scaleQuantize(88))
// console.log(scaleQuantize.invertExtent("white"))

console.log(scaleOrdinal('poor'))
console.log(scaleOrdinal('good'))
console.log(scaleOrdinal('great'))
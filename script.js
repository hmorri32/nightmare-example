const fs = require('fs')
const Nightmare = require('nightmare');
const nightmare = Nightmare({  show: true });
	
nightmare
	.viewport(1500,1500)
	.goto('http://beachgrit.com')
	.wait(500)
	.evaluate(function() {
		let articles = document.querySelectorAll('article.digest.middle-line.flex')
		let list     = [].slice.call(articles)
		let article  = document.querySelector('article.digest.middle-line.flex')

		hrefs = list.map((article) => {
			return article.children['0'].href.concat(article.children['0'].innerText).split('\n')
		})

		return hrefs.map((element) => element.filter((n) => n != ''))
	})
	.end()
	.then(function(result) {
		console.log(result)
		fs.writeFileSync('output.json', JSON.stringify(result));		
	})
	.catch((error) => console.log(error))	



// nightmare
// 	.viewport(1500,1500)
//   .goto('http://magicseaweed.com/Lunada-Bay-Surf-Report/283/')
//   .wait(500)
//   .scrollTo(1220, 200)
//   .wait(500)
//   .evaluate(function() {

//   	let table = document.querySelectorAll('div#msw-js-fc.msw-fc.msw-fc-us')

//   	let timeStamp  = document.querySelectorAll('td.msw-fc-thour.msw-js-tooltip')
//   	let waveHeight = document.querySelectorAll('td.msw-fc-fps.msw-fc-ps')

//   	let tables = [].slice.call(waveHeight)
//   	let waves  = [].slice.call(waveHeight)
//   	let times  = [].slice.call(timeStamp)

//   	let mapped = times.map(function(node){
//   		return node.innerText
//   	})

//   	let mapped2 = waves.map(function(node) {
//   		return node.innerText
//   	})

//   	return mapped
//   })

//   .end()
//   .then(function (result) {
//   	console.log(result)
//   })
//   .catch((error) => console.log(error))

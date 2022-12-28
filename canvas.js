const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 500
canvas.height = innerHeight

const scoreEl = document.querySelector('#score')

export {
	canvas,
	c,
	scoreEl
}
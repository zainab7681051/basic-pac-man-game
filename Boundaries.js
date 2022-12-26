import {
	Boundary,
	Pellet,
	PowerUp
} from './Classes.js'

const boundaries = []
const pellets = []
const pu = []

const createImage = (src) => {
	const image = new Image()
	image.src = src
	return image
}

//map of the game
const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

map.forEach((row, i) => {
	row.forEach((symbol, j) => {
		switch (symbol) {
		case '-':
			boundaries.push(
				new Boundary({
					position: {
						x: Boundary.width * j,
						y: Boundary.height * i
					},
					image: createImage('/pipeHorizontal.png')
				})
			)
			break
		case '|':
			boundaries.push(
				new Boundary({
					position: {
						x: Boundary.width * j,
						y: Boundary.height * i
					},
					image: createImage('/pipeVertical.png')
				})
			)
			break
		case '1':
			boundaries.push(
				new Boundary({
					position: {
						x: Boundary.width * j,
						y: Boundary.height * i
					},
					image: createImage('/pipeCorner1.png')
				})
			)
			break
		case '2':
			boundaries.push(
				new Boundary({
					position: {
						x: Boundary.width * j,
						y: Boundary.height * i
					},
					image: createImage('/pipeCorner2.png')
				})
			)
			break
		case '3':
			boundaries.push(
				new Boundary({
					position: {
						x: Boundary.width * j,
						y: Boundary.height * i
					},
					image: createImage('/pipeCorner3.png')
				})
			)
			break
		case '4':
			boundaries.push(
				new Boundary({
					position: {
						x: Boundary.width * j,
						y: Boundary.height * i
					},
					image: createImage('/pipeCorner4.png')
				})
			)
			break
		case 'b':
			boundaries.push(
				new Boundary({
					position: {
						x: Boundary.width * j,
						y: Boundary.height * i
					},
					image: createImage('/block.png')
				})
			)
			break
		case '[':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					image: createImage('/capLeft.png')
				})
			)
			break
		case ']':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					image: createImage('/capRight.png')
				})
			)
			break
		case '_':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					image: createImage('/capBottom.png')
				})
			)
			break
		case '^':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					image: createImage('/capTop.png')
				})
			)
			break
		case '+':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					image: createImage('/pipeCross.png')
				})
			)
			break
		case '5':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					color: 'blue',
					image: createImage('/pipeConnectorTop.png')
				})
			)
			break
		case '6':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					color: 'blue',
					image: createImage('/pipeConnectorRight.png')
				})
			)
			break
		case '7':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					color: 'blue',
					image: createImage('/pipeConnectorBottom.png')
				})
			)
			break
		case '8':
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width,
						y: i * Boundary.height
					},
					image: createImage('/pipeConnectorLeft.png')
				})
			)
			break

		case '.':
			pellets.push(
				new Pellet({
					position: {
						x: j * Boundary.width + Boundary.width / 2,
						y: i * Boundary.height + Boundary.height / 2
					}
				})
			)
			break

		case 'p':
			pu.push(
				new PowerUp({
					position: {
						x: j * Boundary.width + Boundary.width / 2,
						y: i * Boundary.height + Boundary.height / 2
					}
				})
			)
			break
		}
	})
})

export {
	boundaries,
	pellets,
	pu
}
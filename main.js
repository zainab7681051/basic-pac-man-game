//minute==>45:36
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
	static width = 40
	static height = 40
	constructor({
		position,
		image
	}) {
		this.position = position
		this.width = 40
		this.height = 40
		this.image = image
	}

	draw() {
		// c.fillStyle = 'blue'
		// c.fillRect(this.position.x,
		// 	this.position.y, this.width,
		// 	this.height)
		c.drawImage(this.image, this.position.x,
			this.position.y)
	}
}

class Player {
	constructor({
		position,
		velocity
	}) {
		this.position = position
		this.velocity = velocity
		this.radius = 15
	}

	draw() {
		c.beginPath()
		c.arc(this.position.x,
			this.position.y,
			this.radius, 0,
			Math.PI * 2)
		c.fillStyle = 'yellow'
		c.fill()
		c.closePath()
	}

	update() {
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}
}

const boundaries = []
const player = new Player({
	position: {
		x: Boundary.width + Boundary.width / 2,
		y: Boundary.height + Boundary.height / 2
	},
	velocity: {
		x: 0,
		y: 0
	}
})

const keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	}
}

let lastKey = ''


const createImage = (src) => {
	const image = new Image()
	image.src = src
	return image
}

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

// Additional cases (does not include the power up pellet that's inserted later in the vid)
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
			/*
					case '.':
						pellets.push(
							new Pellet({
								position: {
									x: j * Boundary.width + Boundary.width / 2,
									y: i * Boundary.height + Boundary.height / 2
								}
							})
						)
						break*/
		}
	})
})

//c==player circle, r==boundary rectangle
const collisionDetec = ({
	c,
	r
}) => {
	return (c.position.y - c.radius +
		c.velocity.y <=
		r.position.y + r.height &&
		c.position.x + c.radius +
		c.velocity.x >=
		r.position.x &&
		c.position.y +
		c.radius + c.velocity.y >=
		r.position.y &&
		c.position.x -
		c.radius + c.velocity.x <=
		r.position.x +
		r.width)
}

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)

	if (keys.w.pressed && lastKey === 'w') {

		for (let i = 0; i < boundaries.length; i++) {
			const boundry = boundaries[i]
			if (collisionDetec({
					c: {
						...player,
						velocity: {
							x: 0,
							y: -5
						}
					},
					r: boundry
				})) {

				player.velocity.y = 0
				break;
			} else {
				player.velocity.y = -5
			}
		}

	} else if (keys.a.pressed && lastKey === 'a') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundry = boundaries[i]
			if (collisionDetec({
					c: {
						...player,
						velocity: {
							x: -5,
							y: 0
						}
					},
					r: boundry
				})) {

				player.velocity.x = 0
				break;
			} else {
				player.velocity.x = -5
			}
		}

	} else if (keys.s.pressed && lastKey === 's') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundry = boundaries[i]
			if (collisionDetec({
					c: {
						...player,
						velocity: {
							x: 0,
							y: 5
						}
					},
					r: boundry
				})) {

				player.velocity.y = 0
				break;
			} else {
				player.velocity.y = 5
			}
		}

	} else if (keys.d.pressed && lastKey === 'd') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundry = boundaries[i]
			if (collisionDetec({
					c: {
						...player,
						velocity: {
							x: 5,
							y: 0
						}
					},
					r: boundry
				})) {

				player.velocity.x = 0
				break;
			} else {
				player.velocity.x = 5
			}
		}

	}

	boundaries.forEach((boundary) => {
		boundary.draw()

		if (collisionDetec({
				c: player,
				r: boundary
			})) {

			player.velocity.y = 0
			player.velocity.x = 0

		}
	})

	player.update()

}

animate()

addEventListener('keydown', ({
	key
}) => {
	switch (key) {
	case 'w': //up
		keys.w.pressed = true
		lastKey = 'w'
		break;
	case 'a': //left
		keys.a.pressed = true
		lastKey = 'a'
		break
	case 's': //down
		keys.s.pressed = true
		lastKey = 's'
		break
	case 'd': //right
		keys.d.pressed = true
		lastKey = 'd'
		break
	}
})

addEventListener('keyup', ({
	key
}) => {
	switch (key) {
	case 'w': //up
		keys.w.pressed = false
		break;
	case 'a': //left
		keys.a.pressed = false
		break
	case 's': //down
		keys.s.pressed = false
		break
	case 'd': //right
		keys.d.pressed = false
		break
	}
})
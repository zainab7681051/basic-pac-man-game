import {
	Boundary,
	Player,
	Ghost,
	Pellet,
	PowerUp
} from './Classes.js'

import {
	boundaries,
	pellets,
	pu
} from './Boundaries.js'

import {
	collisionDetec
} from './collisionDetection.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 500
canvas.height = innerHeight

const scoreEl = document.querySelector('#score')


const ghosts = [
	new Ghost({
		position: {
			x: Boundary.width * 6 + Boundary.width / 2,
			y: Boundary.height + Boundary.height / 2
		},
		velocity: {
			x: Ghost.speed,
			y: 0
		}
	}),
	new Ghost({
		position: {
			x: Boundary.width * 6 + Boundary.width / 2,
			y: Boundary.height * 3 + Boundary.height / 2
		},
		velocity: {
			x: Ghost.speed,
			y: 0
		},
		color: 'pink'
	}),
	new Ghost({
		position: {
			x: Boundary.width * 3 + Boundary.width / 2,
			y: Boundary.height * 5 + Boundary.height / 2
		},
		velocity: {
			x: Ghost.speed,
			y: 0
		},
		color: 'green'
	}),
]

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

let score = 0



let animeID = null

function animate() {
	animeID = requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)

	if (keys.w.pressed && lastKey === 'w') {

		//player and boundary collision
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

	//win condition
	if (pellets.length === 0) {
		cancelAnimationFrame(animeID)
		document.querySelector('.win')
			.classList.remove('hideMessage')
		document.querySelector('.button-64')
			.classList.remove('hideButton')
	}

	//powerup

	for (let i = pu.length - 1; i >= 0; i--) {
		const p = pu[i]
		p.draw()
		if (Math.hypot(
				p.position.x - player.position.x,
				p.position.y - player.position.y
			) <
			p.radius + player.radius) {
			pu.splice(i, 1)

			ghosts.forEach((ghost) => {
				ghost.scared = true

				setTimeout(() => {
					ghost.scared = false
				}, 5000)
			})
		}
	}

	//ghost and player collision

	for (let i = ghosts.length - 1; i >= 0; i--) {
		const ghost = ghosts[i]

		if (Math.hypot(ghost.position.x -
				player.position.x, ghost.position.y -
				player.position.y
			) <
			ghost.radius + player.radius) {

			if (ghost.scared) {
				ghosts.splice(i, 1)
			} else {
				cancelAnimationFrame(animeID)
				document.querySelector('.lose')
					.classList.remove('hideMessage')
				document.querySelector('.button-64')
					.classList.remove('hideButton')

			}
		}
	}


	//pellets
	for (let i = pellets.length - 1; i >= 0; i--) {
		const p = pellets[i]
		p.draw()

		if (Math.hypot(p.position.x -
				player.position.x, p.position.y -
				player.position.y
			) <
			p.radius + player.radius) {
			pellets.splice(i, 1)
			score += 10
			scoreEl.innerHTML = score
		}
	}

	//boundaries
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

	//ghosts
	ghosts.forEach((ghost) => {
		ghost.update()

		const collision = []
		boundaries.forEach((boundry) => {
			if (!collision.includes('right') &&
				collisionDetec({
					c: {
						...ghost,
						velocity: {
							x: ghost.speed,
							y: 0
						}
					},
					r: boundry
				})) {
				collision.push('right')
			} else if (!collision.includes('left') &&
				collisionDetec({
					c: {
						...ghost,
						velocity: {
							x: -ghost.speed,
							y: 0
						}
					},
					r: boundry
				})) {
				collision.push('left')
			} else if (!collision.includes('up') &&
				collisionDetec({
					c: {
						...ghost,
						velocity: {
							x: 0,
							y: -ghost.speed
						}
					},
					r: boundry
				})) {
				collision.push('up')
			} else if (!collision.includes('down') &&
				collisionDetec({
					c: {
						...ghost,
						velocity: {
							x: 0,
							y: ghost.speed
						}
					},
					r: boundry
				})) {
				collision.push('down')
			}
		})
		if (collision.length > ghost.prevCollisions.length) {
			ghost.prevCollisions = collision
		}

		if (JSON.stringify(collision) !==
			JSON.stringify(ghost.prevCollisions)) {

			if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
			else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
			else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')
			else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')

			const pathways = ghost.prevCollisions.filter((col) => {
				return !collision.includes(col)
			})
			const direction = pathways[Math.floor(Math.random() * pathways.length)]

			switch (direction) {
			case 'down':
				ghost.velocity.y = ghost.speed
				ghost.velocity.x = 0
				break
			case 'up':
				ghost.velocity.y = -ghost.speed
				ghost.velocity.x = 0
				break
			case 'right':
				ghost.velocity.x = ghost.speed
				ghost.velocity.y = 0
				break
			case 'left':
				ghost.velocity.x = -ghost.speed
				ghost.velocity.y = 0
				break
			}

			ghost.prevCollisions = []

		}
	})

	//player rotation according to the directions
	//x>0 === player is going to the right
	//x<0 === player is goint to the left
	//y<0 === ...up
	//y>0 === ...down
	if (player.velocity.x > 0) player.rotation = 0
	else if (player.velocity.x < 0) player.rotation = Math.PI
	else if (player.velocity.y > 0) player.rotation = Math.PI / 2
	else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5


}

animate() //start of animation

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

export {
	c
}
import {
	c
} from './main.js'

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
		this.radians = 0.75
		this.openRate = 0.12
		this.rotation = 0
	}

	draw() {
		c.save()
		c.translate(this.position.x, this.position.y)
		c.rotate(this.rotation)
		c.translate(-this.position.x, -this.position.y)
		c.beginPath()
		c.arc(this.position.x,
			this.position.y,
			this.radius,
			this.radians,
			Math.PI * 2 - this.radians)
		c.lineTo(this.position.x, this.position.y)
		c.fillStyle = 'yellow'
		c.fill()
		c.closePath()
		c.restore()
	}

	update() {
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.radians < 0 || this.radians > .75) {
			this.openRate = -this.openRate
		}

		this.radians += this.openRate
	}
}

class Ghost {
	static speed = 2
	constructor({
		position,
		velocity,
		color = 'red'
	}) {
		this.position = position
		this.velocity = velocity
		this.radius = 15
		this.color = color
		this.prevCollisions = []
		this.speed = 2
		this.scared = false
	}

	draw() {
		c.beginPath()
		c.arc(this.position.x,
			this.position.y,
			this.radius, 0,
			Math.PI * 2)
		c.fillStyle = this.scared ? 'blue' : this.color
		c.fill()
		c.closePath()
	}

	update() {
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}
}


class Pellet {
	constructor({
		position,
		velocity
	}) {
		this.position = position
		this.radius = 3
	}

	draw() {
		c.beginPath()
		c.arc(this.position.x,
			this.position.y,
			this.radius, 0,
			Math.PI * 2)
		c.fillStyle = 'white'
		c.fill()
		c.closePath()
	}

}

class PowerUp {
	constructor({
		position,
		velocity
	}) {
		this.position = position
		this.radius = 8
	}

	draw() {
		c.beginPath()
		c.arc(this.position.x,
			this.position.y,
			this.radius, 0,
			Math.PI * 2)
		c.fillStyle = 'orange'
		c.fill()
		c.closePath()
	}

}
export {
	Boundary,
	Player,
	Ghost,
	Pellet,
	PowerUp
}
import {
	Boundary
} from './Classes.js'

//c==player circle, r==boundary rectangle
export const collisionDetec = ({
	c,
	r
}) => {
	const padding = Boundary.width / 2 - c.radius - 1
	return (c.position.y - c.radius +
		c.velocity.y <=
		r.position.y + r.height + padding &&
		c.position.x + c.radius +
		c.velocity.x >=
		r.position.x - padding &&
		c.position.y +
		c.radius + c.velocity.y >=
		r.position.y - padding &&
		c.position.x -
		c.radius + c.velocity.x <=
		r.position.x +
		r.width + padding)
}
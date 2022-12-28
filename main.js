import {
	showLoader
} from './loader.js'
import {
	animate
} from './animate.js'

showLoader()
setTimeout(() => {
	animate() //start of animation
}, 5000)
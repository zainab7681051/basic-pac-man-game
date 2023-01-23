import {
	showLoader
} from './loader.js'
import {
	animate
} from './animate.js'

import {
	initializeApp
} from "firebase/app";

showLoader()
setTimeout(() => {
	animate() //start of animation
}, 5000)


const firebaseConfig = {
	apiKey: "AIzaSyDWUHzaCyIJCAyYjxCOdJW1NHsv8scshK8",
	authDomain: "basic-pacman-game.firebaseapp.com",
	projectId: "basic-pacman-game",
	storageBucket: "basic-pacman-game.appspot.com",
	messagingSenderId: "965591018183",
	appId: "1:965591018183:web:5242a2fec1efdd2b382ce2"
};

const app = initializeApp(firebaseConfig);
const showLoader = () => {

	document.querySelector('.loaderContain')
		.classList.remove('hideLoader');
}

const hideLoader = () => {
	document.querySelector('.loaderContain')
		.classList.add('hideLoader');
	document.querySelector('.scoreDiv')
		.classList.remove('hide');
}

export {
	showLoader,
	hideLoader
}
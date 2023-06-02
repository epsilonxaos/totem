import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		const element = document.getElementById(location.hash.replace('#', ''))
		setTimeout(() => {
			window.scrollTo({
				behavior: element ? 'smooth' : 'auto',
				top: element ? element.offsetTop : 0,
			})
		}, 100)
	}, [pathname])

	return null
}

export default ScrollToTop

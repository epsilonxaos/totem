export const iframeOpener = url => openIframe(url)

const openIframe = url => {
	window.dispatchEvent(new CustomEvent('open-iframe', { detail: { url } }))
	document.querySelector('#immersive-experience-overlay').classList.add('open')
}

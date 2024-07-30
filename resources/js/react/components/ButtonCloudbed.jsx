import { iframeOpener } from './services/Cloudbed'

const ButtonCloudbed = () => {
	return (
		<button
			type='button'
			className='px-8 py-3 inline text-sm max-w-max bg-verdigris text-white rounded-md mx-auto'
			onClick={() => iframeOpener('https://hotels.cloudbeds.com/reservation/KS15cS')}>
			¡Reserva Ahora!
		</button>
	)
}

export default ButtonCloudbed

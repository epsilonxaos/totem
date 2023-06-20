import React, { useRef } from 'react'
import { IMaskInput } from 'react-imask'

const MaskedInput = ({
	onChange = () => {},
	min,
	max,
	normalizeZeros = false,
	focusFn,
	value = '',
	dispatch,
	forInput,
	mask,
	placeholder,
	titulo,
}) => {
	// const [val, setValue] = useState(value);
	const ref = useRef(null)
	const inputRef = useRef(null)

	return (
		<div>
			{titulo && (
				<label
					className='block mb-2 text-sm font-medium text-white'
					htmlFor={forInput}>
					{titulo}
				</label>
			)}
			<IMaskInput
				{...(focusFn && { onFocus: focusFn })}
				{...(min && { min: min })}
				{...(max && { max: max })}
				normalizeZeros={true}
				ref={ref}
				inputRef={inputRef}
				{...(dispatch && { dispatch: dispatch })}
				mask={mask}
				radix='.'
				value={value}
				unmask={false}
				id={forInput}
				name={forInput}
				placeholder={placeholder}
				lazy={false}
				onAccept={onChange}
				onChange={() => {}}
				className='bg-transparent border-2 border-verdigris text-white placeholder:text-slate-500 text-sm block w-full p-2.5'
			/>
		</div>
	)
}

export default MaskedInput

import React, { useRef } from 'react'
import { IMaskInput } from 'react-imask'

const MaskedInput = ({
	onChange = e => {},
	min = undefined,
	max = undefined,
	normalizeZeros = false,
	focusFn = undefined,
	value = '',
	dispatch = undefined,
	forInput = '',
	mask = '',
	placeholder = '',
	titulo = '',
}) => {
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
				{...(min && { min })}
				{...(max && { max })}
				normalizeZeros={true}
				ref={ref}
				inputRef={inputRef}
				{...(dispatch && { dispatch })}
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

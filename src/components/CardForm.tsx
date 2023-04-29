import React, { ReactHTMLElement, useState } from 'react'

const CardForm = () => {
	const [card, setCard] = useState('')
	const [date, setDate] = useState('')
	const [cvv, setCVV] = useState('')
	const [dateErr, setDateErr] = useState(false)
	const [cardErr, setCardErr] = useState(false)
	const [cvvErr, setCVVErr] = useState(false)
	const [typeCard, setTypeCard] = useState<'' | 'VISA' | 'MC' | 'MIR' | 'AE'>(
		''
	)

	const cardNumberBeutify = (value: string | null) => {
		const temp = value
			?.match(/\d{4}|\d+/g)
			?.reduce((acc: string, el: string) => {
				if (el.length === 4) {
					return acc + el + ' '
				}

				return acc + el
			}, '')

		return temp
	}

	const dateBeautify = (value: string | null) => {
		const temp = value?.match(/\d{2}|\d+/g)?.join('/')
		return temp
	}

	const cardValidation = () => {
		const cardTotal = card.replaceAll(' ', '')
		if (cardTotal.length != 16) {
			setCardErr(true)
		}
	}

	const dateValidation = () => {
		const tempExpMonth = date[0] + date[1]
		const expMonth =
			tempExpMonth[0] === '0' ? Number(date[1]) : Number(tempExpMonth)

		const expYear = Number(date[3] + date[4])
		const curDate = new Date()
		const curMonth = curDate.getMonth() + 1
		const curYear = curDate.getFullYear() - 2000 // 23 > 22

		if (curYear >= expYear && curMonth > expMonth) {
			return setDateErr(true)
		}
		if (curYear > expYear) {
			return setDateErr(true)
		}
		if (expMonth > 12) {
			return setDateErr(true)
		}
		if (date.length != 5) {
			return setDateErr(true)
		}
		console.log(curYear, expYear)
	}

	const cvvValidation = () => {
		if (cvv.length !== 3) {
			setCVVErr(true)
		}
	}

	const handleDate = (e: React.FormEvent<HTMLInputElement>) => {
		const regex = /^\d+$/gim
		const value = e.currentTarget.value.replace(/\//g, '')
		if (regex.test(value) && value.length <= 4) {
			const temp = dateBeautify(value)
			setDate(temp ?? '')
			setDateErr(false)
		}
		if (!value) {
			setDate('')
		}
	}

	const handleCVV = (e: React.FormEvent<HTMLInputElement>) => {
		const regex = /^\d+$/gim
		const value = e.currentTarget.value

		if (regex.test(value) && value.length <= 3) {
			setCVV(value ?? '')
			setCVVErr(false)
		}
		if (!value) {
			setCVV('')
		}
	}

	const getTypeCard = (char: string) => {
		switch (char) {
			case '2':
				return 'MIR'
			case '3':
				return 'AE'
			case '4':
				return 'VISA'
			case '5':
				return 'MC'
			default:
				return ''
		}
	}

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const regex = /^\d+$/gim
		const value = e.currentTarget.value.replace(/\s/g, '')
		if (regex.test(value) && value.length <= 16) {
			const temp = cardNumberBeutify(value)
			const typeCard = getTypeCard(temp![0])
			setCard(temp?.trim() ?? '')
			setCardErr(false)
			setTypeCard(typeCard)
		}

		if (!value) {
			setCard('')
			setTypeCard('')
		}
	}

	const handleSubmit = () => {
		if (
			card.length &&
			date.length &&
			dateErr === false &&
			cvv.length &&
			cvvErr === false &&
			cardErr === false
		) {
			alert(`Спасибо за покупку!`)
		} else {
			alert(`Во время покупки произошла ошибка, проверьте введённые данные`)
		}
	}

	return (
		<form className='' onSubmit={handleSubmit}>
			<div className='mx-2 h-36 w-64 border border-black rounded-lg p-5 z-30 absolute bg-white shadow-lg'>
				<div className='flex gap-2 '>
					<span className='text-xs'>Номер карты</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						height='20'
						width='30'
						viewBox='-74.7 -40.204 647.4 241.224'
					>
						<defs>
							<linearGradient
								x1='0'
								y1='0'
								x2='1'
								y2='0'
								gradientUnits='userSpaceOnUse'
								gradientTransform='scale(89.72793 -89.72793) rotate(-20.218 .966 -.457)'
								spreadMethod='pad'
								id='b'
							>
								<stop
									offset='0'
									style={{
										stopColor: typeCard === 'VISA' ? '#222357' : '#808080',
									}}
								/>
								<stop
									offset='1'
									style={{
										stopColor: typeCard === 'VISA' ? '#254aa5' : '#808080',
									}}
								/>
							</linearGradient>
							<clipPath clipPathUnits='userSpaceOnUse' id='a'>
								<path d='M413.742 90.435c-.057-4.494 4.005-7.002 7.065-8.493 3.144-1.53 4.2-2.511 4.188-3.879-.024-2.094-2.508-3.018-4.833-3.054-4.056-.063-6.414 1.095-8.289 1.971l-1.461-6.837c1.881-.867 5.364-1.623 8.976-1.656 8.478 0 14.025 4.185 14.055 10.674.033 8.235-11.391 8.691-11.313 12.372.027 1.116 1.092 2.307 3.426 2.61 1.155.153 4.344.27 7.959-1.395l1.419 6.615c-1.944.708-4.443 1.386-7.554 1.386-7.98 0-13.593-4.242-13.638-10.314m34.827 9.744c-1.548 0-2.853-.903-3.435-2.289l-12.111-28.917h8.472l1.686 4.659h10.353l.978-4.659h7.467l-6.516 31.206h-6.894m1.185-8.43l2.445-11.718h-6.696l4.251 11.718m-46.284 8.43l-6.678-31.206h8.073l6.675 31.206h-8.07m-11.943 0l-8.403-21.24-3.399 18.06c-.399 2.016-1.974 3.18-3.723 3.18h-13.737l-.192-.906c2.82-.612 6.024-1.599 7.965-2.655 1.188-.645 1.527-1.209 1.917-2.742l6.438-24.903h8.532l13.08 31.206h-8.478' />
							</clipPath>
						</defs>
						<g
							clipPath='url(#a)'
							transform='matrix(4.98469 0 0 -4.98469 -1804.82 502.202)'
						>
							<path
								d='M0 0l98.437 36.252 22.394-60.809-98.436-36.252'
								fill='url(#b)'
								transform='translate(351.611 96.896)'
							/>
						</g>
					</svg>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						height='20'
						width='30'
						id='svg895'
						version='1.1'
						viewBox='-96 -98.908 832 593.448'
					>
						<defs id='defs879'>
							<style id='style877' type='text/css'></style>
						</defs>
						<path
							id='rect887'
							display='inline'
							// fill='#ff5f00'
							style={{ fill: typeCard === 'MC' ? '#ff5f00' : '#808080' }}
							stroke-width='5.494'
							d='M224.833 42.298h190.416v311.005H224.833z'
						/>
						<path
							id='path889'
							d='M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z'
							// fill='#eb001b'
							style={{ fill: typeCard === 'MC' ? '#eb001b' : '#808080' }}
							stroke-width='5.494'
						/>
						<path
							id='path891'
							d='M621.101 320.394v-6.372h2.747v-1.319h-6.537v1.319h2.582v6.373zm12.691 0v-7.69h-1.978l-2.307 5.493-2.308-5.494h-1.977v7.691h1.428v-5.823l2.143 5h1.483l2.143-5v5.823z'
							className='e'
							// fill='#f79e1b'
							style={{ fill: typeCard === 'MC' ? '#f79e1b' : '#D3D3D3' }}
							stroke-width='5.494'
						/>
						<path
							id='path893'
							d='M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z'
							className='e'
							// fill='#f79e1b'
							style={{ fill: typeCard === 'MC' ? '#f79e1b' : '#D3D3D3' }}
							strokeWidth='5.494'
						/>
					</svg>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 192.756 192.756'
						className=''
					>
						<g fillRule='evenodd' clipRule='evenodd'>
							<path
								style={{
									fill: typeCard === 'AE' ? '#fff' : '#fff',
								}}
								d='M0 0h192.756v192.756H0V0z'
							/>
							<path
								d='M8.484 177.699h-.551c0-.275-.138-.689-.138-.828 0-.137 0-.412-.414-.412h-.828v1.24h-.414v-2.896h1.242c.552 0 .965.139.965.689 0 .414-.138.553-.275.689.138.139.275.277.275.553v.551c0 .139 0 .139.138.139v.275zm-.551-2.068c0-.414-.276-.414-.414-.414h-.966v.828h.828c.276 0 .552-.139.552-.414zm2.345.551c0-1.654-1.379-3.035-3.173-3.035-1.655 0-3.035 1.381-3.035 3.035 0 1.793 1.38 3.174 3.035 3.174 1.793-.001 3.173-1.381 3.173-3.174zm-.414 0c0 1.518-1.241 2.621-2.759 2.621s-2.621-1.104-2.621-2.621c0-1.379 1.104-2.621 2.621-2.621s2.759 1.242 2.759 2.621zM179.818 120.451c0 4.139-2.621 6.068-7.312 6.068h-8.965v-4.139h8.965c.828 0 1.518-.137 1.795-.412.275-.277.551-.691.551-1.242 0-.553-.275-1.104-.551-1.379-.277-.277-.828-.414-1.656-.414-4.275-.139-9.656.137-9.656-5.932 0-2.76 1.793-5.795 6.621-5.795h9.242v4.139h-8.553c-.826 0-1.379 0-1.793.275-.414.414-.689.828-.689 1.518s.414 1.104.965 1.381c.553.137 1.105.275 1.795.275h2.482c2.621 0 4.277.551 5.381 1.518.826.965 1.378 2.208 1.378 4.139zm-19.451-4.139c-1.104-.967-2.76-1.518-5.381-1.518h-2.482c-.689 0-1.242-.139-1.793-.275-.553-.277-.965-.691-.965-1.381s.137-1.104.689-1.518c.414-.275.965-.275 1.793-.275h8.553v-4.139h-9.242c-4.967 0-6.623 3.035-6.623 5.795 0 6.068 5.381 5.793 9.658 5.932.826 0 1.379.137 1.654.414.275.275.553.826.553 1.379 0 .551-.277.965-.553 1.242-.414.275-.965.412-1.793.412h-8.967v4.139h8.967c4.689 0 7.311-1.93 7.311-6.068 0-1.931-.551-3.174-1.379-4.139zm-17.658 6.208h-10.896v-3.863h10.621v-3.861h-10.621v-3.588h10.896v-4H127.26v19.312h15.449v-4zm-20.416-14.346c-1.518-.828-3.311-.967-5.656-.967h-10.621v19.312h4.689v-7.035h4.967c1.654 0 2.621.139 3.311.828.828.965.828 2.621.828 3.863v2.344h4.551v-3.725c0-1.793-.137-2.621-.689-3.586-.414-.553-1.24-1.242-2.344-1.656 1.24-.412 3.311-2.068 3.311-5.104-.001-2.206-.829-3.448-2.347-4.274zm-26.21-.967H81.322l-5.932 6.346-5.656-6.346H51.111v19.312h18.348l5.932-6.346 5.656 6.346h8.967v-6.482h5.794c4 0 8.002-1.104 8.002-6.484-.001-5.242-4.14-6.346-7.727-6.346zm22.485 8.002c-.689.275-1.379.275-2.207.275l-5.656.139v-4.416h5.656c.828 0 1.656 0 2.207.414.553.277.965.828.965 1.656s-.412 1.518-.965 1.932zm-22.485.965h-6.07v-4.967h6.07c1.656 0 2.759.691 2.759 2.346 0 1.656-1.104 2.621-2.759 2.621zm-17.796.689l7.173-7.586v15.588l-7.173-8.002zm-11.174 5.657h-11.45v-3.863h10.208v-3.861H55.663v-3.588h11.588l5.104 5.656-5.242 5.656zm99.875-29.246h-6.621l-8.691-14.485v14.485h-9.379l-1.795-4.277h-9.656l-1.793 4.277h-5.381c-2.207 0-5.104-.552-6.758-2.208-1.518-1.655-2.346-3.862-2.346-7.311 0-2.897.414-5.518 2.482-7.587 1.379-1.518 3.863-2.207 7.035-2.207h4.414V78.1h-4.414c-1.654 0-2.621.276-3.586 1.104-.828.828-1.242 2.345-1.242 4.414s.414 3.587 1.242 4.553c.689.689 1.932.965 3.172.965h2.07l6.621-15.174h6.898l7.725 18.209v-18.21h7.174l8.139 13.381V73.961h4.689v19.313h.001zm-54.765-19.313h-4.689v19.313h4.689V73.961zm-9.795.828c-1.518-.828-3.172-.828-5.517-.828H86.288v19.313h4.552v-7.036h4.966c1.656 0 2.76.138 3.449.828.828.966.689 2.622.689 3.725v2.483h4.689v-3.863c0-1.655-.137-2.483-.826-3.449-.414-.552-1.242-1.242-2.207-1.655 1.24-.552 3.311-2.069 3.311-5.104.001-2.207-.966-3.449-2.483-4.414zM82.977 89.274h-10.76v-3.863h10.622v-4H72.217v-3.449h10.76v-4h-15.45v19.313h15.45v-4.001zM64.078 73.961h-7.587l-5.656 13.105-6.07-13.105h-7.449V92.17l-7.863-18.209h-6.897l-8.277 19.313h4.966l1.793-4.277h9.656l1.793 4.277h9.381V78.1l6.759 15.174h4l6.76-15.174v15.174h4.69V73.961h.001zm74.77 10.898l-3.174-7.587-3.172 7.587h6.346zm-40.006-3.034c-.689.414-1.379.414-2.345.414H90.84v-4.276h5.656c.828 0 1.792 0 2.345.276.551.414.828.966.828 1.793s-.276 1.516-.827 1.793zm-76.149 3.034l3.173-7.587 3.173 7.587h-6.346zm156.022-71.458H14.14v69.527l5.656-12.829h12.001l1.656 3.173v-3.173h14.071l3.173 6.897 3.035-6.897h44.834c2.068 0 3.861.414 5.242 1.517v-1.517h12.277v1.517c2.068-1.104 4.689-1.517 7.725-1.517h17.795l1.656 3.173v-3.173h13.105l1.932 3.173v-3.173h12.828v27.038H158.16l-2.482-4.138v4.138h-16.141l-1.793-4.414h-4.002l-1.793 4.414h-8.414c-3.311 0-5.795-.828-7.449-1.655v1.655H96.083v-6.208c0-.828-.138-.966-.69-.966h-.689v7.173H56.077v-3.449l-1.379 3.449h-8.139l-1.379-3.311v3.311H29.591l-1.655-4.414h-4.001l-1.793 4.414H14.14v81.529h164.575V129.14c-1.793.828-4.277 1.242-6.76 1.242h-12.002v-1.656c-1.379 1.105-3.863 1.656-6.207 1.656h-37.799v-6.207c0-.828-.137-.828-.828-.828h-.689v7.035h-12.416v-7.311c-2.068.965-4.414.965-6.483.965h-1.38v6.346H78.977l-3.586-4.139-4 4.139H46.972v-27.037h24.831l3.587 4.137 3.863-4.137h16.692c1.93 0 5.104.275 6.483 1.654v-1.654h14.898c1.518 0 4.416.275 6.346 1.654v-1.654h22.486V105c1.242-1.104 3.588-1.654 5.656-1.654h12.553V105c1.381-.965 3.311-1.654 5.795-1.654h8.553V13.401z'
								// fill='#0077a6'
								style={{
									fill: typeCard === 'AE' ? '#0077a6' : '#C0C0C0',
								}}
							/>
						</g>
					</svg>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='252.448 288.608 776.384 219.776'
					>
						<path
							style={{
								fill: typeCard === 'MIR' ? '#4DB45E' : '#C0C0C0',
							}}
							d='M461.664 288.608v.096c-.096 0-30.336-.096-38.4 28.8-7.392 26.496-28.224 99.616-28.8 101.632h-5.76s-21.312-74.752-28.8-101.728c-8.064-28.896-38.4-28.8-38.4-28.8h-69.056v219.776h69.088V377.855h5.76l40.32 130.528h47.968l40.32-130.432h5.76v130.432h69.088V288.608h-69.088zM714.048 288.608s-20.256 1.824-29.76 23.041L635.36 419.136h-5.76V288.608h-69.088v219.776h65.248s21.216-1.92 30.721-23.04l47.968-107.488h5.76v130.528h69.088V288.608h-65.249zM810.016 388.416v119.968h69.088v-70.048h74.849c32.64 0 60.256-20.832 70.528-49.888H810.016v-.032z'
						/>
						<linearGradient
							id='a'
							gradientUnits='userSpaceOnUse'
							x1='1065.561'
							y1='-978.524'
							x2='1779.66'
							y2='-978.524'
							gradientTransform='matrix(.32 0 0 .32 459.34 646.84)'
						>
							<stop
								style={{
									stopColor: typeCard === 'MIR' ? '#00b4e6' : '#C0C0C0',
								}}
								offset='.3'
							/>
							<stop
								offset='1'
								style={{
									stopColor: typeCard === 'MIR' ? '#088ccb' : '#C0C0C0',
								}}
							/>
						</linearGradient>
						<path
							fill='url(#a)'
							d='M953.984 288.608H800.32c7.68 41.856 39.071 75.424 79.647 86.368a110.449 110.449 0 0 0 28.896 3.841h118.432c1.056-4.992 1.536-10.08 1.536-15.36.001-41.345-33.503-74.849-74.847-74.849z'
						/>
					</svg>
				</div>

				<input
					value={card}
					className='border border-black mt-1'
					style={{ borderColor: cardErr ? 'red' : 'black' }}
					onChange={(e: any) => handleInput(e)}
					onBlur={() => cardValidation()}
				/>
				<div className='flex items-end	gap-2 justify-between mt-4'>
					<span className='uppercase text-xs'>Срок действия</span>
					<div className='flex flex-col'>
						<span className='uppercase text-xs '>месяц/год</span>
						<input
							className='w-12 self-end border border-black	'
							style={{ borderColor: dateErr ? 'red' : 'black' }}
							value={date}
							onChange={(e: any) => handleDate(e)}
							onBlur={() => dateValidation()}
						/>
					</div>
				</div>
			</div>
			<div className='mx-2 -mt-2 ml-32 h-36 w-64 border z-10 absolute border-black rounded-lg p-5 bg-white shadow-md'>
				<div className='w-64 -ml-5  h-7 bg-black'></div>
				<div className='flex flex-col'>
					<span className='uppercase text-xs self-end w-20 pt-1'>
						CVV / CVC
					</span>
					<input
						className='w-20 self-end border border-black	'
						style={{ borderColor: cvvErr ? 'red' : 'black' }}
						value={cvv}
						onBlur={cvvValidation}
						onChange={(e: any) => handleCVV(e)}
					/>
					<span className='text-xs leading-3 self-end w-20 text-gray-500 pt-1'>
						Последние три цифры на обороте
					</span>
				</div>
			</div>
			<button className='uppercase bg-red-500 text-white p-2 rounded mt-40 ml-60'>
				оплатить
			</button>
		</form>
	)
}

export default CardForm

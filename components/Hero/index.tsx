/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import Header from '../Header';
import Login from '../Login/login';
import Modal from '../modal';

function Hero() {
	const { isModalopen, toggleModal } = useModal();

	return (
		<>
			{isModalopen && (
				<Modal toggleModal={toggleModal}>
					<Login toggleModal={toggleModal} />
				</Modal>
			)}
			<LandingPage>
				<div className='landingpage__container'>
					<div className='landingpage__row'>
						<div className='landingpage__col landingpage__col-50'>
							<div className='landingpage__text'>
								<h1 className='landingpage__text-h1'>
									Discover mobile UI used by{' '}
									<span className='ring-wrapper'>
										<span className='ring-wrapper-svg'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 120 68'
												className='stroke-width'
											>
												<g
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
												>
													<path d='M105 10C28-9-29 40 34 56c62 16 91-29 66-29'></path>
													<path d='M109 16C82-20-56 21 30 55s105-27 75-45'></path>
												</g>
											</svg>
										</span>
										Africa's
									</span>{' '}
									top companies
								</h1>

								<div className='landingpage__text-h2 marg-tb-xs'>
									Save hours of research time with UiLand's curated collection
									of the best in-production android interfaces and screenshots
									and become a better designer.
								</div>
								<div onClick={() => toggleModal()}>
									<button className='landingpage__text-button'>
										<a>Get Started</a>
									</button>
								</div>
							</div>
						</div>
						<div className='landingpage__col landingpage__gridcol-50'>
							<div className='static-logo'>
								{' '}
								<h3>UL</h3>
							</div>
							<div className='outer-ring outer-ring1'>
								<div className='outer-ring outer-ring2'>
									<div className='outer-ring outer-ring3'>
										<div className='outer-ring outer-ring4'>
											<div className='outer-ring outer-ring5'>
												<div className='outer-ring outer-ring6'>
													<div className='outer-ring outer-ring7'></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</LandingPage>
		</>
	);
}
const LandingPage = styled.div`
	background-color: #0066f5;
	/* background: #0d1117 url(/assets/img/bg-stars.webp); */
	/* background-repeat:no-repeat;
	background-size:100% 100%; */
	padding: 50px 0;
	overflow: hidden;

	path:first-child {
		stroke-dasharray: 247;
		stroke-dashoffset: 247;
		animation-delay: 0.5s;
		animation-iteration-count: 1;
		animation-direction: linear;
		animation-duration: 2s;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
		animation-play-state: running;
		animation-name: dash;
	}
	path:last-child {
		stroke-dasharray: 296;
		stroke-dashoffset: 296;
		animation-delay: 0.5s;
		animation-iteration-count: 1;
		animation-direction: linear;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
		animation-play-state: running;
		animation-name: dash2;
	}

	@keyframes dash {
		from {
			stroke-dashoffset: 247;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes dash2 {
		from {
			stroke-dashoffset: 296;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
	h3 {
		color: white;
		font-size: 20px;
	}
	.ring-wrapper {
		position: relative;
		display: inline;
	}
	.ring-wrapper-svg {
		position: absolute;
		width: 100%;
		top: -22%;
		left: -2px;
		color: orange;
		pointer-events: none;
	}

	//remeber to create a grid style pattern like crunnicify.com
	/* .grid-stars {
		background: white;
		border-top-left-radius: 0;
		border-top-right-radius: 3px;
		border-bottom-left-radius: 3px;
		 border-radius: 4px; 
		position: relative;
		 margin: 0 1px 1px 0; 
		z-index: 10;
	}
	.grid {
		width: calc(320vh);
		grid-template-columns: repeat(32, calc(10vh));
		background: #000000;
		grid-template-rows: repeat(10, 10vh);
		height: 100vh;
		display: grid;
	} */

	.outer-ring {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-radius: 50%;
		border: 1px solid white;
		background-color: transparent;
	}
	.outer-ring1 {
		height: 550px;
		width: 550px;
		animation: spin1 12s linear infinite;
	}
	.outer-ring1::before {
		height: 50px;
		width: 50px;
		content: '';
		background: white url(/assets/img/buycoins-logo.png);
		background-repeat: no-repeat;
		background-size: 60%;
		border-radius: 50%;
		background-position: center;
		position: absolute;
		bottom: -31px;
	}
	.outer-ring2::before {
		height: 60px;
		width: 60px;
		content: '';
		position: absolute;
		left: -31px;
		background: white url(/assets/img/sendstack-logo.png);
		background-repeat: no-repeat;
		background-size: 77%;
		border-radius: 50%;
		background-position: center;
		animation: spin2 12s linear infinite;
	}
	.outer-ring3::before {
		height: 50px;
		width: 50px;
		content: '';
		position: absolute;
		right: -31px;
		background: white url(/assets/img/roqqu-logo.png);
		background-repeat: no-repeat;
		background-size: 58%;
		border-radius: 50%;
		background-position: center;
		-webkit-animation: spin 12s linear infinite;
		animation: spin 12s linear infinite;
	}
	.outer-ring4::before {
		height: 50px;
		width: 50px;
		content: '';
		position: absolute;
		bottom: -31px;
		background: white url(/assets/img/jumia-logo.png);
		background-repeat: no-repeat;
		background-size: 58%;
		border-radius: 50%;
		background-position: center;
		animation: spin 12s linear infinite;
	}
	.outer-ring5::before {
		height: 50px;
		width: 50px;
		content: '';
		position: absolute;
		top: -31px;
		background: white url(/assets/img/chippercash-logo.png);
		background-repeat: no-repeat;
		background-size: 58%;
		border-radius: 50%;
		background-position: center;
		animation: spin 12s linear infinite;
	}
	.outer-ring6::before {
		height: 50px;
		width: 50px;
		content: '';
		position: absolute;
		left: -31px;
		background: white url(/assets/img/flutterwave-logo.png);
		background-repeat: no-repeat;
		background-size: 58%;
		border-radius: 50%;
		background-position: center;
		animation: spin 12s linear infinite;
	}

	.outer-ring2 {
		height: 450px;
		width: 450px;
	}
	.outer-ring3 {
		height: 350px;
		width: 350px;
	}
	.outer-ring4 {
		height: 250px;
		width: 250px;
	}
	.outer-ring5 {
		height: 150px;
		width: 150px;
	}
	.outer-ring6 {
		height: 80px;
		width: 80px;
	}
	.outer-ring7 {
		height: 5px;
		width: 5px;
	}

	@keyframes spin1 {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes spin2 {
		0% {
			transform: rotate(60deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.landingpage__container {
		width: 90%;
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
	}

	/* @media (min-width: 576px) {
		.landingpage__container {
			max-width: 864px;
		}
	}

	@media (min-width: 992px) {
		.landingpage__container {
			max-width: 1076px;
		}
	}

	@media only screen and (min-width: 64em) {
		.landingpage__container {
			max-width: 1140px;
		}
	} */
	.landingpage__row {
		flex-direction: column-reverse;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		margin-right: -15px;
		margin-left: -15px;
		justify-content: center;
	}
	@media only screen and (min-width: 62em) {
		.landingpage__row {
			display: -ms-flexbox;
			display: flex;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
			margin-right: -15px;
			margin-left: -15px;
			flex-direction: row;
			justify-content: center;
		}
	}
	.landingpage__col {
		position: relative;
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}
	.static-logo {
		position: absolute;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		top: 50%;
	}
	.landingpage__col-50 {
		max-width: 100%;
		flex: 0 0 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@media only screen and (min-width: 62em) {
		.landingpage__col-50 {
			max-width: 50%;
			flex: 0 0 50%;
		}
	}
	.landingpage__gridcol-50 {
		max-width: 100%;
		flex: 0 0 100%;
		display: grid;
		align-items: center;
		justify-content: center;
	}
	@media only screen and (min-width: 62em) {
		.landingpage__gridcol-50 {
			max-width: 50%;
			flex: 0 0 50%;
		}
	}
	.landingpage__text-button {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		padding: 1rem 1.3rem;
		cursor: pointer;
		border: none;
		border-radius: 40px;
		outline: none;
		font-size: 16px;
		font-weight: 400;
		background-color: orange;
		transition: all 0.2s ease-in-out;
	}
	.landingpage__text-button:hover {
		background-color: #e29301;
	}
	.landingpage__text-button a {
		color: #fff;
		font-weight: 500;
	}
	.landingpage__text-h1 {
		font-size: 63px;
		line-height: 120%;
		letter-spacing: -0.5px;
		text-align: left !important;
		font-weight: 700;
		color: white;
	}
	.landingpage__text-h2 {
		line-height: 151%;
		font-weight: 500;
		font-size: 20px;
		text-align: left;
		color: white;
		padding-right: 23px;
	}
	.landingpage__text {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: flex-start;
	}
	@media only screen and (max-width: 992px) {
		.landingpage__text {
			display: flex;
			justify-content: center;
			align-items: flex-start;
			text-align: center;
			flex-direction: column;
		}
		.landingpage__text-h1 {
			font-size: 4.8rem;
			margin-top: 1.2rem;
			color: white;
			font-weight: 600;
			line-height: 1.13;
		}
		.landingpage__text-h2 {
			font-size: 16px;
		}
	}
	@media only screen and (max-width: 600px) {
		.landingpage__text-h1 {
			font-size: 2rem;
			margin-top: 1.2rem;
			color: white;
			font-weight: 600;
			line-height: 1.13;
		}
	}
`;

export default Hero;

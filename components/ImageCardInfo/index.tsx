import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { BASE_IMAGE } from '../../utils/base64Image';

function ImageCardInfo({ headerInfo, count, actualCount }) {
	return (
		<>
			<CardWrapper>
				<ImageCardLogo>
					<Image
						src={headerInfo.logo}
						alt={`${headerInfo.name} ui screens`}
						placeholder='blur'
						width={240}
						height={240}
						unoptimized
						blurDataURL={BASE_IMAGE}
					/>
				</ImageCardLogo>
				<Link href='/' passHref legacyBehavior>
					<BackIcon>
						<Link href='/' passHref legacyBehavior>
							<img src='/assets/img/cancel.svg' alt='cancel button' />
						</Link>
					</BackIcon>
				</Link>
				<ImageCardInfoWrapper>
					<ImageCardWrappers>
						<ImageCardInfoName>
							<h1 className='big'>
								{' '}
								<a
									target='_blank'
									href={headerInfo.url}
									rel='noreferrer'
									style={{ textDecoration: 'underline' }}
								>
									{headerInfo.name}
								</a>
							</h1>{' '}
							<div>
								<svg
									viewBox='0 0 24 24'
									aria-label='Verified account'
									role='img'
									className='r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr'
									data-testid='icon-verified'
								>
									<g>
										<path d='M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z'></path>
									</g>
								</svg>
							</div>
						</ImageCardInfoName>
					</ImageCardWrappers>

					<ImageCardInfoName>
						<h3>{headerInfo.country || 'Nigeria'}</h3> &nbsp; &#x2022; &nbsp;
						<h3>
							{actualCount} screen{count > 1 && 's'}
						</h3>{' '}
					</ImageCardInfoName>
					{/* <h3>{actualCount} screens available</h3> */}
				</ImageCardInfoWrapper>
			</CardWrapper>
		</>
	);
}
const CardWrapper = styled.div`
	position: relative;
	flex-direction: column;
	align-items: center;
	display: flex;
	justify-content: center;
	gap: 16px;
	width: 100%;
`;
const BackIcon = styled.div`
	width: 3.5rem;
	height: 3.5rem;
	opacity: 1;
	position: absolute;
	top: -20px;
	right: -20px;
	background: white;
	padding: 17px;
	border-radius: 50%;
	cursor: pointer;
	transition: all 6ms ease-out;
	:hover {
		scale: 1.2;
	}
	@media (min-width: 768px) {
		top: 0;
		right: 0;
		width: 4rem;
		height: 4rem;
	}
`;
const ImageCardWrappers = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const ImageCardLogo = styled.div`
	border-radius: 20px;
	overflow: hidden;
	height: 172px;
	width: 172px;

	background: white;
	img {
		width: 100%;
	}
	@media (min-width: 768px) {
		height: 240px;
		width: 240px;
	}
`;
const ImageCardInfoName = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	.big {
		font-size: 50px;
		color: var(--primary-text-black);
		padding-left: 15px;
		padding-right: 15px;
	}
	@media (min-width: 768px) {
		.big {
			font-size: 70px;
		}
	}

	div {
		height: 30px;
		width: 30px;
	}
	svg {
		fill: var(--primary-color);
	}
`;

const ImageCardInfoWrapper = styled.div`
	display: flex;
	align-items: center;
	border-radius: 12px;
	gap: 20px;
	flex-direction: column;
	position: relative;

	& > h1 {
		font-size: 1.8rem;
		color: var(--primary-text-black);
	}
`;

export default ImageCardInfo;

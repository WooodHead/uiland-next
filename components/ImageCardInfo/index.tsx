import React from 'react';
import styled from 'styled-components';

function ImageCardInfo({ headerInfo, count }) {
	return (
		<>
			<ImageCardLogo>
				<img src={headerInfo.logo} />
			</ImageCardLogo>
			<ImageCardInfoWrapper>
				<ImageCardWrappers>
					<ImageCardInfoName>
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
						</div>{' '}
						&nbsp;
						<h4>Verified Site</h4>
					</ImageCardInfoName>
					<ImageCardInfoName>
						<h1 className='big'>{headerInfo.name}</h1>
					</ImageCardInfoName>
				</ImageCardWrappers>

				<ImageCardInfoName>
					<h3>{headerInfo.country || 'Nigeria'}</h3> &nbsp; &#x2022; &nbsp;
					<h3>
						{count} screen{count > 1 && 's'}
					</h3>
				</ImageCardInfoName>
			</ImageCardInfoWrapper>
		</>
	);
}
const ImageCardWrappers = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const ImageCardLogo = styled.div`
	border-radius: 20px;
	overflow: hidden;
	height: 240px;
	width: 240px;
	background: white;
	img {
		width: 100%;
		padding: 12px;
	}
`;
const ImageCardInfoName = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	.big {
		font-size: 70px;
		color: var(--primary-text-black);
		padding-left:15px;
		padding-right:15px;
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

	& > h1 {
		font-size: 1.8rem;
		color: var(--primary-text-black);
	}
`;

export default ImageCardInfo;

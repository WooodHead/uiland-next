import styled from 'styled-components';
import Image from 'next/image';

import React, { useContext } from 'react';
import { UserCountryContext } from '../../context/authContext';

type brandDescriptionProps = {
	name: string;
	category: string;
	brandcountry: string;
};

const BrandDescription: React.FC<brandDescriptionProps> = ({
	name,
	category,
	brandcountry,
}) => {
	const country = useContext(UserCountryContext);

	
	return (
		<BrandDescriptionContainer>
			<h3 className='brand-name'>
				{name}
				<span>
					{/* shows PRO Crown image if user is international and the brand is a Nigerian brand */}
					{brandcountry === 'Nigeria' &&
					country !== 'Nigeria' ? (
						<img
							src='/assets/img/crown.png'
							alt='my next image'
							width='20'
							height='20'
						/>
					) : null}
				</span>
			</h3>
			<p className='brand-category'>{category}</p>
		</BrandDescriptionContainer>
	);
};

const BrandDescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 0.5em;

	.brand-name {
		font-weight: 600;
		font-size: 16px;
		color: var(--primary-text-black);
		position: relative;
		span {
			font-size: 10px;
			color: #aaa;
			margin: 0 0em 1em 0.5em;
			position: absolute;
			top: 0;
		}
	}

	.brand-category {
		font-size: 12px;
		color: #8691a0;
		margin-top: 0.5em;
		font-weight: 500;
	}

	@media (min-width: 768px) {
		.brand-name {
			font-size: 24px;
		}

		.brand-category {
			font-size: 16px;
		}
	}
`;

export default BrandDescription;

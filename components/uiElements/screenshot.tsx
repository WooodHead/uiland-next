import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

import React from 'react';
import { BASE_IMAGE } from '../../utils/base64Image';

type screenshotProps = {
	imgLink: string;
	Name: string;
};

const Screenshot = ({ imgLink, Name }: screenshotProps) => {
	return (
		<>
			<ScreenshotContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<Image
					width={320}
					height={640}
					src={imgLink}
					alt={`${Name} App Screenshots`}
					placeholder='blur'
					unoptimized
					blurDataURL={BASE_IMAGE}
				/>
			</ScreenshotContainer>
		</>
	);
};

const ScreenshotContainer = styled(motion.div)`
	cursor: pointer;
	max-height: 634px;

	& > span {
		box-shadow: 0.1px 0.1px 1px 0 rgba(0, 0, 0, 0.2),
			0 0.1px 2px 0 rgba(0, 0, 0, 0.19);
		border-radius: 0.8em;
	}
	@media (min-width: 768px) {
		height: auto;

		& > span {
			box-shadow: 0.1px 0.1px 1px 0 rgba(0, 0, 0, 0.2),
				0 0.1px 2px 0 rgba(0, 0, 0, 0.19);
			border-radius: 1.5em;
		}
	}
`;

export default Screenshot;

import { useContext, useEffect } from "react";
import styled from "styled-components";
import Link from 'next/link'
import { BrandDescription, BrandLogo, Pill, Screenshot } from "../uiElements";
import { pillsTypes } from "../uiElements/pills";
import EmptyState from "../EmptyState";

const ScreensInCategory = ({screens}) => {
	
	
	return (<>
		<CategorySectionContainer>
			<CategorySectionWrapper>
				{/* checks for empty array */}
				{JSON.stringify(screens)!==JSON.stringify([]) ? screens.map(({ startScreens, name, category, logo, id }) => (
				
					<ScreenShotContainer key={id}>
							<Link  href={`/screens/${id}`}>
						<div><ScreenshotContainerTop>
							<BrandLogo imageUrl={logo} />
							<BrandDescription name={name} category={category} />
							<Pill type={pillsTypes.screenshot}>view</Pill>
						</ScreenshotContainerTop>
						<ScreenshotContainerBottom>
							{startScreens.map((screenshot) => (
								<Screenshot key={screenshot} imgLink={screenshot} alt={name} />
							))}
						</ScreenshotContainerBottom></div>
					</Link></ScreenShotContainer>
				)):<EmptyState/>}
			</CategorySectionWrapper>
		</CategorySectionContainer></>
	);
};

const CategorySectionContainer = styled.div`
	margin: 1.5em 0;

	@media (min-width: 768px) {
		margin: 3em 0;
	}
`;

const CategorySectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-wrap: wrap;
	margin: auto;
	gap: 2em;
	width: 90%;
	align-items: center;
    justify-content: center;

	:not(:first-child) {
		margin-top: 4em;
	}
	@media (min-width: 768px) {
		flex-direction: row;
		width: 95%;
	}
`;

const ScreenShotContainer = styled.div`
	margin-top: 2em;
	@media (min-width: 768px) {
		width: 45%;
		min-height: 100%;
		margin-top: 0;
	}
`;

const ScreenshotContainerTop = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1em;
`;

const ScreenshotContainerBottom = styled.div`
	display: flex;
	gap:1rem;
	justify-content: space-between;
`;

export default ScreensInCategory;

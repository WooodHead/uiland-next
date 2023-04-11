import Link from 'next/link';
import styled from 'styled-components';
import EmptyState from '../EmptyState';
import { BrandDescription, BrandLogo, Pill, Screenshot } from '../uiElements';
import { pillsTypes } from '../uiElements/pills';
import { useContext } from 'react';
import { ScreensContext } from '../../context/screensContex';
import { useEffect } from 'react';

const ScreensInCategory = ({ screens, viewmore = false }) => {
	return (
		<>
			<CategorySectionContainer>
				<CategorySectionWrapper>
					{/* checks for empty array */}
					{JSON.stringify(screens) !== JSON.stringify([]) ? (
						screens?.map(
							({ startScreens, name, category, country, logo, id }) => (
								<ScreenShotContainer key={id} viewmore={viewmore}>
									<Link
										href={`/screens/${name.toLowerCase()}/screens/${id}`}
										passHref
										legacyBehavior
									>
										<div>
											<ScreenshotContainerTop>
												<BrandLogo imageUrl={logo} />
												<BrandDescription
													name={name}
													brandcountry={country}
													category={category}
												/>
												<Pill type={pillsTypes.screenshot}>view</Pill>
											</ScreenshotContainerTop>
											<ScreenshotContainerBottom>
												{startScreens.map((screenshot) => (
													<Screenshot
														key={screenshot}
														imgLink={screenshot}
														Name={name}
													/>
												))}
											</ScreenshotContainerBottom>
										</div>
									</Link>
								</ScreenShotContainer>
							)
						)
					) : (
						<EmptyState />
					)}
				</CategorySectionWrapper>
			</CategorySectionContainer>
		</>
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
	max-width: 1300px;

	:not(:first-child) {
		margin-top: 4em;
	}
	@media (min-width: 768px) {
		flex-direction: row;
		width: 95%;
	}
`;

const ScreenShotContainer = styled.div<{ viewmore: boolean }>`
	margin-top: 2em;
	@media (min-width: 768px) {
		width: 45%;
		min-height: 100%;
		margin-top: 0;
	}
	@media (min-width: 900px) {
		width: ${(props) => (props.viewmore ? 31 : 45)}%;
		max-width: ${(props) => (props.viewmore ? 800 : '')}%;
		min-height: 100%;
		margin-top: 0;
	}
`;

const ScreenshotContainerTop = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1em;
	cursor: pointer;
`;

const ScreenshotContainerBottom = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: space-between;
`;

export default ScreensInCategory;

import styled from 'styled-components';
import Link from 'next/link';
import { BrandDescription, BrandLogo, Pill, Screenshot } from '../uiElements';
import { pillsTypes } from '../uiElements/pills';
import EmptyState from '../EmptyState';
import { Key } from 'react';
import React from 'react';

type indexProps = {
	screens: {
		album_id: {
			id: Key;
			name: string;
			logo: string;
			category: string;
			country: string;
			startScreens: string[];
		};
	}[];
};

const BookmarkScreensInCategory: React.FC<indexProps> = ({ screens }) => {
	return (
		<>
			<CategorySectionContainer>
				<CategorySectionWrapper>
					{JSON.stringify(screens) !== JSON.stringify([]) ? (
						screens.map(
							(result: {
								album_id: {
									id: Key;
									name: string;
									logo: string;
									category: string;
									country: string;
									startScreens: string[];
								};
							}) => (
								<ScreenShotContainer key={result.album_id.id}>
									<Link
										href={`/screens/${result.album_id.name.toLowerCase()}/screens/${
											result.album_id.id
										}`}
									>
										<div>
											<ScreenshotContainerTop>
												<BrandLogo imageUrl={result.album_id.logo} />
												<BrandDescription
													brandcountry={result.album_id.country}
													name={result.album_id.name}
													category={result.album_id.category}
												/>
												<Pill type={pillsTypes.screenshot}>view</Pill>
											</ScreenshotContainerTop>
											<ScreenshotContainerBottom>
												{result.album_id.startScreens.map(
													(screenshot: string) => (
														<Screenshot
															key={screenshot}
															imgLink={screenshot}
															Name={screenshot}
														/>
													)
												)}
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
	align-items: center;

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
	gap: 1rem;
	justify-content: space-between;
`;

export default BookmarkScreensInCategory;

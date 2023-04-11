import { useContext } from 'react';
import styled from 'styled-components';
import { ScreensContext } from '../../context/screensContex';

import { Pill } from '../uiElements';
import { pillsTypes } from '../uiElements/pills';

const CategoryTabBar = () => {
	const { setFilterItem } = useContext(ScreensContext);

	const removeAllActiveClasses = () => {
		const nodes = document.querySelectorAll('.pills');
		Array.from(nodes).forEach((node) => node.classList.remove('active'));
	};
	const onClickPill = (e, result) => {
		removeAllActiveClasses();
		e.target.classList.add('active');
		setFilterItem(result.categoryStatus);
	};

	const data = [
		{ category: 'All', categoryStatus: '', status: 'active', id: 1 },
		{ category: 'Fintech', categoryStatus: 'Fintech', status: '', id: 2 },

		{ category: 'Logistics', categoryStatus: 'Logistics', status: '', id: 3 },
		{
			category: 'Entertainment',
			categoryStatus: 'Entertainment',
			status: '',
			id: 4,
		},
		{
			category: 'Investment',
			categoryStatus: 'Investment',
			status: '',
			id: 5,
		},
		{
			category: 'Bank',
			categoryStatus: 'Bank',
			status: '',
			id: 6,
		},
		{
			category: 'Crypto',
			categoryStatus: 'Crypto',
			status: '',
			id: 7,
		},
		{
			category: 'Productivity',
			categoryStatus: 'Productivity',
			status: '',
			id: 8,
		},
		{
			category: 'Utilities',
			categoryStatus: 'Utilities',
			status: '',
			id: 9,
		},
		{
			category: 'Education',
			categoryStatus: 'Education',
			status: '',
			id: 10,
		},
		{
			category: 'Lifestyle',
			categoryStatus: 'Lifestyle',
			status: '',
			id: 11,
		},
		{
			category: 'Communication',
			categoryStatus: 'Communication',
			status: '',
			id: 12,
		},
		{
			category: 'Social',
			categoryStatus: 'Social',
			status: '',
			id: 12,
		},
	];

	return (
		<CategoryTabContainer>
			<CategoryTabWrapper>
				{
					<>
						{data.map((result) => {
							return (
								<Pill key={result.id} type={pillsTypes.category}>
									<button
										className={`pills ${result.status}`}
										onClick={(e) => onClickPill(e, result)}
										name={result.categoryStatus}
									>
										{result.category}
									</button>
								</Pill>
							);
						})}
					</>
				}
			</CategoryTabWrapper>
		</CategoryTabContainer>
	);
};

const CategoryTabContainer = styled.section`
	margin: 1.5em 0;
	padding: 1em 0;
	border: 1px solid var(--light-grey-color);
	@media (min-width: 768px) {
		margin: 3em 0;
	}
`;

const CategoryTabWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	overflow-x: scroll;
	gap: 0.8em;

	::-webkit-scrollbar {
		display: none;
	}
`;

export default CategoryTabBar;

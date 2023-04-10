import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRelatedScreensByID } from '../../supabase';
import { formatScreens } from '../../utils/brandsGenerator';
import ScreensInCategory from '../ScreensInCategory';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';
const Viewmore = ({ screens }) => {
	const [formattedScreen, setFormattedScreen] = useState(screens);

	const randomScreens = async () => {
		setFormattedScreen(await formatScreens(screens));
	};

	useEffect(() => {
		randomScreens();
	}, [screens]);
	return (
		<Wrapper>
			<div className='home'>
				<BsArrowLeft />
				<Link href='/'> Back to Home</Link>{' '}
			</div>
			<Header>
				View Screenshots from other {screens[0] && screens[0].category} Brands
			</Header>
			<ScreensInCategory screens={formattedScreen} viewmore={true} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 95%;
	max-width: 1300px;
	margin: 5em auto;
	.home {
		font-size: 14px;
		color: #868686;
		font-weight: 600;
		display: flex;
		align-items: center;
		a{
			margin-left: .5em;
		}
	}
`;

const Header = styled.h1`
	color: var(--primary-color);
	font-size: 30px;
	text-align: center;
	margin: 1.5em;
`;

export const getServerSideProps = async (req, res) => {
	const id = req.params.id;

	const screens = await getRelatedScreensByID(id);

	return {
		props: {
			screens,
		},
	};
};

export default Viewmore;

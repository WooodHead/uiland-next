import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRelatedScreensByID } from '../../supabase';
import { formatScreens } from '../../utils/brandsGenerator';
import ScreensInCategory from '../ScreensInCategory';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';
const Viewmore = ({ screens }) => {
	//get screens from the server then format on the client
	const [formattedScreen, setFormattedScreen] = useState(screens);

	//function for formatting the screens received i.e choosing random brands from the same category if screens is an array of screens or choosing random brands of different categories if screens is an empty array
	const randomScreens = async () => {
		setFormattedScreen(await formatScreens(screens));
	};

	useEffect(() => {
		randomScreens();
	}, [screens]);
	return (
		<Wrapper>
			<Link href='/'>
				<div className='home'>
					<BsArrowLeft className='icon' />
					Back to Home
				</div>
			</Link>{' '}
			<Header>
				View Screenshots from other {screens[0] && screens[0].category} Brands
			</Header>
			{/* use the same screensIncategory component as the homepage but pass a viewmore prop so it is styled differently */}
			<ScreensInCategory screens={formattedScreen} viewmore={true} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 95%;
	max-width: 1300px;
	margin: 5em auto;
	cursor: pointer;
	.home {
		display: inline-flex;
		align-items: center;
		background: rgb(0 0 0 / 9%);
		border-radius: 28px;
		padding: 0.8em;
		color: var(--primary-text-black);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		.icon {
			margin-right: 0.5em;
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

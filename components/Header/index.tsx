import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';

import { Button } from '../uiElements';
import { buttonTypes } from '../uiElements/button';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContext } from '../../context/authContext';
import { signout } from '../../supabase';
const Login = dynamic(() => import('../Login/login'));
const Modal = dynamic(() => import('../modal'));

import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Header = () => {
	const { isModalopen, toggleModal } = useModal();

	const user = useContext(UserContext);
	const [popup, setPopup] = useState(false);
	const router = useRouter();
	const supabaseClient = useSupabaseClient();

	function showPopup() {
		setPopup(!popup);
	}

	const signoutuser = async () => {
		await signout();
		await supabaseClient.auth.signOut();
		router.push('/');
	};

	return (
		<>
			<Wrapper>
				<HeaderContainer>
					<HeaderLogo>
						<Link href='/'>
							<img
								src='/assets/img/UL.png'
								alt='my next image'
								width='25'
								height='14'
							/>
						</Link>
					</HeaderLogo>
					<HeaderCTA>
						{!user ? (
							<div onClick={() => toggleModal()}>
								<Button type={buttonTypes.login}> Login</Button>
							</div>
						) : (
							<HeaderInfo>
								<CollectionText>
									<Link href='/collections'>
										<a>Collections</a>
									</Link>
								</CollectionText>

								<PhotoWrapper>
									<RelativeWrapper onClick={showPopup}>
										<img
											src={user?.user_metadata.avatar_url}
											referrerPolicy='no-referrer'
											alt={`Avatar of ${user?.user_metadata.full_name}`}
										/>
										{popup && (
											<Popup>
												<ProfileText>
													<Link href='/profile'>Profile</Link>
												</ProfileText>
												<LogOutText onClick={signoutuser}>Log Out</LogOutText>
											</Popup>
										)}
									</RelativeWrapper>
								</PhotoWrapper>
							</HeaderInfo>
						)}
					</HeaderCTA>
					{isModalopen && (
						<Modal toggleModal={toggleModal}>
							<Login toggleModal={toggleModal} />
						</Modal>
					)}
				</HeaderContainer>
			</Wrapper>
		</>
	);
};
const CollectionText = styled.div`
	font-size: 16px;
	font-weight: 600;
	color: white;
`;
const RelativeWrapper = styled.div``;
const LogOutText = styled.div`
	font-weight: 600;
	color: red;
`;
const ProfileText = styled.div`
	font-weight: 600;
	a {
		color: black;
	}
`;
const Popup = styled.div`
	background: white;
	padding: 12px;
	border-radius: 12px;
	position: absolute;
	top: 35px;
	left: 14px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
		var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
	border: 1px solid #e6e4e4;
`;
const Wrapper = styled.div`
	background: var(--primary-color);
`;
const HeaderLogo = styled.div`
	cursor: pointer;
`;
const PhotoWrapper = styled.div`
	overflow: hidden;
	cursor: pointer;
	img {
		border: 2px solid white;
		border-radius: 100%;
		height: 32px;
		width: 32px;
	}
`;
const HeaderInfo = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
	position: relative;
`;
const HeaderContainer = styled.div`
	width: 90%;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.5em 0;
`;

const HeaderCTA = styled.div`
	margin-left: auto;
	h4 {
		color: white;
	}
	span {
		text-decoration: underline;
		margin-left: 1em;
		cursor: pointer;
	}
`;

const HamburgerContainer = styled.div`
	cursor: pointer;
	@media (min-width: 768px) {
		display: none;
	}
`;

const HamburgerSticks = styled.span`
	width: 21px;
	height: 3px;
	background-color: var(--text-color-light);
	display: block;

	:not(:first-child) {
		margin-top: 0.2em;
	}
`;

export default Header;

import Link from 'next/link';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import Login from '../Login/login';
import Modal from '../modal';
import { useContext } from 'react';
import { UserContext } from '../../context/authContext';

const PaymentBanner = ({ country }) => {
	const { loginToggleModal, isModalLogin } = useModal();
	const user = useContext(UserContext);

	return (
		<>
			{isModalLogin && (
				<Modal toggleModal={loginToggleModal}>
					<Login toggleModal={loginToggleModal} />
				</Modal>
			)}
			<Overlay />
			<MainWrapper>
				{/* //payment banner shows login button for all unauthenticated users and subscribe now for international users in paid brands */}
				{(country !== 'Nigeria' || country !== 'NG') && user ? (
					<PaymentButton>
						Subscribe to View More Screens
						<Link href={'/pricing'}>
							<span>Subscribe Now</span>
						</Link>
					</PaymentButton>
				) : (
					<PaymentButton>
						Sign In to View More Screens
						<span onClick={loginToggleModal}>Log In </span>
					</PaymentButton>
				)}
			</MainWrapper>
		</>
	);
};

const Overlay = styled.div`
	height: 200px;
	width: 100%;
	margin-top: -250px;
	background-image: linear-gradient(
		to bottom,
		#ffffff,
		#fafbff,
		#f3f7ff,
		#eaf4ff,
		#e0f1ff
	);

	opacity: 0.8;
	box-shadow: -80px -80px 50px rgba(255, 255, 255, 0.4),
		-30px -30px 20px rgba(255, 255, 255, 0.8);
	/* margin-top: -250px; */
`;

const PaymentButton = styled.div`
	font-size: 20px;
	font-weight: 800;
	color: #272d4b;
	text-align: center;

	@media (min-width: 768px) {
		font-size: 36px;
		:span {
			font-size: 18px;
		}
	}
	span {
		margin-top: 0.5em;
		font-weight: 500;
		cursor: pointer;
		font-size: 14px;
		display: block;
		width: 200px;
		color: #fff;
		padding: 1em;
		margin: 1em auto;
		border-radius: 0.5em;
		background-color: var(--primary-color);
	}
`;

const MainWrapper = styled.div`
	height: 300px;
	margin-top: -100px;
	width: 100%;
	background-image: linear-gradient(
		to bottom,
		#ffffff,
		#f5f6ff,
		#e7efff,
		#d4e8ff,
		#bee3ff
	);
	box-shadow: -80px -80px 50px rgba(255, 255, 255, 0.4),
		-30px -30px 20px rgba(255, 255, 255, 1);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;

export default PaymentBanner;

import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { BASE_IMAGE } from '../../../../utils/base64Image';
//Third party libraries
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
// Components
import { BottomSheet, Pill, Toast } from '../../../../components/uiElements';
import { getRelatedScreensByID } from '../../../../supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import AddToBookmark from '../../../../components/AddToBookmark';
import CloseIcon from '../../../../components/CloseModalIcon';
import DeleteIcon from '../../../../components/DeleteIcon';
import ImageCardInfo from '../../../../components/ImageCardInfo';
import Login from '../../../../components/Login/login';
import SaveIcon from '../../../../components/SaveIcon';
import SocialsCard from '../../../../components/SocialsCard';
import Modal from '../../../../components/modal';
import { pillsTypes } from '../../../../components/uiElements/pills';
import Select from '../../../../components/uiElements/select';
import { PopContext } from '../../../../context/PopContext';
import Viewmore from '../../../../components/ViewMore';

//hooks

import { GetServerSideProps } from 'next';
import useScreenshot from '../../../../hooks/useScreenshot';
import {
	checkSubscribedUSer,
	getAllScreens,
	getAllScreensCount,
	getCountry,
	getScreensById,
	getScreensByIdCount,
} from '../../../../supabase';

import Redis from 'ioredis';
import withPopContext from '../../../../HOC/withPopContext';
import CopyIcon from '../../../../components/CopyIcon';
import DownloadIcon from '../../../../components/DownloadIcon';
import NewsLetter from '../../../../components/NewsLetter';
import PaymentBanner from '../../../../components/PaymentBanner';
import Tooltip from '../../../../components/Tooltip';
import {
	UserContext,
	UserCountryContext,
} from '../../../../context/authContext';

const SinglePage = ({ screens, brandcountry, screensBYID }) => {
	const [showPaymentBanner, setShowPaymentBanner] = useState(false);
	const user = useContext(UserContext);
	const country = useContext(UserCountryContext);

	useEffect(() => {
		//logic for showing payment banner

		checkSubscribedUSer(user).then((data) => {
			// this means if no data is returned show the payment banner... this means that the user is not logged in. The Payment banner would prompt the user to login in this case

			if (!data) return setShowPaymentBanner(true);
			// if there is a user but the user is not a paid user and user is  from nigeria
			else if (!data.event && (country === 'NG' || country === 'Nigeria')) {
				return setShowPaymentBanner(false);
			} else if (
				// if there is a user but the user is not a paid user and user is an international user trying to visit a nigerian
				!data.event &&
				brandcountry === 'Nigeria' &&
				(country !== 'NG' || country !== 'Nigeria')
			) {
				return setShowPaymentBanner(true);
			}
			return setShowPaymentBanner(false);
		});
	}, [user, country]);

	const {
		headerInfo,
		toggleBottomSheet,
		modalSheet,
		modalSaveImage,
		newtoggleModal,
		submit,
		handleChange,
		selectBookmark,
		input,
		disabled,
		toggleModal,
		isModalopen,
		copy,
		isModalLogin,
		loginToggleModal,
		guideModalState,
		guideModal,
		openBottomSheet,
		closeBottomSheetModal,
		downloadImage,
		copyImage,
		getAlbumId,
		handleAddToBookMark,
		handleDeleteFromBookMark,
		elementsCategoryData,
		inputFilter,
		handleInputFilter,
		filtered,
		getId,
		deleteIndividualBookmark,
		bookmark,
		openBottomSheetModal,
		payingbanner,
		handleClickSubscribeButton,
		buttonTypes,
		Progress,
		toastPendingText,
		toastSuccessText,
		router,
		bookmarkk,
		generateZIP,
		onClickPill,
		pillStatus,
		timeHost,
		getPeriod,
	} = useScreenshot(screens);

	const [visits, setVisits] = useState<number>();
	const [active, setActive] = useState<number>(1);

	const [perPage, setPerPage] = useState<number>(27);

	const [viewMoreData, setViewMoreData] = useState([]);

	const [actualCount, setActualCount] = useState<number>(0);

	// The back-to-top button is hidden at the beginning
	const [showButton, setShowButton] = useState(false);
	const [revealTooltip, setRevealTooltip] = useState<number>(0);
	const { openNewsLetter, setOpenNewsLetter } = useContext(PopContext);
	const userListRef = useRef(null);

	// useEffect(()=>{
	// 	const path = router.pathname
	// 	const one=1
	// 	const query = router.query
	// 	query.page = one.toString()
	// 	router.push({
	// 		pathname: path,
	// 		query: query,
	// 	  })
	// },[])
	// Triggers fetch for new page
	const handlePagination = (page) => {
		const path = router.pathname;
		const query = router.query;
		query.page = page.selected + 1;
		router.push({
			pathname: path,
			query: query,
		});
		userListRef.current.scrollIntoView({ behavior: 'instant' });
	};

	//This is used to track the number of times a user has visited the screen. The guide modal
	//is displayed if the user is a first-time user.
	useEffect(() => {
		let numberOfVisits = localStorage.getItem('numberOfVisits');
		//changes the string to a number
		let toNumber = parseInt(numberOfVisits);
		if (!toNumber) {
			toNumber = 0;
		}
		//adds one every time a user visits the page
		let addToNumber = +toNumber + 1;
		setVisits(addToNumber);
		if (addToNumber < 2) {
			guideModal();
		}
		localStorage.setItem('numberOfVisits', String(addToNumber));
	}, []);

	//get actual count of screens
	useEffect(() => {
		async function getCount() {
			const count = await getScreensByIdCount(
				router.query.id,
				router.query.version
			);
			setActualCount(count);
		}
		getCount();
	}, [router.query.id, router.query.version]);

	//function for the previous state
	function prevPage() {
		setActive((prev) => {
			let prevPage = prev - 1;
			if (prevPage < 1 || prevPage === 1) {
				prevPage = 1;
			}
			return prevPage;
		});
	}
	//function for the next state
	function nextPage() {
		setActive((next) => {
			let nextPage = next + 1;
			if (nextPage > 7 || nextPage === 7) {
				nextPage = 7;
			}
			return nextPage;
		});
	}

	//state for the various guides
	const guides = [
		{
			id: 1,
			title1: 'SAVE ALL PHOTOS EASILY',
			title2:
				'Look for the icon to save all photos instantly  in just few clicks',
			image: '/assets/img/guide-1.png',
		},
		{
			id: 2,
			title1: 'SHARE YOUR BEST SHOTS',
			title2:
				'Share the best photos or the complete gallery on Facebook,Twitter and Whatsapp',
			image: '/assets/img/guide-2.png',
		},
		{
			id: 3,
			title1: 'DOWNLOAD ALL IMAGES',
			title2: 'Download all images at your comfort and work on them later',
			image: '/assets/img/guide-9.png',
		},
		{
			id: 4,
			title1: 'PICK YOUR FAVOURITES',
			title2:
				'Create a list of Favourite photos to share with your friends ,family, developers and designers',
			image: '/assets/img/guide-4.png',
		},
		{
			id: 5,
			title1: ' DOWNLOAD YOUR FAVOURITES',
			title2:
				'Look for the icon to  download your images instantly  in just a single click',
			image: '/assets/img/guide-5.png',
		},
		{
			id: 6,
			title1: 'COPY YOUR FAVOURITES',
			title2:
				'Look for the icon to copy your images to Figma and download your images instantly  in just a single click',
			image: '/assets/img/guide-6.png',
		},
		{
			id: 7,
			title1: 'FILTER TO YOUR FAVOURITE IMAGES',
			title2:
				'Look for the icon to filter the images  instantly  in just few clicks',
			image: '/assets/img/guide-3.png',
		},
	];
	// This function will scroll the window to the top
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // for smoothly scrolling
		});
	};
	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 800) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		});
	}, []);

	//get view more screens
	useEffect(() => {
		async function viewMore() {
			const data = await getAllScreens();
			const count = await getAllScreensCount();

			setViewMoreData(data);
			const randomNumber = Math.floor(Math.random() * count);
			const randomNumber2 = Math.floor(Math.random() * count);

			// console.log("dopse",viewMoreData)
			viewMoreData[0] = viewMoreData[randomNumber];

			viewMoreData[1] = viewMoreData[randomNumber2];

			// [ viewMoreData[0], viewMoreData[Math.floor(Math.random()*count)]]=[ viewMoreData[Math.floor(Math.random()*count)], viewMoreData[0]]
			// [ viewMoreData[1], viewMoreData[Math.floor(Math.random()*count)]]=[ viewMoreData[Math.floor(Math.random()*count)], viewMoreData[1]]
			//  console.log("yes",viewMoreData)
		}
		viewMore();
	}, []);

	// 	useEffect(()=>{
	// 	async	function yes(){
	// const ed= await getVersion(router.query.id)
	// 			console.log(ed)	}

	// 		yes()
	// 	},[router.query.id])
	const pageCount = Math.ceil(actualCount / perPage);

	//add canonical tag
	const canonicalUrl = (
		`https://uiland.design` + (router.asPath === '/' ? '' : router.asPath)
	).split('?')[0];

	if (!headerInfo) {
		return;
	}

	//show tooltip when mouse is on the component
	function showTooltip(id) {
		setRevealTooltip(id);
	}

	//hide tooltip when mouse is removed from it
	function hideTooltip() {
		setRevealTooltip(0);
	}

	return (
		<>
			{/* for SEO */}
			<Head>
				<title>{headerInfo.name} app screens</title>
				<meta
					name='title'
					property='og:title'
					content={`${headerInfo.name} ui screenshots`}
				/>
				<meta
					name='description'
					content={`Discover latest mobile app ui inspirations and designs from comapnies and startups all over the world `}
				/>
				<link rel='icon' href='/favicon.ico' />
				<link rel='canonical' href={canonicalUrl} key='canonical' />
				{/* Open Graph / Facebook */}
				<meta property='og:type' content='website' />
				<meta
					property='og:url'
					content={`https://uiland.design/screens/${headerInfo.name.toLowerCase()}/screens/${
						headerInfo.id
					}`}
				/>
				<meta
					property='og:title'
					content={`https://uiland.design/screens/${headerInfo.name.toLowerCase()}/screens/${
						headerInfo.id
					}`}
				/>
				<meta
					name='description'
					property='og:description'
					content={`${headerInfo.name} ui screenshots`}
				/>
				<meta property='og:site_name' content='uiland.design' />
				<meta name='image' property='og:image' content={`${headerInfo.logo}`} />
				{/* Twitter */}
				<meta property='twitter:card' content='summary_large_image' />
				<meta
					property='twitter:url'
					content={`https://uiland.design/screens/${headerInfo.name.toLowerCase()}/screens/${
						headerInfo.id
					}`}
				/>
				<meta property='twitter:site' content='@Uiland' />
				<meta
					property='twitter:title'
					content='Discover hundreds of Mobile apps designs for UI &amp; UX research.'
				/>
				<meta
					property='twitter:description'
					content='Discover hundreds of Mobile apps designs for UI &amp; UX research.'
				/>
				<meta property='twitter:image' content={`${headerInfo.logo}`} />
			</Head>

			{/* {modalSheet && (
				<Modal toggleModal={toggleBottomSheet}>
					<ModalBox>
						<CloseIcon toggle={toggleBottomSheet} />
						<BottomsheetModal>
							<div onClick={downloadImage}>Download Image</div>
							<div onClick={copyImage}>Copy Image</div>
						</BottomsheetModal>
					</ModalBox>
				</Modal>
			)} */}
			{modalSaveImage && (
				<Modal toggleModal={newtoggleModal}>
					<AddToBookmark
						newtoggleModal={newtoggleModal}
						submit={submit}
						handleChange={handleChange}
						bookmarkk={bookmarkk}
						selectBookmark={selectBookmark}
						input={input}
						disabled={disabled}
					/>
				</Modal>
			)}
			{isModalopen && (
				<Modal toggleModal={toggleModal}>
					<SocialModalBox>
						<CloseIcon toggle={toggleModal} />
						<SocialsCard
							id={router.query.id}
							copy={copy}
							name={router.query.name}
						/>
					</SocialModalBox>
				</Modal>
			)}
			{isModalLogin && (
				<Modal toggleModal={loginToggleModal}>
					<Login toggleModal={loginToggleModal} />
				</Modal>
			)}
			{openNewsLetter && (
				<Modal toggleModal={() => setOpenNewsLetter(!openNewsLetter)}>
					<NewsLetter toggleModal={() => setOpenNewsLetter(!openNewsLetter)} />
				</Modal>
			)}
			{guideModalState && (
				<Modal toggleModal={guideModal}>
					<SocialModalBox>
						<GuideBox>
							{guides &&
								guides
									.filter((guide) => guide.id === active)
									.map((result) => (
										<>
											<GuideWrapper>
												<div className='border-bottom'>
													<img
														src={result?.image}
														width='468'
														height='268'
														alt={`Uiland guide ${result.id}`}
													/>
												</div>

												<GuideBoxContent>
													<h2>{result.title1}</h2>
													<p>{result.title2}</p>
												</GuideBoxContent>
											</GuideWrapper>
										</>
									))}

							<NavigationBox>
								{active !== 1 ? (
									<button onClick={prevPage}>Back</button>
								) : (
									<div></div>
								)}
								<button
									className='active'
									onClick={active === 7 ? guideModal : nextPage}
								>
									{active === 7 ? 'Explore ' : 'Next'}
								</button>
							</NavigationBox>
						</GuideBox>
						<DotWrapper>
							<div className={`dot ${active === 1 && 'active'}`}></div>
							<div className={`dot ${active === 2 && 'active'}`}></div>
							<div className={`dot ${active === 3 && 'active'}`}></div>
							<div className={`dot ${active === 4 && 'active'}`}></div>
							<div className={`dot ${active === 5 && 'active'}`}></div>
							<div className={`dot ${active === 6 && 'active'}`}></div>
							<div className={`dot ${active === 7 && 'active'}`}></div>
						</DotWrapper>
					</SocialModalBox>
				</Modal>
			)}
			<BottomSheet
				openBottomSheet={openBottomSheet}
				closeBottomSheetModal={closeBottomSheetModal}
				downloadImage={downloadImage}
				copyImage={copyImage}
			/>

			<SingleHeader ref={userListRef}>
				<ImageCardInfo
					headerInfo={headerInfo}
					count={filtered?.length}
					actualCount={actualCount}
				/>
			</SingleHeader>

			<SecondHeader>
				<ImageCardWrapper>
					{!getAlbumId?.includes(router.query.id) ? (
						<BookmarkButton
							onClick={handleAddToBookMark}
							title='add to bookmark'
						>
							<img
								src='/assets/img/bookmark-dark.svg'
								alt='bookmark icon'
								className={`effect scale_transition`}
							/>
						</BookmarkButton>
					) : (
						<BookmarkButton onClick={handleDeleteFromBookMark}>
							<img
								src='/assets/img/bookmark-transparent.png'
								alt='bookmark icon'
								className='effect'
							/>
						</BookmarkButton>
					)}
					<div
						className='button_modal'
						onClick={generateZIP}
						title='download all images'
					>
						<img
							src='/assets/img/download-file-icon.svg'
							alt='download-file-icon'
						/>
					</div>
					<div
						className='button_modal'
						onClick={toggleModal}
						title='share online'
					>
						<img src='/assets/img/share.svg' alt='share-icon' />
					</div>
				</ImageCardWrapper>
				{/* <div className='flex-col'>
					<div>
						<h1 className='font_medium'>
							<a
								href={headerInfo.url}
								rel='noopener noreferrer'
								target='_blank'
							>
								Visit Website
							</a>
						</h1>
					</div>
					
				</div> */}
				<Select
					elementsCategoryData={elementsCategoryData}
					inputFilter={inputFilter}
					handleInputFilter={handleInputFilter}
				/>{' '}
			</SecondHeader>
			<CategoryTabContainer>
				<CategoryTabWrapper>
					{
						<>
							{JSON.stringify(getPeriod) !== JSON.stringify([]) &&
								getPeriod.map((result, id, arr) => {
									return (
										<Pill key={id} type={pillsTypes.category}>
											<button
												className={`pills ${pillStatus === id && 'active'}`}
												onClick={() => onClickPill(id, arr)}
												name={result}
											>
												{result}
											</button>
										</Pill>
									);
								})}
						</>
					}
				</CategoryTabWrapper>
			</CategoryTabContainer>
			<ElementsInCategoryContainer>
				{showButton && (
					<ScrollTop onClick={scrollToTop} title='scroll to top'>
						<img src='/assets/img/scroll-arrow.svg' />
					</ScrollTop>
				)}
				{/* todo:populate with filtered data */}
				{filtered?.map((data) => (
					<ScreenShotContent key={data.id}>
						<ScreenshotContainer
							onMouseEnter={() => showTooltip(data.id)}
							onMouseLeave={hideTooltip}
						>
							<Image
								src={data.url}
								alt={`Screenshots of ${headerInfo.name} App`}
								width={1080}
								height={2240}
								placeholder='blur'
								unoptimized
								blurDataURL={BASE_IMAGE}
							/>
						</ScreenshotContainer>

						<SecondRow>
							{revealTooltip === data.id && <Tooltip />}
							{getId.includes(data.id) ? (
								<DeleteIcon
									deleteIndividualBookmark={deleteIndividualBookmark}
									data={data}
								/>
							) : (
								<SaveIcon bookmark={bookmark} data={data} />
							)}
							<DownloadIcon downloadImage={downloadImage} image={data.url} />
							<CopyIcon copyImage={copyImage} image={data.url} />
							{/* <ThreeDots openBottomSheet={openBottomSheetModal} /> */}
						</SecondRow>
					</ScreenShotContent>
				))}
			</ElementsInCategoryContainer>
			<Toast
				Progress={Progress}
				pendingText={toastPendingText}
				successText={toastSuccessText}
			/>
			{/* remove pagination if user is an unsuscribed  international user on a paid app */}
			{!showPaymentBanner && (
				<>
					<ReactPaginate
						marginPagesDisplayed={5}
						pageRangeDisplayed={5}
						previousLabel={'< Previous'}
						nextLabel={'Next >'}
						breakLabel={'...'}
						forcePage={(Number(router.query.page) || 1) - 1}
						pageCount={pageCount}
						onPageChange={handlePagination}
						disableInitialCallback={true}
						containerClassName={'paginate-wrap'}
						pageClassName={'paginate-li'}
						pageLinkClassName={'paginate-a'}
						activeClassName={'paginate-active'}
						nextLinkClassName={'paginate-next-a'}
						previousLinkClassName={'paginate-prev-a'}
						breakLinkClassName={'paginate-break-a'}
						disabledClassName={'paginate-disabled'}
					/>

					<Viewmore screens={screensBYID} />
				</>
			)}
			{/* add payment banner  if user is an unsuscribed  international user on a paid app */}
			{showPaymentBanner && <PaymentBanner country={country} />}
		</>
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
const Dot = styled.div`
	height: 20px;
	width: 20px;
	border-radius: 50%;
	.active {
		background-color: white;
	}
`;

const DotWrapper = styled.div`
	display: flex;
	width: 100%;
	gap: 12px;
	align-items: center;
	padding: 12px;
	background: #070707;
	border-radius: 8px;

	justify-content: center;
	.dot {
		height: 20px;
		width: 20px;
		border-radius: 50%;
		background: grey;
	}
	.dot.active {
		background: white;
	}
`;
const GuideBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const GuideWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.border-bottom {
		border-bottom: 1px solid grey;
	}
	img {
		width: 100%;
		object-fit: cover;
	}
`;
const GuideBoxContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 20px;
	margin: 12px 0;
`;
const NavigationBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 12px;
	button {
		display: flex;
		cursor: pointer;
		padding: 12px 20px;
		border: 1px solid #bbbaba;
		border-radius: 6px;
		font-size: 18px;
		font-weight: 500;
		color: black;
		background: white;
	}
	button.active {
		background: var(--primary-color);
		color: white;
	}
`;
const ImageCardWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	flex-direction: row;
`;

const BookmarkButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	cursor: pointer;

	border-radius: 50%;
	outline: none;
	color: white;
	font-size: 2rem;
	font-weight: 500;
	background: #ffffff;
	border: 2px solid #bac1d8;

	&:hover {
		background-color: grey;
	}

	&:focus {
		outline: none;
	}
`;
const SecondHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 95%;
	margin: 3em auto;
	flex-wrap: wrap;
	gap: 16px;

	@media (min-width: 442px) {
		justify-content: space-between;
	}
`;
const Cloud = styled.div`
	background-image: radial-gradient(
		60.83% 60.83% at 50% 50%,
		#fbfbfb 47.02%,
		hsla(0, 0%, 98%, 0) 100%
	);
	position: absolute;
	top: 0;
	width: 100%;
	left: 0;
	height: 100%;
`;
const ButtonWrapper = styled.div`
	z-index: 3;
`;
const GridBackground = styled.div`
	position: absolute;
	height: 100%;
	img {
		width: 100%;
	}
`;
const SubscribeBanner = styled.div`
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
	position: relative;
	/* margin-top: -223px; */
	background: linear-gradient(
		rgba(255, 255, 255, 0),
		rgba(255, 255, 255, 1),
		rgb(255, 255, 255)
	);
	height: 200px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #bcbec9;
	border-top-right-radius: 40px;
	border-top-left-radius: 40px;
`;

const BottomsheetModal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: black;
	font-size: 20px;
	div {
		width: 100%;

		text-align: center;
		padding: 12px;
		font-weight: 500;
	}
	div:first-child {
		border-bottom: 1px solid #dddddd;
	}
`;
const SecondRow = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	background: rgb(0 0 0 / 9%);
	border-radius: 28px;
	position: relative;
`;
const Input = styled.input.attrs((props) => ({}))`
	color: black;
	font-size: 1em;
	border: 1px solid grey;
	border-radius: 6px;
	margin-top: 14px;
	width: 100%;
	padding: 12px;
`;
const ScreenShotContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
const SelectModalBox = styled.div`
	width: 80%;

	background-color: #fff;
	max-width: 37.5rem;
	padding: 1.6rem;
	border-radius: 0.5rem;
	position: relative;
	img {
		width: 5rem;
		transform-origin: 100% 0;
		opacity: 1;
		position: absolute;
		top: 6px;
		right: 6px;
		transform: scale(0.28);
	}
`;
const ModalBox = styled.div`
	width: 80%;
	position: relative;
	background-color: #fff;
	max-width: 37.5rem;
	padding: 1.6rem;
	border-radius: 0.5rem;
	img {
		width: 5rem;
		transform-origin: 100% 0;
		opacity: 1;
		position: absolute;
		top: 4px;
		right: 4px;
		transform: scale(0.28);
	}
`;
const SocialModalBox = styled.div`
	width: 80%;
	position: relative;
	background-color: #fff;
	max-width: 37.5rem;
	padding: 0.5em 1.6rem 1.6rem;
	border-radius: 0.5rem;
`;

const ScreenshotContainer = styled.div`
	border-radius: 0.8em;
	background: linear-gradient(to bottom, white 99%, black 1%);
	overflow: auto;
	border: 1px solid #dce0f1;
	border-radius: 20px;
	position: relative;
	cursor: pointer;
	user-select: none;
	&:hover .target {
		visibility: visible;
	}
	img {
		pointer-events: none;
	}
`;

const Title = styled.div`
	cursor: pointer;
	font-size: 12px;
	font-weight: 300;
	margin: 0;
	padding: 5px;
	border-radius: 5px;
	background: rgba(0, 0, 0, 0.17);
	svg {
		width: 23px;
		height: 23px;
		vertical-align: middle;
	}
	img {
		height: 30px;
		width: 100%;
		transition: all 0.5s ease-out;
	}
`;
const SingleHeader = styled.div`
	display: flex;
	flex-direction: row;
	background: #eaf3ff;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3em;
	/* padding: 15px; */
	gap: 28px;
`;

const WebLink = styled.a`
	font-weight: 200;
	font-size: 1.3rem;
	text-decoration: none;
	color: var(--primary-color);
`;
const ScrollTop = styled.div`
	position: fixed;
	bottom: 12px;
	padding: 9px;
	-webkit-transform: rotate(270deg);
	-ms-transform: rotate(270deg);
	transform: rotate(270deg);
	-webkit-transform-origin: center;
	-ms-transform-origin: center;
	transform-origin: center;
	cursor: pointer;
	right: 29px;
	z-index: 100;
	height: 50px;
	width: 50px;
	border-radius: 50%;
	border: 1px solid #1d1d1d;
	background-color: white;
	-webkit-transition: all 5ms ease-out;
	transition: all 5ms ease-out;
	img {
		width: 100%;
	}
	:hover {
		transform: rotate(280deg);
	}
`;
const ElementsInCategoryContainer = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	margin: 1.5em auto;
	gap: 32px;
	width: 90%;
	@media (min-width: 540px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 768px) {
		width: 95%;

		margin: 0 auto 3em auto;
		gap: 32px;
		grid-template-columns: repeat(4, 1fr);
	}
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { query, params, req, res } = ctx;
	const { name } = query;
	let screens;

	const page = query.page || 1;
	const completeID = params.id + page.toString() + query.version;
	const { country: brandcountry } = await getCountry(name); //get the country associated with a brand using the superbase function getCountry

	//GET USER OBJECT SERVER SIDE
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);

	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	//get user belonging to that session
	const user = session ? session.user : null;

	// CACHING LOGIC
	const screensCacheObject = {};

	try {
		const client = new Redis(process.env.REDIS_URL); //get redis instance
		const CachedResults = JSON.parse(await client.get('screensCachedByID')); //get  screens data

		if (!CachedResults) {
			screens = await getScreensById(
				params.id,
				page,
				query,
				user,
				brandcountry
			); // if there are no cached results retrieve from supabase
			screensCacheObject[completeID] = screens; //store cached results to instance... the to differentiate different screens for the different pages a unique identifier using the
			// screensid, page number and screens version is used. the structure of the data in upstach would be as follows

			// {
			// 	screensCachedByID : screens[]
			// }

			client.set(
				'screensCachedByID',
				JSON.stringify(screensCacheObject),
				'EX',
				3600
			);
			console.log('read from supabase');
		} else if (completeID in CachedResults) {
			// if cache already exists fetch the screens for that unique identifier built from the screen identity, page number and screen version
			screens = CachedResults[completeID];
			console.log('read from Redis cache');
		} else if (CachedResults && !(completeID in CachedResults)) {
			screens = await getScreensById(
				params.id,
				page,
				query,
				user,
				brandcountry
			);
			CachedResults[completeID] = screens;
			client.set(
				'screensCachedByID',
				JSON.stringify(CachedResults),
				'EX',
				3600
			);
			console.log('read from supabase');
		}
	} catch (error) {
		console.log(error);

		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const screensBYID = await getRelatedScreensByID(params.id); //fetch brand

	return {
		props: {
			screens,
			brandcountry,
			screensBYID,
		},
	};
};
export default withPopContext(SinglePage);

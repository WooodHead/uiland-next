import React, { useContext, useEffect, useState } from 'react';
//Next library
import Router, { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

//All Supabase endpoints
import {
	addSingleScreens,
	DeleteSingleScreens,
	getScreensProperties,
	getAllSingleBookmarkNames,
	DeleteScreens,
	getAlbumBookmarkId,
	addBookmark,
	getProfileByEvent,
	getAllSingleBookmarkId,
	viewSingleBookmark,
	getElementCategoryFilter,
} from '../supabase';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

//Hooks
import useModal from './useModal';

//Context
import { UserContext } from '../context/authContext';
import { ScreenContext } from '../context/screenContext';

// Components
import { buttonTypes } from '../components/uiElements/button';
import { mobileCheck } from '../utils/isMobile';

const useScreenshot = (screens) => {
	const user = useContext(UserContext);
	const router = useRouter();
	const {
		modalSaveImage,
		isModalopen,
		toggleModal,
		newtoggleModal,
		loginToggleModal,
		isModalLogin,
		toggleBottomSheet,
		modalSheet,
		guideModalState,
		guideModal,
	} = useModal();

	// state for the bottomsheet
	const [openBottomSheet, setOpenBottomSheet] = useState(false);

	//state for the image url
	const [imageUrl, setImageUrl] = useState('');

	const [displayBasic, setDisplayBasic] = useState(false);
	const [imageContent, setImageContent] = useState({});

	//state for the filter by category
	const [inputFilter, setInputFilter] = useState('');

	const [Progress, setProgress] = useState(1);
	const [headerInfo, setHeaderInfo] = useState<{
		created_at: string;
		timeTravel: string[];
		url: string;
		name: string;
		logo: string;
		id: string;
	}>({
		name: '',
		logo: '',
		id: '',
		url: '',
		timeTravel: [],
		created_at: '',
	});
	const [payingUser, setPayingUser] = useState('');

	//state to manage the bookmark id of the album of images when clicked
	const [getAlbumId, setGetAlbumId] = useState([]);

	// toast state
	const [toastPendingText, setToastPendingText] = useState<string>('Saving');
	const [toastSuccessText, setToastSuccessText] = useState<string>('Saved 🎉');

	const [bookmarkk, setBookmarkk] = useState('');
	//state to hold the input state
	const [input, setInput] = useState('');

	//to track if user is on mobile
	const [mobile, setMobile] = useState<boolean>();

	//state to hold the names of bookmarks created
	const [selectBookmark, setSelectBookmark] = useState(['']);

	//state to disable button
	const [disabled, setDisabled] = useState<boolean>(false);

	//state to hold the limited screens
	const [limitedscreens, setLimitedScreens] = useState<
		[{ elementCategory: ''; id: ''; url: '' }]
	>([{ elementCategory: '', id: '', url: '' }]);

	//state to display the  paying banner
	const [payingbanner, setPayingBanner] = useState<string>('inactive');
	const [getId, setGetId] = useState<[{ screen_id: '' }] | any>([
		{ screen_id: '' },
	]);

	//state to set the active status of pill
	const [pillStatus, setPillStatus] = useState<number>(0);

	//state to display the filters
	const [elementsCategoryData, setElementsCategoryData] = useState([]);

	const [indiscreens, setIndiScreens] = useState([]);
	useEffect(() => {
		async function getIndividualScreens() {
			if (user) {
				const data = await getAllSingleBookmarkId(user);

				data?.forEach((item) => {
					setGetId((prevState) => {
						return [...prevState, item.screen_id];
					});
				});
			}
		}
		getIndividualScreens();
	}, [user]);

	useEffect(() => {
		// console.log(screens.filter((item) =>{
		// return	new Date(headerInfo.created_at).setDate(new Date(headerInfo.created_at).getDate() + 0) < new Date(item.created_at).setDate(new Date(item.created_at).getDate() + 5)
		// }))

		// console.log(headerInfo)
		// const date= new Date(screens[0].created_at)
		// console.log(new Date(screens[0].created_at).setDate(date.getDate() + 0))
		// console.log(date.setDate(date.getDate() + 5))
		// console.log(screens[0].created_at < "2023-01-08T02:35:37+00:00" )

		//this logic displays all the first version of screens of a company .
		//This function displays all the screens that were created lesss than 5 days
		//after the company table was created. This is to version this category as the first versions of screens
		
			setLimitedScreens(
				screens.filter((item) => {
					return (
						new Date(item.created_at).setDate(
							new Date(item.created_at).getDate()
						) >
						new Date(headerInfo.timeTravel[0]).setDate(
							new Date(headerInfo.timeTravel[0]).getDate() + 0
						)
					);
				})
			);
		
	}, [headerInfo, screens]);

	async function onClickPill(id, arr) {
		//stores id in pillstatus state
		setPillStatus(id);

		//function that runs if the first pill is selected
		if (id === 0) {
			setLimitedScreens(
				screens.filter((item: { created_at: '' }) => {
					// make the timetravel value  less than the createddate to enable it be filtered
					//had to make sure that the first date on timeTravel array is lesser than the first version of the application to
					//ensure that only the first set of screens are displayed
					return (
						new Date(item.created_at).setDate(
							new Date(item.created_at).getDate()
						) >
						new Date(headerInfo.timeTravel[id]).setDate(
							new Date(headerInfo.timeTravel[id]).getDate() + 0
						)
					);
				})
			);
		}

		//function that runs if the last pill is selected
		else if (id === arr.length - 1) {
			// console.log(headerInfo.timeTravel[id])
			// console.log(screens[0].created_at)
			// console.log(new Date(headerInfo.timeTravel[id]).setDate(new Date(headerInfo.timeTravel[id]).getDate() + 0))
			// console.log(new Date(screens[0].created_at).setDate(new Date(screens[0].created_at).getDate() + 0))
			setLimitedScreens(
				screens.filter((item: { created_at: '' }) => {
					return (
						new Date(item.created_at).setDate(
							new Date(item.created_at).getDate() + 0
						) <
						new Date(headerInfo.timeTravel[arr.length - 1]).setDate(
							new Date(headerInfo.timeTravel[arr.length - 1]).getDate() + 0
						)
					);
				})
			);
		} else {
			// console.log(new Date(headerInfo.timeTravel[id+1]).setDate(new Date(headerInfo.timeTravel[id+1]).getDate() + 0))
			// console.log(new Date(headerInfo.timeTravel[id+1]).setDate(new Date(headerInfo.timeTravel[id]).getDate() + 0))
			setLimitedScreens(
				screens.filter((item: { created_at: '' }) => {
					return (
						new Date(headerInfo.timeTravel[id + 1]).setDate(
							new Date(headerInfo.timeTravel[id + 1]).getDate() + 0
						) <
							new Date(headerInfo.timeTravel[id]).setDate(
								new Date(headerInfo.timeTravel[id]).getDate() + 0
							) &&
						new Date(headerInfo.timeTravel[id - 1]).setDate(
							new Date(headerInfo.timeTravel[id - 1]).getDate() + 0
						) >
							new Date(headerInfo.timeTravel[id]).setDate(
								new Date(headerInfo.timeTravel[id]).getDate() + 0
							)
					);
				})
			);
		}
	}

	//show unlimited screens to paid users
	// useEffect(() => {
	// 	async function getPayingUser() {
	// 		if (user) {
	// 			let getEvent = await getProfileByEvent(user);

	// 			if (
	// 				JSON.stringify(getEvent) === JSON.stringify([]) ||
	// 				getEvent[0].event === null ||
	// 				getEvent[0].event === undefined ||
	// 				getEvent[0].event === ''
	// 			) {
	// 				const result = screens.slice(0, 40);
	// 				setLimitedScreens(result);
	// 			} else {
	// 				setPayingBanner(getEvent[0].event);
	// 				setLimitedScreens(screens);
	// 			}
	// 		} else {
	// 			const result = screens.slice(0, 40);
	// 			setLimitedScreens(result);
	// 		}
	// 	}
	// 	getPayingUser();
	// }, [screens, user]);

	//omitting the [  ] here caused a massive render :(
	useEffect(() => {
		const getHeaderInfo = async () => {
			const data = await getScreensProperties(router.query.id);
			setHeaderInfo(data);
		};
		getHeaderInfo();
	}, [router.query.id]);

	//checker to empty the bookmark names select field if the user has deleted all his bookmarked images
	useEffect(() => {
		if (!getId) {
			setSelectBookmark(['']);
		}
	}, [getId]);

	useEffect(() => {
		const isMobile = mobileCheck();
		setMobile(isMobile);
	}, []);

	//checker to disable the submit button if the user has not created a new bookmark name or selected a previous bookname
	useEffect(() => {
		if (!input) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [input]);

	useEffect(() => {
		const allBookmarkNames = async () => {
			const data = await getAllSingleBookmarkNames();
			const result = selectBookmark.concat(data);
			setSelectBookmark(result);
		};
		allBookmarkNames();
	}, []);

	useEffect(() => {
		async function getBookmarkScreens() {
			if (user) {
				const data = await getAlbumBookmarkId(user);

				data.forEach((item) => {
					setGetAlbumId((prev) => {
						return [...prev, item.album_id];
					});
				});
			}
		}
		getBookmarkScreens();
	}, [user]);

	useEffect(() => {}, [input]);

	useEffect(() => {
		window.onresize = function () {
			const mobile = mobileCheck();
			setMobile(mobile);
		};
	}, []);

	const handleClickSubscribeButton = () => {
		Router.push('/pricing');
	};
	//filter
	const searchFilter = (
		array: [{ elementCategory: ''; url: ''; id: '' }],
		data: string
	) => {
		if (data === '') return array;
		return array.filter((el) => el.elementCategory.toLowerCase() === data);
	};

	function handleInputFilter(e: { target: { value: string } }) {
		//convert the e.target.value to lowercase and add to the inputfilter state
		setInputFilter(e.target.value.toLowerCase());
	}

	async function generateZIP() {
		if (user) {
			let getEvent = await getProfileByEvent(user);

			if (
				JSON.stringify(getEvent) === JSON.stringify([]) ||
				getEvent[0].event === null ||
				getEvent[0].event === undefined ||
				getEvent[0].event === ''
			) {
				Router.push('/pricing');
			} else {
				var zip = new JSZip();
				var count = 0;
				var zipFilename = 'images_bundle.zip';
				// we will download these images in zip file

				filtered?.forEach(async function (imgURL, i) {
					//show toast
					setProgress(2);
					setToastPendingText('Downloading All Images...');
					const id = i + 1;
					var filename = 'image' + -+id + '.png';
					var image = await fetch(imgURL.url);
					var imageBlog = await image.blob();
					var img = zip.folder('images');
					// loading a file and add it in a zip file
					img.file(filename, imageBlog, { binary: true });
					count++;
					if (count == filtered?.length) {
						zip.generateAsync({ type: 'blob' }).then(function (content) {
							saveAs(content, zipFilename);
							setToastSuccessText('Downloaded 🎉');
							setProgress(3);
							toastNotification(1);
						});
					}
				});
			}
		} else {
			Router.push('/pricing');
		}
	}

	const copy = async () => {
		// copies the link and shows the toast

		setProgress(2);
		setToastPendingText('Copying');
		await navigator.clipboard.writeText(
			`https://uiland.design/screens/${router.query.name}/screens/${router.query.id}`
		);
		setToastSuccessText('Copied 🎉');
		setProgress(3);
		toastNotification(1);
	};
	//used to hide hide the modal when clicked
	// const onHide = (name) => {
	// 	dialogFuncMap[`${name}`](false);
	// };
	//tracks changes in the input field
	function handleChange(e) {
		setInput(e.target.value);
	}
	//shows the modal and populates the imageContent state
	async function bookmark(data) {
		if (user) {
			newtoggleModal();

			setImageContent(data);
		} else {
			loginToggleModal();
		}
	}

	useEffect(() => {
		async function getAlbums() {
			if (user) {
				const data = await viewSingleBookmark(router.query.name);
				setIndiScreens(data);
			}
		}
		getAlbums();
	}, [router.query.name, user]);

	//function to delete individual screens

	async function deleteIndividualBookmark(data) {
		setProgress(2);
		setToastPendingText('Deleting');
		const deletedItem = await DeleteSingleScreens(data);

		if (deletedItem === null) {
			const filteredResult = getId.filter(
				(result: number | string) => result !== data.id
			);
			const filteredIndiResult = indiscreens.filter(
				(result: { screen_id: { id: '' } }) => result.screen_id.id !== data.id
			);
			setIndiScreens(filteredIndiResult);
			setGetId(filteredResult);
			setToastSuccessText('Deleted :(');
			setProgress(3);
			toastNotification(1);
		}
	}
	//function to bookmark individual screen
	async function submit(e) {
		//prevents default refresh

		e.preventDefault();
		if (user) {
			setProgress(2);
			setToastPendingText('Saving');
			const result = await addSingleScreens(imageContent, input, user);

			if (result) {
				setInput('');

				getId.push(result[0].screen_id);

				// saves the image and shows the toast

				setToastSuccessText('Saved 🎉');
				setProgress(3);
				toastNotification(1);
				selectBookmark.push(input);
				newtoggleModal();
			}
		} else {
			console.log('pls login');
		}
	}
	//function to download the individual images
	async function downloadImage() {
		if (user) {
			gtag.event('click_download', 'general', 'download', 'imageUrl');
			setProgress(2);
			setToastPendingText('Downloading...');

			//fetches the image
			const image = await fetch(imageUrl);

			//converts it to a blob
			const imageBlog = await image.blob();

			const imageURL = URL.createObjectURL(imageBlog);

			//creates the a tag for download to happen <a download="image file name here" href="url"></a>
			const link = document.createElement('a');
			link.href = imageURL;
			link.download = 'image file name here';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setToastSuccessText('Downloaded 🎉');
			setProgress(3);
			toastNotification(1);
		} else {
			loginToggleModal();
		}
	}
	async function copyImage() {
		if (user) {
			gtag.event('click_copy', 'general', 'copy', 'copied');
			//contains a url in this format
			// "http://localhost:3000/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fuiland.appspot.com%2Fo%2FCowrywise%252FCowrywise-screens%252FScreenshot_2022-10-13-14-46-21-882_com.cowrywise.android-min.jpg%3Falt%3Dmedia%26token%3D3efdba80-8ec5-463a-9466-317f9247a6c3&w=1080&q=75"
			//which contains the prefetched images
			// This prevents cors error while getting the images
			setProgress(2);
			setToastPendingText('Copying');
			const response = await fetch(imageUrl);

			const blob = await response.blob();

			navigator.clipboard.write([
				new window.ClipboardItem({
					[blob.type]: blob,
				}),
			]);
			setToastSuccessText('Copied Image');
			setProgress(3);
			toastNotification(1);
		} else {
			loginToggleModal();
		}
	}
	//util for toast notification
	const toastNotification = (state) => {
		setTimeout(() => {
			setProgress(state);
		}, 3000);
	};
	//adds image album to bookmark
	async function handleAddToBookMark() {
		if (user) {
			setToastPendingText('Saving to collections 🎉');
			setProgress(2);
			const result = await addBookmark(router.query.id, user);

			if (result) {
				getAlbumId.push(router.query.id);

				setToastSuccessText('Saved to collections 🎉');
				setProgress(3);
				toastNotification(1);
			}
		} else {
			loginToggleModal();
		}
	}
	//deletes image album to bookmark
	async function handleDeleteFromBookMark() {
		setToastPendingText('Deleting from collections');
		setProgress(2);
		const result = await DeleteScreens(router.query.id);

		if (result === null) {
			setGetAlbumId([]);
			setToastSuccessText('Deleted from collections :(');
			setProgress(3);
			toastNotification(1);
		}
	}
	function openBottomSheetModal(e) {
		setImageUrl(
			e.target.parentElement.parentElement.parentElement.children[0].children[0]
				.children[1].currentSrc
		);

		if (mobile) {
			setOpenBottomSheet(true);
		} else {
			toggleBottomSheet();
		}
	}
	function closeBottomSheetModal() {
		setOpenBottomSheet(false);
	}

	const filtered = searchFilter(limitedscreens, inputFilter);

	//update the filter component from the backend
	useEffect(() => {
		function updateFilter() {
			const filtered = limitedscreens.map((item) => item.elementCategory);
			const uniqueResult = Array.from(new Set(filtered));

			setElementsCategoryData(uniqueResult);
		}
		updateFilter();
	}, [limitedscreens]);

	//the list of properties to filter by

	const dialogFuncMap = {
		displayBasic: setDisplayBasic,
	};

	//finds the ids of album screens that have been bookmarked and stores in an array
	//I used it to indicate on the frontend what image have been saved

	return {
		headerInfo,
		indiscreens,
		toggleBottomSheet,
		downloadImage,
		copyImage,
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
		guideModalState,
		guideModal,
		copy,
		isModalLogin,
		loginToggleModal,
		openBottomSheet,
		closeBottomSheetModal,
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
	};
};

export default useScreenshot;

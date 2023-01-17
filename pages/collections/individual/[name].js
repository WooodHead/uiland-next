import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserContext } from "../../../context/authContext";
import { DeleteSingleScreens, viewSingleBookmark } from "../../../supabase";
import EmptyState from "../../../components/EmptyState";
import { ScreenContext } from "../../../context/screenContext";

export default function IndividualCollections() {

	const {
		modalSaveImage,
		isModalopen,
		toggleModal,
		newtoggleModal,
		loginToggleModal,
		isModalLogin,
		toggleBottomSheet,
		modalSheet,
  } = useModal();
  





	// state for the bottomsheet
	const [openBottomSheet, setOpenBottomSheet] = useState(false);

	//state for the image url
	const [imageUrl, setImageUrl] = useState("");

	//state for the filter by category
	const [inputFilter, setInputFilter] = useState("");

	const [headerInfo, setHeaderInfo] = useState({});
	const [payingUser, setPayingUser] = useState("");

	//state to manage the bookmark id of the album of images when clicked
	const [getAlbumId, setGetAlbumId] = useState([]);

	// toast state
	const [toastSuccessText, setToastSuccessText] = useState("Saved 🎉");

	const [bookmarkk, setBookmarkk] = useState("");
	//state to hold the input state
	const [input, setInput] = useState("");

	//to track if user is on mobile
	const [mobile, setMobile] = useState();

	//state to hold the names of bookmarks created
	const [selectBookmark, setSelectBookmark] = useState([""]);

	//state to disable button
	const [disabled, setDisabled] = useState(false);

	//state to hold the limited screens
	const [limitedscreens, setLimitedScreens] = useState([]);

	//state to display the  paying banner
  const [payingbanner, setPayingBanner] = useState("");
  




	useEffect(() => {
		async function getPayingUser() {
			console.log(user);
			if (user) {
				console.log(user);
				let getEvent = await getProfileByEvent(user);
				console.log(JSON.stringify(getEvent) === JSON.stringify([]));
				console.log(getEvent[0].event === null);
				if (
					JSON.stringify(getEvent) === JSON.stringify([]) ||
					getEvent[0].event === null ||
					getEvent[0].event === undefined ||
					getEvent[0].event === ""
				) {
					const result = screens.slice(0, 1);
					console.log(result);
					setLimitedScreens(result);
				} else {
					setPayingBanner(getEvent[0].event);
					console.log(getEvent[0].event);
					setLimitedScreens(screens);
				}
			} else {
				const result = screens.slice(0, 1);
				console.log(result);
				setLimitedScreens(result);
			}
		}
		getPayingUser();
	}, [screens, user]);

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
			setSelectBookmark([""]);
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
				console.log(data);
				data.forEach((item) => {
					setGetAlbumId((prev) => {
						return [...prev, item.album_id];
					});
				});
			}
		}
		getBookmarkScreens();
	}, [user]);

	useEffect(() => {
		console.log(input);
	}, [input]);

	useEffect(() => {
		window.onresize = function () {
			const mobile = mobileCheck();
			setMobile(mobile);
		};
	}, []);








	const handleClickSubscribeButton = () => {
		console.log("handleClickSubscribeButton");
		if (!user) {
			loginToggleModal();
		} else {
			Router.push("/pricing");
		}
	};
	//filter
	const searchFilter = (array, data) => {
		if (data === "") return array;
		return array.filter((el) => el.elementCategory.toLowerCase() === data);
	};
	function handleInputFilter(e) {
		//convert the e.target.value to lowercase and add to the inputfilter state
		setInputFilter(e.target.value.toLowerCase());
	}
	const copy = async () => {
		// copies the link and shows the toast

		setProgress(2);
		setToastPendingText("Copying");
		await navigator.clipboard.writeText(
			`https://uiland.design/screens/${router.query.name}/screens/${router.query.id}`
		);
		setToastSuccessText("Copied 🎉");
		setProgress(3);
		toastNotification(1);
	};
	//used to hide hide the modal when clicked
	const onHide = (name) => {
		dialogFuncMap[`${name}`](false);
	};
	//tracks changes in the input field
	function handleChange(e) {
		setInput(e.target.value);
	}
	//shows the modal and populates the imageContent state
	async function bookmark(data) {
		if (user) {
			newtoggleModal();
			console.log(data);
			setImageContent(data);
		} else {
			loginToggleModal();
		}
	}
	//function to delete individual screens
	async function deleteIndividualBookmark(data) {
		setProgress(2);
		setToastPendingText("Deleting");
		const deletedItem = await DeleteSingleScreens(data);
		console.log(deletedItem);
		if (deletedItem === null) {
			console.log(data.id);
			const filteredResult = getId.filter((result) => result !== data.id);
			console.log(filteredResult);
			setGetId(filteredResult);
			setToastSuccessText("Deleted :(");
			setProgress(3);
			toastNotification(1);
		}
	}
	//function to bookmark individual screen
	async function submit(e) {
		//prevents default refresh
		console.log(e);
		e.preventDefault();
		if (user) {
			console.log(user, imageContent, input);
			setProgress(2);
			setToastPendingText("Saving");
			const result = await addSingleScreens(imageContent, input, user);
			console.log(result);
			if (result) {
				setInput("");
				console.log(result[0].screen_id);
				getId.push(result[0].screen_id);

				// saves the image and shows the toast

				setToastSuccessText("Saved 🎉");
				setProgress(3);
				toastNotification(1);
				selectBookmark.push(input);
				newtoggleModal();
			}
		} else {
			console.log("pls login");
		}
	}
	//function to download the individual images
	async function downloadImage() {
		setToastPendingText("Downloading...");

		//fetches the image
		const image = await fetch(imageUrl);
		console.log(image);

		//converts it to a blob
		const imageBlog = await image.blob();
		console.log(imageBlog);
		const imageURL = URL.createObjectURL(imageBlog);
		console.log(imageURL);

		//creates the a tag for download to happen <a download="image file name here" href="url"></a>
		const link = document.createElement("a");
		link.href = imageURL;
		link.download = "image file name here";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		setToastSuccessText("Downloaded 🎉");
		setProgress(3);
		toastNotification(1);
	}
	async function copyImage() {
		//contains a url in this format
		// "http://localhost:3000/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fuiland.appspot.com%2Fo%2FCowrywise%252FCowrywise-screens%252FScreenshot_2022-10-13-14-46-21-882_com.cowrywise.android-min.jpg%3Falt%3Dmedia%26token%3D3efdba80-8ec5-463a-9466-317f9247a6c3&w=1080&q=75"
		//which contains the prefetched images
		// This prevents cors error while getting the images
		setProgress(2);
		setToastPendingText("Copying");
		const response = await fetch(imageUrl);
		console.log(response);
		const blob = await response.blob();

		navigator.clipboard.write([
			new window.ClipboardItem({
				[blob.type]: blob,
			}),
		]);
		setToastSuccessText("Copied Image");
		setProgress(3);
		toastNotification(1);
	}
	
	//adds image album to bookmark
	async function handleAddToBookMark() {
		if (user) {
			setToastPendingText("Saving to collections 🎉");
			setProgress(2);
			const result = await addBookmark(router.query.id, user);
			console.log(result);
			if (result) {
				getAlbumId.push(router.query.id);
				console.log(getAlbumId);
				setToastSuccessText("Saved to collections 🎉");
				setProgress(3);
				toastNotification(1);
			}
		} else {
			//add modal later
			loginToggleModal();
		}
	}
	//deletes image album to bookmark
	async function handleDeleteFromBookMark() {
		setToastPendingText("Deleting from collections");
		setProgress(2);
		const result = await DeleteScreens(router.query.id);
		console.log(result);
		if (result === null) {
			setGetAlbumId([]);
			setToastSuccessText("Deleted from collections :(");
			setProgress(3);
			toastNotification(1);
		}
	}
	function openBottomSheetModal(e) {
		setImageUrl(
			e.target.parentElement.parentElement.parentElement.children[0].children[0]
				.children[1].currentSrc
		);
		console.log(
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
	//the list of properties to filter by
	const elementsCategoryData = [
		"",
		"search",
		"card",
		"dialog",
		"skeleton",
		"tooltip",
		"bottom sheet",
		"divider",
		"input",
		"loading",
		"button",
		"toast",
		"radio button",
		"dropdown",
		"copy icon",
  ];
	const dialogFuncMap = {
		displayBasic: setDisplayBasic,
	};



	const {getId,setGetId} = useContext(ScreenContext)

  const router = useRouter();
  const user = useContext(UserContext);
  const [screens, setScreens] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [imageContent, setImageContent] = useState({});

  const [Progress, setProgress] = useState(1);
  const [toastPendingText, setToastPendingText] = useState("Saving");


  useEffect(() => {
    async function getAlbums() {
      if (user) {
      
        const data = await viewSingleBookmark(router.query.name);
        console.log(data);
        setScreens(data);
      }
    }
    getAlbums();
  }, [router.query.name, user]);

  //copy images
  async function copyImage(e) {
    const response = await fetch(
      e.target.parentElement.children[3].children[1].currentSrc
    );
    const blob = await response.blob();
    navigator.clipboard.write([
      new window.ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    console.log("Image copied.");
  }

	async function deleteIndividualBookmark(data) {
		setProgress(2);
		setToastPendingText("Deleting");
		const deletedItem = await DeleteSingleScreens(data);
		console.log(deletedItem);
		if (deletedItem === null) {
			console.log(data.id);
			const filteredResult = getId.filter((result) => result !== data.id);
			console.log(filteredResult);
			setGetId(filteredResult);
			setToastSuccessText("Deleted :(");
			setProgress(3);
			toastNotification(1);
		}
	}

  const toastNotification = (state) => {
		setTimeout(() => {
			setProgress(state);
		}, 3000);
	};





  return (
    <>
      <SingleHeader>
        <>
          <Title>{router.query.name}</Title>

          <div></div>
        </>
      </SingleHeader>
      <ElementsInCategoryContainer>
        {screens ? (
          screens?.map((data) => (
            <>
            <ScreenshotContainer key={data.url}>
              {/* add the name to alt tag */}
              <Image
                src={data.screen_id.url}
                alt={`Screenshots of  App`}
                width={1080}
                height={2240}
              />
            </ScreenshotContainer>
            <SecondRow>
            {getId.includes(data.id) ? (
              <DeleteIcon
                deleteIndividualBookmark={deleteIndividualBookmark}
                data={data}
              />
            ) : (
              <SaveIcon bookmark={bookmark} data={data} />
            )}
            <ThreeDots openBottomSheet={openBottomSheetModal} />
              </SecondRow>
              </>
          ))
        ) : (
          <EmptyState/>
        )}
      </ElementsInCategoryContainer>
    </>
  );
}
const ModalBox = styled.div`
  background-color: #fff;
  max-width: 37.5rem;
  padding: 1.6rem;
  border-radius: 0.5rem;
`;

const DownloadWrapper = styled.div`
  position: absolute;
  block: "";
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 7px 16px;
  align-items: flex-start;
  top: 10px;
  right: 94px;
  border-radius: 2em;
  visibility: hidden;
`;
const CopyWrapper = styled.div`
  position: absolute;
  block: "";
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 7px 16px;
  align-items: flex-start;
  top: 10px;
  right: 18px;
  border-radius: 2em;
  visibility: hidden;
`;

const AbsoluteBox = styled.div`
  position: absolute;
  block: "";
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 7px 16px;
  align-items: flex-start;
  top: 10px;
  right: 54px;
  border-radius: 2em;
  visibility: hidden;
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

const Title = styled.h1`
  z-index: 99;
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  padding: 5px;
  position: absolute;
  block: "";
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.17);
  z-index: 99;
  top: 0;
  right: 0;
  visibility: hidden;
  svg {
    width: 23px;
    height: 23px;
    vertical-align: middle;
  }
  img {
    height: 20px;
    width: 20px;
    transition: all 0.5s ease-out;
  }
`;
const SingleHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 8px;
`;

const WebLink = styled.a`
  font-weight: 200;
  font-size: 1.3rem;
  text-decoration: none;
  color: var(--primary-color);
`;
const ElementsInCategoryContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin: 1.5em auto;
  gap: 20px;
  width: 90%;
  @media (min-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    width: 95%;
    margin: 3em auto;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
`;

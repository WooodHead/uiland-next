import React, { useState, useEffect } from 'react';
import { addImagesToScreens, getImage } from '../supabase';
function Admin() {
	const [available, setAvaliable] = useState([]);
	const [input, setInput] = useState('');
	const [company, setCompany] = useState('');
	const [screenIds, setScreenIds] = useState('');
	const [images, setImages] = useState([
		//add images json to screen
	]);
	useEffect(() => {
		async function getAllImages() {
			images.map(async (image, id) => {
				if (!available.includes(image)) {
					if (input === 'yes') {
						//This was for getting the image url from supabase server after the name of the image is passed in as a parameter
						// const data = getImage(company, image);

						const red = await addImagesToScreens(screenIds, id, image);
						// console.log(red);
						// console.log(image);
						setAvaliable((prev) => {
							return [...prev, image];
						});
					}
				}
			});
		}
		getAllImages();
	}, [input]);

	// console.log(available);
	function handleChange(e) {
		setInput(e.target.value);
	}
	function handleChangeCompany(e) {
		setCompany(e.target.value);
	}
	function handleChangeScreenIds(e) {
		setScreenIds(e.target.value);
	}
	return (
		<div>
			<label>Company:</label>
			<input type='text' value={company} onChange={handleChangeCompany} />
			<label>Id:</label>
			<input type='text' value={screenIds} onChange={handleChangeScreenIds} />
			<label>Code:</label>
			<input type='text' value={input} onChange={handleChange} />
		</div>
	);
}

export default Admin;

import { getAllScreens } from '../supabase';

// function for getting random number,num of items from an array, arr
const RandomItem = (arr, num = 1) => {
	const res = [];
	for (let i = 0; i < num; ) {
		const random = Math.floor(Math.random() * arr.length);
		if (res.indexOf(arr[random]) !== -1) {
			continue;
		}
		res.push(arr[random]);
		i++;
	}
	return res;
};

export const formatScreens = async (screens) => {
	//if screens is an array of screens select three random brands from it
	if (screens.length > 0) {
		return RandomItem(screens, 3);
	}

	// else if screens is an empty array select 3 random brands from all brands
	return RandomItem(await getAllScreens(), 3);
};

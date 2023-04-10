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
	if (screens.length > 0) {
		return RandomItem(screens, 3);
	}

     return RandomItem(await getAllScreens(),3)
};

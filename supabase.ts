import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

//supabase signup with Google Oauth
// const getURL = () => {
// 	let url =
// 		process?.env?.NEXT_PUBLIC_SITE_URL && // Set this to your site URL in production env.
// 		process?.env?.NEXT_PUBLIC_SITE_URL && // Automatically set by Vercel.
// 		'http://localhost:3000/';

// 	// Make sure to include `https://` when not localhost.
// 	url = url.includes('http') ? url : `https://${url}`;
// 	// Make sure to including trailing `/`.
// 	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
// 	return url;
// };

export async function signInWithGoogle() {
	let redirectUrl =
		process.env.NODE_ENV === 'production'
			? 'https://uiland.design'
			: 'http://localhost:3000/';

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: redirectUrl,
		},
	});
	return data;
}

//    get all screens
export async function getAllScreens() {
	let { data: Screens, error } = await supabase
		.from('Screens')
		.select('*')
		.order('created_at', { ascending: false });
	// Screens.forEach((res)=>{
	//   return res['user'] = "a4f0bf66-2a36-4b4f-bf8b-b082cf9aa5c4"
	// })

	return Screens;
}

//    get all screens total number
export async function getAllScreensCount() {
	const { count, error } = await supabase
		.from('Screens')
		.select('*', { count: 'exact', head: true });
	return count;
}

//get  limited screens for view more
//    export async function getViewMoreScreens(id) {

// 	const { data, error } = await supabase
// 	.from('Screens')
// 	.select()
// 	.not('screenId', 'is', id)

// 	  return data;
// 	}

//    get all limited screens
// export async function getLimitedScreens() {
//   let { data: Screens, error } = await supabase.from("Screens").select("*").limit(1);
//
//   return Screens;
// }

//get individual screens of the newest version content

export async function updateUserProfileInfo(user, country) {
	const { error } = await supabase
		.from('profile')
		.update({ country: country })
		.eq('id', user.id);
	if (error) {
		console.log(error);
	}
}

export async function getCountry(brandName: string | string[]) {
	//gets country i.e Nigeria | international of the different brands

	//brand name comes with the first letter not capitalized which differs from the way it is stored in supabase

	const brand = brandName[0].charAt(0).toUpperCase() + brandName.slice(1); //capitalizes the brand name
	const { data, error } = await supabase
		.from('Screens')
		.select('country')
		.eq('name', brand)
		.limit(1);

	return data[0];
}

export async function getHighestversionofBrand(id) {
	const { data, error } = await supabase
		.from('screenImages')
		.select('version')
		.order('version', { ascending: false })
		.eq('screenId', id)
		.limit(1);
	if (error) {
		console.log(error);
	}

	return data[0]['version'];
}

export async function getScreensById(
	id,
	page,
	query,
	user,
	brandCountry = 'Nigeria'
) {
	let country;
	const userdata = await checkSubscribedUSer(user);
	const defaultVersion = await getHighestversionofBrand(id);

	if (user) {
		// get user country information
		const { data, error } = await supabase
			.from('profile')
			.select('country')
			.eq('id', user.id);
		country = data[0]['country'];
		if (error) {
			console.log(error);
		}
	}

	//limit screens for unauthenticated users or international unpaid users
	if (
		!userdata ||
		(userdata.event !== 'subscription.create' &&
			country !== 'Nigeria' &&
			brandCountry !== 'International')
	) {
		const { data, error } = await supabase
			.from('screenImages')
			.select('*')
			.order('url', { ascending: true })
			.limit(28)
			.eq('screenId', id)
			.eq('version', query.version || defaultVersion);
		if (error) {
			console.log(error);
		}

		return data;
	}

	let limit = 27;
	let limitMaxRange = page * limit;
	let limitMinRange = page * limit - limit;

	const { data, error } = await supabase
		.from('screenImages')
		.select('version')
		.eq('screenId', id);

	//gets unique names in the db
	const result = data?.map((object) => object.version);
	const uniqueResult = Array.from(new Set(result));

	//this is for the boomplay screens
	if (uniqueResult[0] === 1 && uniqueResult.length === 1) {
		if (
			id === 'b274aac8-8a59-4034-8456-f8a2539ddc24' ||
			id === '04b85c78-5dd6-4387-a785-a5edb72d0937'
		) {
			const { data, error } = await supabase
				.from('screenImages')
				.select('*')
				.order('url', { ascending: true })
				//   i will use this to limit the result later
				//   .limit(1)
				.range(limitMinRange, limitMaxRange)
				.eq('screenId', id)
				.eq('version', 1);

			return data;
		} else {
			const { data, error } = await supabase
				.from('screenImages')
				.select('*')
				.order('order', { ascending: true })
				//   i will use this to limit the result later
				//   .limit(1)
				.range(limitMinRange, limitMaxRange)
				.eq('screenId', id)
				.eq('version', 1);

			return data;
		}
	} else {
		if (
			id === 'b274aac8-8a59-4034-8456-f8a2539ddc24' ||
			id === '04b85c78-5dd6-4387-a785-a5edb72d0937'
		) {
			const { data, error } = await supabase
				.from('screenImages')
				.select('*')
				.order('url', { ascending: true })
				//   i will use this to limit the result later
				//   .limit(1)
				.range(limitMinRange, limitMaxRange)
				.eq('screenId', id)
				.eq('version', query.version || 2);

			return data;
		} else {
			const { data, error } = await supabase
				.from('screenImages')
				.select('*')
				.order('order', { ascending: true })
				//   i will use this to limit the result later
				//   .limit(1)
				.range(limitMinRange, limitMaxRange)
				.eq('screenId', id)
				.eq('version', query.version || 2);

			return data;
		}
	}
}

//get individual screens of older versions
export async function getOlderScreensById(id, page, version) {
	let limit = 19;
	let limitMaxRange = page * limit;
	let limitMinRange = page * limit - limit;

	//this is for the boomplay screens
	if (
		id === 'b274aac8-8a59-4034-8456-f8a2539ddc24' ||
		id === '04b85c78-5dd6-4387-a785-a5edb72d0937'
	) {
		const { data, error } = await supabase
			.from('screenImages')
			.select('*')
			.order('url', { ascending: true })
			//   i will use this to limit the result later
			//   .limit(1)
			.range(limitMinRange, limitMaxRange)
			.eq('screenId', id)
			.eq('version', version || 1);

		return data;
	} else {
		const { data, error } = await supabase
			.from('screenImages')
			.select('*')
			.order('order', { ascending: true })
			//   i will use this to limit the result later
			//   .limit(1)
			.range(limitMinRange, limitMaxRange)
			.eq('screenId', id)
			.eq('version', version || 1);

		return data;
	}
}

//get individual screen content count
export async function getScreensByIdCount(id, version) {
	const { data, error } = await supabase
		.from('screenImages')
		.select('version')
		.eq('screenId', id);

	//gets unique names in the db
	const result = data?.map((object) => object.version);
	const uniqueResult = Array.from(new Set(result));

	//this is for the boomplay screens
	if (uniqueResult[0] === 1 && uniqueResult.length === 1) {
		const { count, error } = await supabase
			.from('screenImages')
			.select('*', { count: 'exact', head: true })
			.eq('screenId', id)
			.eq('version', 1);
		return count;
	} else {
		const { count, error } = await supabase
			.from('screenImages')
			.select('*', { count: 'exact', head: true })
			.eq('screenId', id)
			.eq('version', version || 2);
		return count;
	}
}

//get individual screens content(limited)
export async function getLimitedScreensById(id) {
	const { data, error } = await supabase
		.from('screenImages')
		.select('*')
		.order('order', { ascending: true })
		.limit(1)
		.eq('screenId', id);
	return data;
}

//supabase session
export async function getSession() {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
}

//get paying user by checking the event key
export async function getProfileByEvent(user) {
	const { data, error } = await supabase
		.from('profile')
		.select('event')
		//   i will use this to limit the result later
		//   .limit(1)
		.eq('id', user.id);
	return data;
}

export async function checkSubscribedUSer(user) {
	//check if user is subscribed
	if (!user) return;
	const { data, error } = await supabase
		.from('profile')
		.select('event')
		//   i will use this to limit the result later
		//   .limit(1)
		.eq('email', user.email);
	return data[0];
}

export async function getScreensProperties(id) {
	const { data, error } = await supabase
		.from('Screens')
		.select('*')
		.eq('id', id);

	const result = data ? data[0] : [];
	return result;
}

//get Album Bookmark

export async function getBookmarks(user) {
	const { data, error } = await supabase
		.from('bulkBookmark')
		.select(
			`
       id,
       album_id (
           id,
           startScreens,
           logo,
           name,
           url,
           category,
		   country
       )
     `
		)
		.eq('user_id', user.id);

	//   i will use this to limit the result
	//   .limit(1)
	//   .eq('screenId', 'b76461af-34f9-4523-a892-b4991dfa364a')

	return data;
}

//view single Bookmark

export async function viewSingleBookmark(name) {
	const { data, error } = await supabase
		.from('singleImageBookmark')
		.select(
			`
      id,
      screen_id (
          id,
          url
      )
    `
		)
		.eq('bookmark_name', name);

	return data;
}

//delete bulkscreen
export async function DeleteScreens(id) {
	const { error, data } = await supabase
		.from('bulkBookmark')
		.delete()
		.eq('album_id', id);

	return data;
}

//add album to bookmark
export async function addBookmark(id, user) {
	const { data, error } = await supabase
		.from('bulkBookmark')
		.insert({ album_id: id, user_id: user.id })
		.select();

	return data;
}

//    get bookmark id in single bookmark
export async function getAlbumBookmarkId(user) {
	const { data, error } = await supabase
		.from('bulkBookmark')
		.select('album_id')
		.eq('user_id', user?.id);

	return data;
}

//add images to singleImageBookmark
export async function addSingleScreens(content, input, user) {
	const { data, error } = await supabase
		.from('singleImageBookmark')
		.insert({
			screen_id: content.id,
			bookmark_name: input,
			url: content.url,
			user_id: user.id,
		})
		.select();
	return data;
}

//delete singlebookmark
export async function DeleteSingleScreens(result) {
	const { error, data } = await supabase
		.from('singleImageBookmark')
		.delete()
		.eq('screen_id', result.id);

	return data;
}

//get images from singleImageBookmark
export async function getSingleScreens(user) {
	const { data, error } = await supabase
		.from('singleImageBookmark')
		.select(
			`
                screen_id,
                screenImages (
                    id,
                    url
                )
              `
		)
		.eq('user_id', user.id);
	return data;
}

//    get bookmark id in single bookmark
export async function getAllSingleBookmarkId(user) {
	const { data, error } = await supabase
		.from('singleImageBookmark')
		.select('screen_id')
		.eq('user_id', user?.id);

	return data;
}

//    get unique bookmark names in single bookmark
export async function getAllSingleBookmarkNames() {
	const { data, error } = await supabase
		.from('singleImageBookmark')
		.select('bookmark_name');
	// .eq('user_id', user.id)

	//gets unique names in the db
	const result = data?.map((object) => object.bookmark_name);
	const uniqueResult = Array.from(new Set(result));
	return uniqueResult;
}

//    get unique filters in a company
export async function getElementCategoryFilter(id) {
	const { data, error } = await supabase
		.from('screenImages')
		.select('elementCategory')
		.eq('screenId', id);

	//gets unique names in the db
	const result = data?.map((object) => object.elementCategory);
	const uniqueResult = Array.from(new Set(result));
	return uniqueResult;
}

//delete account
export async function deleteAccount(user) {
	const { data, error } = await supabase
		.from('profile')
		.delete()
		.eq('id', user.id);

	return data;
}

//supabase signout
export async function signout() {
	await supabase.auth.signOut();
}

export async function getUserProfile(user) {
	if (user) {
		const { data, error } = await supabase
			.from('profile')
			.select('*')
			//   i will use this to limit the result later
			//   .limit(1)
			.eq('id', user.id);

		return data;
	}
}

//get urls from public storage
export function getImage(company, image) {
	const { data } = supabase.storage.from(company).getPublicUrl(image);

	return data;
}

//my magic tool
export async function addImagesToScreens(
	screenId: string,
	id: number,
	url: string
) {
	const { data, error } = await supabase
		.from('screenImages')
		.insert({
			screenId: screenId,
			url: url,
			order: 10200 + id,
			version: 1,
		})
		.select();

	return data;
}

//get the range of dates wwithin a period
export async function getRange() {
	const { data, error } = await supabase
		.from('screenImages')
		.select()
		.rangeLte('created_at', '[2023-01-01 14:00, 2023-03-01 16:00)');
}

export const addUserData = async (type, formdata) => {
	const { error, data } = await supabase.from(type).insert(formdata).select();

	if (error) {
		console.log(error);
	}

	return data;
};

export const numberOfDownloads = async (user) => {
	const { data, error } = await supabase.rpc('downloads', {
		user_id: user.id,
		increment_num: 1,
	});
	return data;
};

export const numberOfCopyImage = async (user) => {
	const { data, error } = await supabase.rpc('copy', {
		user_id: user.id,
		increment_num: 1,
	});
	return data;
};

// added version to the table
//it worked
// export const addVersion=async()=>{
// 	const { error } = await supabase
//   .from('screenImages')
//   .update({ version: 1 })
//   .eq('screenId', 'b76461af-34f9-4523-a892-b4991dfa364a')
//   return error
// }

export const getRelatedScreensByCategory = async (category, id) => {
	const { error, data } = await supabase
		.from('Screens')
		.select('*')
		.eq('category', category)
		.neq('id', id);

	if (error) {
		console.log(error);
	}

	return data;
};

export const getRelatedScreensByID = async (id) => {
	//get category of brand with that id
	const { error, data } = await supabase
		.from('Screens')
		.select('category')
		.eq('id', id);

	if (error) {
		console.log(error);
	}

	const { category } = data[0];
	const screensData = await getRelatedScreensByCategory(category, id); //get brands that are in the same category as the brand with the id viewed

	return screensData; //this can either be an empty array or an array of screens
};

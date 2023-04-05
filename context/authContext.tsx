import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { supabase, getSession } from '../supabase';
import axios from 'axios';
export const UserContext = createContext(null);
export const UserCountryContext = createContext(null);

export const UserContextProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [country, setCountry] = useState('Nigeria');
	const setUserCountry = async () => {
		// if (navigator) {
		// 	let latitude, longitude;
		// 	navigator.geolocation.getCurrentPosition(async function (position) {
		// 		latitude = position.coords.latitude;
		// 		longitude = position.coords.longitude;
		// 		try {
		// 			const response = await axios(
		// 				`http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=codewarsfx`
		// 			);

		// 			if (response) {
		// 				// setCountry(response.data.countryName);
		// 			}
		// 		} catch (error) {
		// 			console.log('an error occurred while trying to retrieve country');
		// 		}
		// 	});

		try {
			const response = await axios(
				'https://ipinfo.io/json?token=92d047f347bbcf'
			);
			const { country } = response.data;
			if (country == 'NG') {
				setCountry('Nigeria');
			} else {
				setCountry(country);
			}
		} catch (error) {
			console.log('an error occurred while trying to retrieve country');
			setCountry('Nigeria');
		}
	};

	//supabase auth listener for changes
	useEffect(() => {
		async function authListener() {
			supabase.auth.onAuthStateChange((event) => {
				if (event == 'SIGNED_OUT') {
					setUser(null);
					router.push('/');
				}
			});
		}
		authListener();
		setUserCountry();
	}, []);

	useEffect(() => {
		const supabaseAuth = async () => {
			const session = await getSession();
			if (session) {
				return setUser(session.user);
			}
			return setUser(null);
		};
		supabaseAuth();
	}, []);

	return (

		//different context providers for country and users instead of a single value object for performance reasons
		// value={country,data} would create a new copy of the object on each mount causing rerenders even when values of country and data dont change
		<UserCountryContext.Provider value={country}>
			<UserContext.Provider value={ user }>{children}</UserContext.Provider> 
		</UserCountryContext.Provider>
	);
};

import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { Analytics } from '@vercel/analytics/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

import '../styles/globals.css';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import { UserContextProvider } from '../context/authContext';
import { ScreensContextProvider } from '../context/screensContex';

import Header from '../components/Header';

import { Session } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';

export default function App({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		router.events.on('hashChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
			router.events.off('hashChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	//This runs the hotjar script
	useEffect(() => {
		hotjar.initialize(3322744, 6, false);
	}, []);

	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<UserContextProvider>
				<ScreensContextProvider>
					{/* script to embed Google Ads */}
					<Script
						data-ad-client='ca-pub-5952673528545779'
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
					></Script>
					{/* script to embed Google tags */}
					<Script
						strategy='afterInteractive'
						src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
					/>
					{/* script to embed Google analytics */}
					<Script id='google-analytics' strategy='afterInteractive'>
						{`
				  window.dataLayer = window.dataLayer || [];
				  function gtag(){dataLayer.push(arguments);}
				  gtag('js', new Date());
				
				  gtag('config', '${gtag.GA_TRACKING_ID}');
					`}
					</Script>
					{/* script to embed Segment */}
					<Script id='segment' strategy='afterInteractive'>
						{`  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="CzMF6ZIUJcE8l8lgVpjsbJv1gT5jVvBo";;analytics.SNIPPET_VERSION="4.15.3";
		analytics.load("CzMF6ZIUJcE8l8lgVpjsbJv1gT5jVvBo");
		analytics.page();
		}}();`}
					</Script>

					<Header />
					<Component {...pageProps} />

					<Analytics />
				</ScreensContextProvider>
			</UserContextProvider>
		</SessionContextProvider>
	);
}

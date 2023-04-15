// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	runtimeCaching,
});

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'firebasestorage.googleapis.com',
			'lh3.googleusercontent.com',
			'epcjufipobybxdmcqjgb.supabase.co',
			'pub-4271c874f759418fbdcd18b0e5cbe024.r2.dev',
		],
	},
};

// Before defining your Security Headers
// add Content Security Policy directives using a template string.

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';  
`;

// You can choose which headers to add to the list
// after learning more below.
const securityHeaders = [
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'Content-Security-Policy',
		value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
	},
];

module.exports = {
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: '/:path*',
				headers: securityHeaders,
			},
		];
	},
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));

module.exports = withSentryConfig(
	module.exports,
	{ silent: true },
	{ hideSourcemaps: true }
);

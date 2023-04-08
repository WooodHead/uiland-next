import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

//This places the modal outside the DOM
class MainDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: [initialProps.styles, sheet.getStyleElement()],
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang='en'>
							<Head>
					<link rel='manifest' href='/manifest.json' />
					<link rel='apple-touch-icon' href='/icon.png'></link>
					<meta name='theme-color' content='#fff' />
				</Head>
				<body>
					<Main />
					<NextScript />
					{/*Below we add the modal wrapper*/}
					<div id='portal'></div>
				</body>
			</Html>
		);
	}
}

export default MainDocument;

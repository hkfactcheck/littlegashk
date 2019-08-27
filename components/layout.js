import Head from 'next/head';
import CustomAppBar from './app-bar';

const Layout = ({ children }) => {
	return (
		<div>
			<Head>
				<title>Little Gas</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="stylesheet" href="/static/normalize.css" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			</Head>
			<CustomAppBar />
			<div style={{position:'relative', top: '56px', minHeight: 'calc(100vh)'}}>{children}</div>
			
		</div>
	)
}
		
export default Layout
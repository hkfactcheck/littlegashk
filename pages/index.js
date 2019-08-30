import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout';
import List from '../components/list';

const Home = ({ data = [] }) => {
	return (
		<Layout>
			<List data={data} header={'Recently Update'} apiPath={'topics?page='} />
		</Layout>
	);
}

Home.getInitialProps = async () => {
	const res = await fetch(process.env.API + 'topics?page=0')
	try {
		const json = await res.json()
		console.log(json);
		return { data: json }
	} catch (e) {
		return { data: null }
	}
}

export default Home;

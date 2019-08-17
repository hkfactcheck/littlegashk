import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout';
import List from '../../components/list';

const Tag = ({ data = [], tagName }) => {
	console.log('data : ', data);
	return (
		<Layout>
			<h2> Tag : {tagName}</h2>
			<List data={data} />
		</Layout>
	);
}

Tag.getInitialProps = async ({ req, query }) => {
	const res = await fetch(`${process.env.API}tags/${query.tagName}/topics`)
	try {
		const json = await res.json()
		console.log(json);
		return { data: json, tagName:`${query.tagName}` }
	} catch (e) {
		return { data: null }
	}
}

export default Tag;
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout';
import List from '../../components/list';

const Tag = ({ data = [], tagName }) => {
	console.log('data : ', data);
	return (
		<Layout>
			<List data={data} header={'#' + tagName + '(' + data.totalElements + ')'} />
		</Layout>
	);
}

Tag.getInitialProps = async ({ req, query }) => {
	const url= `${process.env.API}tags/${query.tagName}/topics`;
	const res = await fetch(encodeURI(url));
	try {
		const json = await res.json()
		console.log(json);
		return { data: json, tagName:`${query.tagName}` }
	} catch (e) {
		return { data: null }
	}
}

export default Tag;
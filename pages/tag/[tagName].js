import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout';
import List from '../../components/list';

const Tag = ({ data = [], tagName }) => {
	// console.log('data1 : ', data);
	return (
		<Layout>
			<List data={data} header={'#' + tagName + '(' + data.content.length + ')'} />
		</Layout>
	);
}

Tag.filterTopic = (data) => {
	var output = [];

	data.content.forEach(element => {
		if (element.type == "TOPIC") {
			output.push(element);
		} 
	});
	data.content = output;
	return data;
}

Tag.getInitialProps = async ({ req, query }) => {
	const url= `${process.env.API}tags/${query.tagName}/topics`;
	const res = await fetch(encodeURI(url));
	try {
		const json = await res.json()
		var result = Tag.filterTopic(json);
		return { data: result, tagName:`${query.tagName}` }
	} catch (e) {
		return { data: [] }
	}
}

export default Tag;
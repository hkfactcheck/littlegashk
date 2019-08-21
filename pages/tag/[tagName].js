import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout';
import List from '../../components/list';

const Tag = ({ data = [], tagName }) => {
	// console.log('data1 : ', data);
	Tag.filterTopic(data);

	return (
		<Layout>
			<List data={data} header={'#' + tagName + '(' + data.content.length + ')'} />
		</Layout>
	);
}

Tag.filterTopic = (data) => {
	data.content.forEach(element => {
		if (element.type == "TOPIC") {
			
		} else {
			data.content.splice(data.content.indexOf(element), 1 );
		}
	});
	console.log('data2 : ', data);
}

Tag.getInitialProps = async ({ req, query }) => {
	const url= `${process.env.API}tags/${query.tagName}/topics`;
	const res = await fetch(encodeURI(url));
	try {
		const json = await res.json()
		console.log('json.content :', json.content);
		return { data: json, tagName:`${query.tagName}` }
	} catch (e) {
		return { data: [] }
	}
}

export default Tag;
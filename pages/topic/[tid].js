
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import get from 'lodash.get';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Tabs from '../../components/tabs';
import checkNull from '../../utils/checkNull';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '../../src/link';

import { Summary, Progress, Response, Related } from '../../components';

const useStyles = makeStyles(theme => ({
	chip: {
		marginRight: 5
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	}
}));

const Topic = ({ data = {} }) => {
	const classes = useStyles();
	const tags = checkNull(get(data, 'tags', []), []);
	const references = checkNull(get(data, 'references', []), []);

	return (
		<Layout>
			<Container maxWidth="md">
				<h2>{data.title || ''}</h2>
				{tags.map(t => 
					<Link href={`/tag/${t}`}>
						<Chip size='small' label={t} className={classes.chip} />
					</Link>
				)}
				<p>{data.eventDate || ''}</p>
				<CardMedia
					className={classes.media}
					image="/static/images/news_mockup.png"
					title={data.title || ''}
				/>
				<div style={{ marginTop: 15 }} />
				<Tabs
					tab0={<Summary content={references} />}
					tab1={<Progress topicId={data.topicId} />}
					tab2={<Response topicId={data.topicId} />}
					tab3={
						<Related
							files={get(data, 'relatedFiles', [])}
							topics={get(data, 'relatedTopics', [])}
						/>
					} 					
				/>
			</Container>
		</Layout>
	);
}

Topic.getInitialProps = async ({ req, query }) => {
	const res = await fetch(`${process.env.API}topics/${query.tid}`)
	try {
		const json = await res.json()
		console.log(json);
		return { data: json }
	} catch (e) {
		return { data: null }
	}
}

export default Topic;

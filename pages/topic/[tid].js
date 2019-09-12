
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
import SpeedDialTooltipOpen from '../../components/float-btn'

import { Summary, Progress, Response, Related } from '../../components';

const useStyles = makeStyles(theme => ({
	chip: {
		marginLeft: 5,
		color: '#d9d9d9',
		background: 'none',
		display: 'inline-block',
		fontSize: '16px',
	},
	chipLink: {
		'& :hover': {
			backgroundColor: '#767D92',
			textDecoration: 'none',
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		backgroundSize: 'contain',
	},
	title: {
		color: '#ffffff',
		fontSize: '24px',
		fontWeight: 'bold',
	}
}));

const Topic = ({ data = {} }) => {
	const classes = useStyles();
	const tags = checkNull(get(data, 'tags', []), []);
	const references = checkNull(get(data, 'references', []), []);
	const relateds = checkNull(get(data, 'relatedTopics', []), []);
	const image = data.imageUrl? data.imageUrl : (references? references[0].imageUrl : null);

	return (
		<Layout>
			<Container maxWidth="md" style={{paddingBottom:'20px'}}>
				<h2 className={classes.title}>{data.title || ''}</h2>
				{tags.map(t => 
					<Link href={`/tag/${t}`} className={classes.chipLink}>
						<div className={classes.chip}>{'#' + t}</div>
					</Link>
				)}
				<p style={{ color: '#fff' }}>{data.eventDate || ''}</p>
				<CardMedia
					className={classes.media}
					image={image != "None" ? image:"/static/images/default.png"}
					title={data.title || ''}
				/>
				<div style={{ marginTop: 15 }} />
				<Tabs
					tab0={<Summary content={references} />}
					tab1={<Progress topicId={data.topicId} />}
					tab2={<Response topicId={data.topicId} />}
					tab3={<Related topics={relateds} />} 					
				/>
				<SpeedDialTooltipOpen topicId= {data.topicId}/>
			</Container>
		</Layout>
	);
}

Topic.getInitialProps = async ({ req, query }) => {
	const res = await fetch(`${process.env.API}topics/${query.tid}`)
	const topicId = query.tid;

	try {
		const json = await res.json()
		// console.log(json);
		return { data: json, topicId: topicId}
	} catch (e) {
		return { data: null }
	}
}

export default Topic;

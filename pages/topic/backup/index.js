import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../../components/layout';
import get from 'lodash.get';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Tabs from '../../../components/tabs';
import checkNull from '../../../utils/checkNull';

import { Summary, Progress, Related, References } from '../../../components';

const useStyles = makeStyles(theme => ({
	chip: {
		marginRight: 5
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
				{tags.map(t => <Chip size='small' label={t} className={classes.chip} />)}
				<p>{data.eventDate || ''}</p>
				<div style={{ marginTop: 15 }} />
				<References data={references} />
				<Tabs
					tab0={<Summary content={data.summary} />}
					tab1={<Progress />}
					tab2={
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

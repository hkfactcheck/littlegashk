import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import get from 'lodash.get';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Tabs from '../../components/tabs';

const useStyles = makeStyles(theme => ({
	chip: {
		marginRight: 5
	}
}));

const Topic = ({ data = {} }) => {
	const classes = useStyles();

	return (
		<Layout>
			<Container maxWidth="md">
				<h2>{data.title || ''}</h2>
				{
					get(data, 'tags', []).map(i => (
						<Chip size='small' label={i} className={classes.chip} />
					))
				}
				<p>{data.summary || ''}</p>
				<p>{data.eventDateTime || ''}</p>
				{
					get(data, 'relatedFiles', []) && get(data, 'relatedFiles', []).map(i => (
						<p>{i}</p>
					))
				}
				{
					get(data, 'references', []) && get(data, 'references', []).map(i => (
						<p>{i}</p>
					))
				}
				<div style={{ marginTop: 15 }} />
				<Tabs />
			</Container>
		</Layout>
	);
}

Topic.getInitialProps = async ({ req, query }) => {
	const res = await fetch(`http://3.130.98.8/topics/${query.tid}`)
	try {
		const json = await res.json()
		console.log(json);
		return { data: json }
	} catch (e) {
		return { data: null }
	}
}

export default Topic;

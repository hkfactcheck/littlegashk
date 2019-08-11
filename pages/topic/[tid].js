import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import get from 'lodash.get';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Tabs from '../../components/tabs';
import checkNull from '../../utils/checkNull';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	chip: {
		marginRight: 5
	}
}));

const Summary = ({ content }) => (
	<div>
		<p>{content}</p>
	</div>
)

const Progress = () => (
	<div></div>
)

const Related = ({ files = [], topics = [] }) => (
	<div>
		<div>
			{
				checkNull(files, []).map(f => f)
			}
		</div>
		<div>
			{
				checkNull(topics, []).map(f => f)
			}
		</div>
	</div>
)

const Topic = ({ data = {} }) => {
	const classes = useStyles();
	console.log(data);
	return (
		<Layout>
			<Container maxWidth="md">
				<h2>{data.title || ''}</h2>
				{
					checkNull(get(data, 'tags', []), []).map(i => (
						<Chip size='small' label={i} className={classes.chip} />
					))
				}
				<p>{data.eventDate || ''}</p>
				<div style={{ marginTop: 15 }} />
				<div style={{ paddingBottom: 10 }}>
					{
						checkNull(get(data, 'references', []), []).map((ref, i) => (
							<a href={ref}>
								<Button variant="outlined" className={classes.button}>
									來源{i + 1}
								</Button>
							</a>
						))
					}
				</div>
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

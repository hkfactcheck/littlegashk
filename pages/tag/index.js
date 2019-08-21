import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
	root:{
		margin: '10px',
	},
	pageTitle: {
		fontSize: '16px',
		color: '#d9d9d9',
		padding: '10px 16px',
		fontWeight: 'bold',
	},
	tag:{
		color: 'white',
	},
	chip: {
		marginLeft: 5,
		color: '#d9d9d9',
		background: 'none',
		display: 'inline-block',
		fontSize: '16px',
		margin: '5px',
	},
	chipLink: {
		'& :hover': {
			backgroundColor: '#767D92',
			textDecoration: 'none',
		},
	},
  }));

const TagHome = ({ data = [] }) => {
	const classes = useStyles();
	return (
		<Layout>
			<div className={classes.pageTitle}>All Tags ({data.length})</div>
			<div className={classes.root}>
			{	
					data.map(t => 
						<Link href={`/tag/${t}`} >
							<a className={classes.chipLink}>
								<div className={classes.chip}>{'#' + t}</div>
							</a>
						</Link>
					)
			}
			</div>
		</Layout>
	);
}

TagHome.getInitialProps = async () => {
	const res = await fetch(process.env.API + 'tags')
	try {
		const json = await res.json()
		console.log(json);
		return { data: json }
	} catch (e) {
		return { data: null }
	}
}

export default TagHome;

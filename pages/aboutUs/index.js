import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	card: {
		// maxWidth: 345,
		borderRadius: 0,
		margin: '20px',
		backgroundColor: '#f9f9f9',
		'& a': {
			color: '#3d8af7',
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	// avatar: {
	// 	backgroundColor: red[500],
	// },
}));

const AboutHome = () => {
	const classes = useStyles();

	return (
		<Layout>
			<Card className={classes.card}>
				<CardHeader
					// title={data.title}
					subheader="Hello World"
				/>
				{/* <CardActions disableSpacing>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions> */}
				{/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
					<CardContent>
						<Typography paragraph>
							Hello All
						</Typography>
					</CardContent>
				{/* </Collapse> */}		
			</Card>
		</Layout>
	);
}

// AboutHome.getInitialProps = async () => {
	
// }

export default AboutHome;

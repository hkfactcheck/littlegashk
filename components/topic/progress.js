import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash.get';
import checkNull from '../../utils/checkNull';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import color from '@material-ui/core/colors/orange';

const useStyles = theme => ({
	card: {
		// maxWidth: 345,
		borderRadius: 0,
		marginBottom: '20px',
		backgroundColor: '#f9f9f9',
		'& a': {
			color: '#3d8af7',
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	
});

class Progress extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			progresses : [],
			hasNext : false,
		};
		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
		if (this.state.progresses) {
			this.getData();
		}
	}

	getData() {
		const {progresses} = this.state;
		fetch(`${process.env.API}` + 'topics/' + this.props.topicId + '/progress')
		.then(response => response.json())
		.then(data => {
			// let progresses = data.content;

			this.setState({progresses : progresses.concat(data.content)});
			console.log('progress : ', progresses);
		})
	}

	render() {
		const {progresses} = this.state;
		const { classes } = this.props;

		return (
			<div>
				{
					progresses.map(item => (
						<Card className={classes.card}>
							<CardHeader
								title={item.title}
								subheader={item.eventDate}
							/>
							{
								item.references.map(ref => (
									<CardContent>
										{
											ref.imageUrl?
												<CardMedia
													className={classes.media}
													image={ref.imageUrl}
													title="Paella dish"
												/>:''	
										}										
										<Typography paragraph>
											{ref.comment}
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											Source : <br/>
											<a href={ref.link} title={ref.title}>{ref.name} - {ref.title}</a>
										</Typography>
									</CardContent>
								))
							}							
						</Card>					
					))
				}
				{/* {
					progresses.length <= 0?
					(
					<Card className={classes.card}>
						<CardHeader
							subheader='No Progress yet'
						/>
					</Card>):''
				} */}
				
			</div>
			
		)
	}
	
}

Progress.propTypes = {
	classes: PropTypes.object.isRequired,
  };


export default withStyles(useStyles)(Progress);
import React from 'react';
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '../../src/link';
import get from 'lodash.get';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = theme => ({
	root: {
		width: '100%',
		maxWidth: '100%',
		backgroundColor: theme.palette.background.default,
	},
	dateRows: {
		borderTop: '2px solid #FFFFFF',
		textDecoration: 'none',
		position: 'relative',
		borderLeft: '8px dotted #ffffff',
		'& :hover': {
			backgroundColor: '#767D92',
			textDecoration: 'none',
		},
	},
	dateText: {
		color: '#FFFFFF',
		fontSize: '18px',
		padding: '4px 10px',
		fontWeight: 'bold',
	},
	dot: {
		width: '16px',
		height: '16px',
		borderRadius: '50%',
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		left: '-12px',
		top: '-8px',
	},
	wrap: {
		margin: 'auto',
		width: '90%',
    	maxWidth: '1000px',
	},
	listItem:{
		padding: '0 10px',
	},
	titleRow: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontSize: '18px',
		fontWeight: 'bold',
		lineHeight: 1.4,
		color: '#ffffff',
	},
	chip: {
		marginLeft: 5,
		color: '#d9d9d9',
		background: 'none',
		display: 'inline',
		fontSize: '14px',
	},
	pageTitle: {
		fontSize: '16px',
		color: '#d9d9d9',
		padding: '10px 16px',
		fontWeight: 'bold',
	},
	style1: {
		
	  }
});

class TimelineList extends React.Component {
	
	constructor(props){
		super(props); //({ data = [], header = 'Timeline' }) 
	
		// Sets up our initial state
		this.state = {
			lastItemDate: this.props.lastItemDate,
			loadingState: true,
			topics: this.props.data,
		  };
		  this.formatDate = this.formatDate.bind(this);
		  this.loadMoreItems = this.loadMoreItems.bind(this);
	}

	componentDidMount() {
		const {loadingState} = this.state;
		this.refs.iScroll.addEventListener("scroll", () => {
			console.log('load more scrollTop', this.refs.iScroll.scrollTop);
			if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=this.refs.iScroll.scrollHeight){
			  this.loadMoreItems();
			}
		  });
		if (loadingState) {
			console.log('loadingState scrollTop', this.refs.iScroll.scrollTop);
			console.log('loadingState clientHeight', this.refs.iScroll.clientHeight);
			console.log('loadingState window.innerHeight', window.innerHeight);
			if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight <= window.innerHeight){
				this.loadMoreItems();
			}
		}
	}

	// format Date to 'YYYY-MM-DD'
	formatDate(date) {
		var d = date,
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}
	 
	loadMoreItems() {
		const {loadingState, lastItemDate} = this.state;

		// this.setState({ loadingState: true });
		if (loadingState) {
			var tempDate = new Date(lastItemDate);
			tempDate.setDate(tempDate.getDate() - 1);
			const dateString = this.formatDate(tempDate);

			fetch(`${process.env.API}` + 'topics/date/' + dateString)
			.then(response => response.json())
			.then(data => {
				let topic = this.state.topics;
				const obj = {};
				obj.date = dateString;
				obj.content = data.content;
				topic.push(obj);

				this.setState({topic : topic, lastItemDate: dateString, loadingState : false});

				// if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= window.innerHeight){
				// 	this.setState({loadingState : false});
				// }
			})
		}
		
	}

	render() 
	{
		const { classes, header, data } = this.props;
		// console.log('window.innerHeight ',window.innerHeight);

		return (
		
		<div className={classes.root} ref="iScroll" >
			<div className={classes.pageTitle}>{header}</div>
			<div className={classes.wrap}>
			{
				data.map(item => (
					<div key={item.date} className={classes.dateRows}>
						<div className={classes.dot}></div>
						<div className={classes.dateText}>{item.date}</div>
						{
							item.content?
							(
								item.content.map( element =>(
									<Link key={element.topicId} href={`/topic/${element.topicId}`}>
										<ListItem className={classes.listItem}>
											<ListItemText
												primary={
													<div className={classes.titleRow}>
														<div>{element.title}</div>
													</div>
												}
											/>
										</ListItem>
									</Link>
								))
							):'no content'
						}
					</div>
				))
			}
			<div style={{ height: "auto", overflow: "auto" }}>
				
				{/* <div onClick={this.loadMoreItems()}></div> */}
				{this.state.loadingState ? <div onClick={this.loadMoreItems()}> loading More Items..</div> : ""}
			</div>
			</div>
		</div>
	)}
};

TimelineList.propTypes = {
	classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(TimelineList);
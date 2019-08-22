import React from 'react';
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '../../src/link';
import get from 'lodash.get';

const useStyles = makeStyles(theme => ({
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
}));

const TimelineList = ({ data = [], header = 'Timeline' }) => {
	const classes = useStyles();
	// console.log('data ', data);
	TimelineList.loadMore();

	return (
		
		<List className={classes.root}>
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
			</div>
		</List>
	)
};

TimelineList.loadMore = () => {
	// fetch(`${process.env.API}` + 'topics/date/2019-07-21')
	// 	.then(response => response.json())
	// 	.then(data => {
	// 		let progresses = data.content;

	// 		console.log('progress : ', progresses);
	// 	})
}

export default TimelineList;
import React from 'react';
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, Divider, ListItemText } from '@material-ui/core';
import Link from '../../src/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import get from 'lodash.get';

const useStyles = theme => ({
	root: {
		width: '100%',
		maxWidth: '100%',
		backgroundColor: theme.palette.background.default,
	},
	row: {
		borderBottom: '1px solid #767d92',
		textDecoration: 'none',
		'& :hover': {
			backgroundColor: '#767D92',
			textDecoration: 'none',
		},
	},
	inline: {
		display: 'inline',
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
	avatar: {
		width: '100px',
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		flexShrink: 0,
		justifyContent: 'center',
		marginRight: '10px',
	},
	avatarImg: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		textAlign: 'center',
	},
	loading: {
		fontSize: '16px',
		margin: 'auto',
		padding: '10px',
		borderRadius: '5px',
		backgroundColor: '#506680',
		color: '#ffffff',
		width: '200px',
		textAlign: 'center',
	},
	btnF5:{
		textAlign: 'center',
		background: '#FFFFFF',
		width: '70px',
		margin: '10px auto',
		fontSize: '16px',
		padding: '8px',
		cursor: 'pointer',
	}
});

class NewsList extends React.Component {
	
	constructor(props){
		super(props);
	
		// Sets up our initial state
		this.state = {
			hasNext: true,
			nextPage: 1,
			topics: [...this.props.data.content],
		  };
		  console.log('topics : this.props.data.content : ', this.state.topics);
	}

	loadMoreItems() {
		const {nextPage, hasNext, topics} = this.state;

		fetch(`${process.env.API}` + 'topics?page=' + nextPage)
			.then(response => response.json())
			.then(data => {
				let list = data.content;
				var next = data.last? false:true;
	
				this.setState({topics: topics.concat(list), nextPage: (nextPage+1), hasNext: next});
				console.log('page ', nextPage ,' list : ', topics);
			})
	}

	render() {
		const {classes} = this.props;
		const {hasNext, topics} = this.state;
		console.log('data ', topics);
		
		return (
			<List className={classes.root}>
				<div className={classes.pageTitle}>Recently Update</div>
				<div id="scrollableDiv" style={{ height: 'calc(100vh - 160px)', overflow: "auto"}}>
					<InfiniteScroll
						style={ {padding: '20px'} }
						dataLength={this.state.topics.length}
						next={this.loadMoreItems.bind(this)}
						hasMore={hasNext}
						loader={''}
						scrollableTarget="scrollableDiv"
					>
				{
					topics.map(item => (
						<div key={item.topicId} className={classes.row}>
							<Link href={`/topic/${item.topicId}`}>
								<ListItem alignItems="center">
									<div className={classes.avatar}>
										{
											item.references[0].imageUrl ?
											<img className={classes.avatarImg} src={item.references[0].imageUrl} />
											:
											<img className={classes.avatarImg} src="/static/images/default.png" />
										}
									</div>
									<ListItemText
										primary={
											<div className={classes.titleRow}>
												<div>{item.title}</div>
											</div>
										}
										secondary={
											<div>
												<div style={{ marginTop: 10, marginLeft: -5 }}>
												{
													get(item, 'tags', []).map(i =>
														<div key={i} className={classes.chip}>{'#' + i}</div>
													)
												}
												</div>
											</div>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
							</Link>
						</div>
					))
				}
				{
					hasNext?
					<div className={classes.btnF5} onClick={this.loadMoreItems.bind(this)}>F5</div>
					:<div className={classes.btnF5}>- 完 -</div>
				}
				</InfiniteScroll>
				</div>
			</List>
		)}
};

NewsList.propTypes = {
	classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(NewsList);
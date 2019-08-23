import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Link from '../../src/link';

import get from 'lodash.get';

const useStyles = makeStyles(theme => ({
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
	}
}));

const NewsList = ({ data = [], header = 'Recently Update !' }) => {
	const classes = useStyles();
	console.log('data ', data);
	return (
		
		<List className={classes.root}>
			<div className={classes.pageTitle}>{header}</div>
			{
				data.content.map(item => (
					<div key={item.topicId} className={classes.row}>
						<Link href={`/topic/${item.topicId}`}>
							<ListItem alignItems="center">
								{/* <ListItemAvatar>
									<Avatar alt="Remy Sharp" src="/static/images/default.png" />
								</ListItemAvatar> */}
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
											<Typography
												component="span"
												variant="body2"
												className={classes.inline}
												color="textPrimary"
											>
												{item.summary}
											</Typography>
											<div style={{ marginTop: 10, marginLeft: -5 }}>
											{
												get(item, 'tags', []).map(i =>
													<div className={classes.chip}>{'#' + i}</div>
												)
											}
											</div>
											{/* {` - `}{get(item, 'references', []).map(i => i)} */}
										</div>
									}
								/>
							</ListItem>
							<Divider variant="inset" component="li" />
						</Link>
					</div>
				))
			}
		</List>
	)
};

export default NewsList;
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
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
	titleRow: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	chip: {
		marginLeft: 5
	}
}));

const NewsList = ({ data = [] }) => {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			{
				data.map(item => (
					<div key={item.topicId}>
						<Link href={`/topic/${item.topicId}`}>
							<ListItem alignItems="center">
								<ListItemAvatar>
									<Avatar alt="Remy Sharp" src="/static/images/news_mockup.png" />
								</ListItemAvatar>
								<ListItemText
									primary={
										<div className={classes.titleRow}>
											<div>{item.title}</div>
											<div>
												{
													get(item, 'tags', []).map(i =>
														<Chip size='small' label={i} className={classes.chip} />
													)
												}
											</div>
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
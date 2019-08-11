import { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'next/router';

import Drawer from './drawer';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: '#607d8b',
		color: 'white'
	}
}));


const CustomAppBar = () => {
	const classes = useStyles();
	const [drawer, setDrawer] = useState(false);

	return (
		<div className={classes.root}>
			<Drawer open={drawer} toggleDrawer={setDrawer} />
			<AppBar position="static" color='inherit' className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						{/* Wait for after sorting function ready */}
						{/* onClick={() => setDrawer(true)} */}
						<Link href='/'>
							<MenuIcon />
						</Link>
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Little Gas Book 小器簿
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default CustomAppBar;
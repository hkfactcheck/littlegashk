import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';

const menuList = [
	{
		name: 'Recent',
		link: '/'
	},
	{
		name: 'Timeline',
		link: '/timeline'
	},
	{
		name: 'By Tag',
		link: '/tag'
	},
	{
		name: 'About Us',
		link: '/aboutUs'
	}
];

const useStyles = makeStyles({
	list: {
	  width: 250,
	},
	foot:{
		width: '100%',
	}
});

const DrawerList = ({ toggleDrawer }) => (
	<div
		className={useStyles().list}
		role="presentation"
		onClick={() => toggleDrawer(false)}
		onKeyDown={() => toggleDrawer(false)}
	>
		<List>
			{
				menuList.map((item, index) => (
					<Link href={item.link}>
						{/* next link must wrap with <a> tag */}
						<a style={{ color: 'black', textDecoration: 'none' }}>
							<ListItem button key={item.name}>
								<ListItemText primary={item.name} />
							</ListItem>
							{/* <Divider/> */}
						</a>
					</Link>
					
				))
			}
		</List>
		
		<div className={useStyles().foot}>
		<Divider/> 
			<Link href='https://t.me/joinchat/MmqsdxQcR6lrp_4Jw9uMqw'>
				<a target='_blank' style={{ color: 'black', textDecoration: 'none' }}>
					<ListItem button key='聯絡我們'>
						<ListItemText primary='聯絡我們' />
					</ListItem>
				</a>
			</Link>
			<Link href='https://t.me/littlegashk_tg_bot'>
				<a target='_blank' style={{ color: 'black', textDecoration: 'none' }}>
					<ListItem button key='回報'>
						<ListItemText primary='回報' />
					</ListItem>
				</a>
			</Link>
		</div>
	</div>
);

const CustomDrawer = ({ open, toggleDrawer }) => (
	<Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)} >
		<DrawerList toggleDrawer={toggleDrawer} />
	</Drawer>
)

export default CustomDrawer;
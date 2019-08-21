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
	}
];

const DrawerList = ({ toggleDrawer }) => (
	<div
		role="presentation"
		onClick={() => toggleDrawer(false)}
		onKeyDown={() => toggleDrawer(false)}
	>
		<List>
			{
				menuList.map((item, index) => (
					<Link href={item.link}>
						{/* next link must wrap with <a> tag */}
						<a style={{ color: 'black' }}>
							<ListItem button key={item.name}>
								<ListItemText primary={item.name} />
							</ListItem>
						</a>
					</Link>
					
				))
			}
		</List>
	</div>
);

const CustomDrawer = ({ open, toggleDrawer }) => (
	<Drawer open={open} onClose={() => toggleDrawer(false)}>
		<DrawerList toggleDrawer={toggleDrawer} />
	</Drawer>
)

export default CustomDrawer;
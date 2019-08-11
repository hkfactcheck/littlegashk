import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerList = ({ toggleDrawer }) => (
	<div
		role="presentation"
		onClick={() => toggleDrawer(false)}
		onKeyDown={() => toggleDrawer(false)}
	>
		<List>
			{['Recent', 'By Date', 'By Tag'].map((text, index) => (
				<ListItem button key={text}>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</List>
	</div>
);

const CustomDrawer = ({ open, toggleDrawer }) => (
	<Drawer open={open} onClose={() => toggleDrawer(false)}>
		<DrawerList toggleDrawer={toggleDrawer} />
	</Drawer>
)

export default CustomDrawer;
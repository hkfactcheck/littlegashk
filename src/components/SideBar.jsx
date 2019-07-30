import React from 'react';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import SideBarHead from './SideBarHead';
import SideBarBody from './SideBarBody';
import { toggleDrawer } from '../actions';
import theme from '../theme';

const drawerWidth = 240;
const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

const SideBar = (props) => {
  const {
    container, toggleDrawer, mobileOpen, classes,
  } = props;

  const drawer = () => (
    <div>
      <SideBarHead />
      <Divider />
      <SideBarBody />
    </div>
  );
  return (
    <nav className={classes.drawer} aria-label="Label">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={toggleDrawer}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer()}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer()}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const mapStateToProps = state => ({
  mobileOpen: state.mobileOpen,
});
export default connect(mapStateToProps, { toggleDrawer })(withStyles(styles(theme))(SideBar));

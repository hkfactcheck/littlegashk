import React from 'react';
import { AppBar, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { toggleDrawer } from '../actions';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({

  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));


const HeaderBar = (props) => {
  const classes = useStyles();
  const { toggleDrawer: drawerToggleFn } = props;
  const {
    user, shortTitle,
  } = props;
  let userActions;
  if (user) {
    userActions = (
      <>
        <Button variant="outlined" color="secondary" onClick={() => Auth.signOut()}>登出</Button>
      </>
    );
  } else {
    userActions = (
      <>
        <Button variant="outlined" color="secondary" onClick={() => Auth.federatedSignIn()}>Admin 登入</Button>
      </>
    );
  }
  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Grid
          justify="space-between"
          alignItems="center"
          container
        >
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="open"
              edge="start"
              onClick={drawerToggleFn}
              className={classes.menuButton}
            >
              <MenuIcon />

            </IconButton>
          </Grid>
          <Grid item xs>
            {shortTitle}
          </Grid>
          <Grid item>
            {userActions}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  shortTitle: state.shortTitle,
});

export default connect(mapStateToProps, { toggleDrawer })(HeaderBar);

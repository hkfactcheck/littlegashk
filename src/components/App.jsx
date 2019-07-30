import React from 'react';
import './App.css';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { CssBaseline } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { connect } from 'react-redux';
import HeaderBar from './AppBar';
import SideBar from './SideBar';
import awsconfig from '../aws-exports';
import theme from '../theme';
import Routes from './Routes';
import { setUser } from '../actions';

Amplify.configure(awsconfig);
const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    minWidth: 0,
  },
});


class App extends React.Component {
  componentDidMount() {
    const { setUser } = this.props;
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          break;
        case 'signOut':
          setUser(null);
          break;
        default:
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(() => {});
  }


  render() {
    const { classes } = this.props;
    return (
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <div className={classes.root}>

              <HeaderBar />
              <SideBar />

              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routes />
              </main>
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </Router>
    );
  }
}

export default connect(null, { setUser })(withStyles(styles(theme))(App));

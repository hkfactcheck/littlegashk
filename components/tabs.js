import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from './card';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	tabDiv: {
		padding: 0,
	},
	appBar: {
		backgroundColor: '#767d92',
	}
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
	const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
			className={classes.tabDiv}
    >
      {children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function SimpleTabs(props) {
  const {tab0, tab1, tab2, tab3} =props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="資料來源" />
          <Tab label="事件跟進" />
          <Tab label="網友回應" />
          <Tab label="相關事件" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {tab0}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tab1}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {tab2}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {tab3}
      </TabPanel>
    </div>
  );
}
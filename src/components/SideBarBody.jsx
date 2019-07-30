import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { OpenInNew } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import theme from '../theme';
import {
  closeMenu, districtReceived, toggleTextOnly,
} from '../actions';
import { host } from '../api';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },

});

const SideBarBody = (props) => {
  const {
    classes, closeMenu, tree, textOnly, toggleTextOnly, districtReceived,
  } = props;
  const [menuStatus, setMenuStatus] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (Object.keys(tree).length === 0) {
      setLoading(true);
      axios.get(`${host}/districts`)
        .then(({ data }) => {
          districtReceived(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tree, districtReceived]);
  const toggleMenu = (key) => {
    const toClose = {};
    Object.keys(menuStatus).filter(other => key.indexOf(other) !== 0).forEach((other) => {
      toClose[other] = false;
    });
    setMenuStatus(Object.assign({}, menuStatus, { [key]: !menuStatus[key] }, toClose));
  };


  return (

    <List className={classes.root} subheader={<li />}>
      <li className={classes.nested}>

        <FormControlLabel
          control={(
            <Switch
              checked={textOnly}
              onChange={() => toggleTextOnly()}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            )}
          label="純文字"
          labelPlacement="end"
        />
      </li>
      {loading
      && (
      <li className={classes.nested}>
        <BeatLoader
          color={theme.palette.secondary.main}
          sizeUnit="px"
          size={15}
          loading={loading}
        />
      </li>
      )
      }
      {Object.keys(tree).map(area => (
        <li key={`div-${area}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{area}</ListSubheader>

            {Object.keys(tree[area]).map(district => (
              <div key={`div-${area}-${district}`}>
                <ListItem
                  button
                  key={`${area}|${district}`}

                  selected={menuStatus[`${area}|${district}`]}
                  onClick={() => toggleMenu(`${area}|${district}`)}
                >
                  <ListItemText primary={district} />

                  <Link to={`/district/${area}-${district}`} onClick={closeMenu}>
                    <IconButton tooltip="Open">
                      <OpenInNew />
                    </IconButton>
                  </Link>

                </ListItem>
                <Collapse in={menuStatus[`${area}|${district}`]} timeout="auto" unmountOnExit>

                  <Grid container spacing={0} className={classes.nested}>
                    {Object.keys(tree[area][district]).map(constituency => (
                      <Grid item xs={6} key={`grid-${area}-${district}-${constituency}`}>
                        <Link
                          to={`/district/${area}-${district}-${constituency}`}
                          style={{ textDecoration: 'none', align: 'middle' }}
                          onClick={closeMenu}
                        >

                          <Button fullWidth style={{ justifyContent: 'left' }}>
                            {constituency}
                          </Button>
                        </Link>

                      </Grid>
                    ))}
                  </Grid>

                </Collapse>
              </div>
            ))}
          </ul>
        </li>
      ))}

    </List>
  );
};


SideBarBody.propTypes = {
  tree: PropTypes.objectOf(PropTypes.object),
  closeMenu: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  textOnly: PropTypes.bool.isRequired,
  toggleTextOnly: PropTypes.func.isRequired,
  districtReceived: PropTypes.func.isRequired,
};

SideBarBody.defaultProps = {
  tree: {},
};

const mapStateToProps = state => ({
  tree: state.district,
  textOnly: state.textOnly,
});
export default connect(mapStateToProps, { closeMenu, toggleTextOnly, districtReceived })(withStyles(styles(theme))(SideBarBody));

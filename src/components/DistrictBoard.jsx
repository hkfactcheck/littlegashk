import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import SimpleLink from '@material-ui/core/Link';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Icon from '@mdi/react';
import { mdiFacebookBox } from '@mdi/js';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { grey, red } from '@material-ui/core/colors';
import { VisibilityOff } from '@material-ui/icons';
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import theme from '../theme';
import { avatarProducer } from './AvatarProducer';
import AddPerson from './AddPerson';
import { host, header } from '../api';
import FactionChip from './FactionChip';
import { setShortTitle } from '../actions';


const styles = theme => ({
  card: {
    display: 'block',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'cover',
    backgroundColor: theme.palette.grey[100],
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  alert: {
    backgroundColor: red[800],
    color: grey[50],
  },
  root: {
    padding: theme.spacing(1),
  },
  secondaryBar: {
    zIndex: 0,
  },
});

const PersonLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));


const DistrictBoard = (props) => {
  const [loading, setLoading] = useState(false);
  const {
    match: { params: { district } }, classes, refreshAt, user, setShortTitle, textOnly,
  } = props;
  const [persons, setPersons] = useState([]);
  const [stat, setStat] = useState({});
  const scrollTrigger = useScrollTrigger({ threshold: 70 });
  // const [autoElected, setAutoElected] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${host}${user ? '/admin' : ''}/persons?region=${district}`, header(user))
      .then(({ data }) => {
        if (Object.values(data).length > 0) {
          let panDemoCount = 0;
          let proEstabCount = 0;
          let otherCount = 0;
          Object.values(data).forEach((v) => {
            if (v.politicalFaction === 'PANDEMO') {
              panDemoCount += 1;
            } else if (v.politicalFaction === 'PROESTAB') {
              proEstabCount += 1;
            } else {
              otherCount += 1;
            }
          });
          setStat({ panDemoCount, proEstabCount, otherCount });
        }
        // setAutoElected(Object.values(data).length === 1 && data[0].politicalFaction === 'PROESTAB');
        setPersons(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [district, refreshAt, user]);

  useEffect(() => {
    setShortTitle(scrollTrigger ? district : '');
  }, [district, refreshAt, setShortTitle, scrollTrigger]);


  return (

    <>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="flex-start" spacing={1}>
            <Grid item xs={12} sm={12} md>
              <Typography color="inherit" variant="h5" component="h1" paragraph>
                {district}
              </Typography>
              <Typography color="inherit" variant="subtitle2" component="h1" paragraph>
                此區共收錄
                {' '}
                {stat.panDemoCount || 0}
                {' '}
名泛民、
                {stat.proEstabCount || 0}
                {' '}
名建制、
                {stat.otherCount || 0}
                {' '}
名獨立或其他人仕資料
              </Typography>
            </Grid>
            {user && (


            <Grid item>
              <AddPerson />
            </Grid>
            )}

          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} className={classes.root}>
        {loading
      && (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card className={classes.card}>
            <CardContent>
              <BeatLoader
                color={theme.palette.secondary.main}
                sizeUnit="px"
                size={15}
                loading={loading}
              />
            </CardContent>
          </Card>
        </Grid>
      )
      }

        {!loading && Object.values(persons).map(person => (
          <Grid key={`grid-${person.personId}`} item xs={12} sm={6} md={4} lg={3} xl={2} zeroMinWidth>

            <Card>

              <CardHeader
                title={person.name}
                subheader={person.politicalAffiliation}
                avatar={avatarProducer(person.politicalAffiliation)}
                action={person.socialMedia && (
                <SimpleLink href={person.socialMedia} target="new">
                  <IconButton color="inherit" aria-label="Social Media">
                    <Icon
                      path={mdiFacebookBox}
                      title="Social Media"
                      size={1}
                    />
                  </IconButton>
                </SimpleLink>
                )
                }
              />
              <CardActionArea
                component={PersonLink}
                to={`/person/${person.personId}/${person.name}`}
              >
                {(!textOnly && person.imageUrl) ? (
                  <CardMedia
                    className={classes.media}
                    image={person.imageUrl}
                    title={person.name}
                  />
                ) : (
                  <CardMedia className={classes.media} image="/images/person-icon.png" title={person.name} />
                )}


                <CardContent>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {(person.background)
                      ? person.background
                      : <i>(暫未有資料...)</i>}
                  </Typography>
                </CardContent>

                <CardActions>
                  {person.hidden && (<VisibilityOff />)}
                  <FactionChip politicalFaction={person.politicalFaction} />
                  {person.tags && person.tags.map((t, i) => (
                    <Chip
                      key={`tag-${person.personId}-${i}`}
                      size="small"
                      variant="outlined"
                      label={t}
                      className={classes.chip}
                    />
                  ))}
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};


DistrictBoard.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  refreshAt: PropTypes.string,

};

DistrictBoard.defaultProps = {
  refreshAt: '',
};

const mapStateToProps = state => ({
  refreshAt: state.refreshAt,
  user: state.user,
  textOnly: state.textOnly,
});
export default connect(mapStateToProps, { setShortTitle })(withStyles(styles(theme))(DistrictBoard));

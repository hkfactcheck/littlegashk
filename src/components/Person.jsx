import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MdiIcon from '@mdi/react';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';
import SimpleLink from '@material-ui/core/Link/Link';
import IconButton from '@material-ui/core/IconButton';
import { mdiFacebookBox } from '@mdi/js';
import Chip from '@material-ui/core/Chip';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import { useSnackbar } from 'notistack';
import {
  ChatBubbleOutline,
  CheckCircleOutline,
  List,
  LiveTv, Photo,
  ThumbsUpDown,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import theme from '../theme';
import { host, header } from '../api';
import AddEvent from './AddEvent';
import FactionChip from './FactionChip';
import { refreshed, setShortTitle } from '../actions';
import EditPerson from './EditPerson';
import EventDetail from './EventDetail';

const styles = theme => ({
  card: {
    // maxWidth: 345,
  },
  root: {
    padding: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
    backgroundColor: theme.palette.grey[200],
  },
  secondaryBar: {
    zIndex: 0,
  },
  chip: {
    backgroundColor: theme.palette.common.white,
    margin: theme.spacing(1),
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },

});

const eventIcon = (eventType) => {
  switch (eventType) {
    case 'VOTE':
      return { icon: <CheckCircleOutlineIcon />, bubbleStyle: { borderColor: theme.palette.primary.light } };
    case 'SPEECH':
      return { icon: <ChatBubbleOutlineIcon />, bubbleStyle: { borderColor: theme.palette.primary.light } };
    case 'MEDIA':
      return { icon: <LiveTvIcon />, bubbleStyle: { borderColor: theme.palette.primary.light } };
    default:
      return { icon: <Photo />, bubbleStyle: { borderColor: theme.palette.primary.light } };
  }
};

const eventTitle = (eventType) => {
  switch (eventType) {
    case 'VOTE':
      return '投票';
    case 'SPEECH':
      return '言論';
    case 'MEDIA':
      return '媒體';
    default:
      return '其他';
  }
};


const Person = (props) => {
  const {
    match: { params: { pid } }, classes, refreshAt, user, setShortTitle, refreshed,
  } = props;
  const [person, setPerson] = useState({});
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const scrollTrigger = useScrollTrigger({ threshold: 70 });
  const filteredEvent = events.filter(e => ((filter === 'HIDDEN' && e.rating <= 0) || (e.rating > 0 && (filter === '' || e.eventType === filter))));
  const toggleVisibility = (hidden) => {
    axios.put(`${host}/admin/persons/${pid}/${hidden ? 'hide' : 'show'}`, null, header(user))
      .then(() => {
        enqueueSnackbar('OK');
        refreshed();
      })
      .catch((error) => {
        enqueueSnackbar(`操作失敗: ${error.response.data.message}`);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${host}/persons/${pid}`)
      .then(({ data }) => {
        setPerson(data);
        return axios.get(`${host}${user ? '/admin' : ''}/persons/${pid}/events`, header(user));
      })
      .then(({ data }) => {
        setEvents(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pid, refreshAt, user]);

  useEffect(() => {
    const title = person.region ? (`${person.name} | ${person.region.split('-', 3)[2]}`) : '';
    setShortTitle(scrollTrigger ? title : '');
  }, [person, setShortTitle, scrollTrigger]);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <BeatLoader
            color="#8B572A"
            sizeUnit="px"
            size={15}
            loading={loading}
          />
        </CardContent>
      </Card>
    );
  }
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
            <Grid item xs={12}>
              <Grid container alignItems="flex-start">
                <Grid item xs>
                  <Typography color="inherit" variant="h5" component="h1">
                    {person.name}

                    {person.hidden && '（已隱藏）'}
                  </Typography>
                  <Typography color="inherit" variant="subtitle2" paragraph>
                    {person.politicalAffiliation}
                    {' '}
                    |
                    {' '}
                    {person.region && person.region.split('-', 3)[2]}
                  </Typography>
                </Grid>
                {user
              && (
                <>
                  <Grid item>
                    <IconButton color="secondary" aria-label="Edit" onClick={() => toggleVisibility(!person.hidden)}>
                      {person.hidden ? <Visibility /> : <VisibilityOff /> }

                    </IconButton>
                  </Grid>
                  <Grid item>
                    <EditPerson person={person} />
                  </Grid>
                  <Grid item>
                    <AddEvent personId={pid} />
                  </Grid>
                </>
              )
              }
              </Grid>
            </Grid>
            <Grid item xs={12}>

              <Typography color="inherit" variant="body2" paragraph>
                {person.background
                  ? person.background
                  : <i>(暫未有資料...)</i>}
              </Typography>
              <div>
                {person.socialMedia && (
                <SimpleLink href={person.socialMedia} target="new">
                  <IconButton aria-label="Social Media">
                    <MdiIcon
                      path={mdiFacebookBox}
                      title="Facebook"
                      size={1}
                      color="#FFF"
                    />
                  </IconButton>
                </SimpleLink>
                )
                  }
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
              </div>
            </Grid>


          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={filter}
          onChange={(event, newValue) => {
            setFilter(newValue);
          }}
          textColor="inherit"
          scrollButtons="auto"
          variant="scrollable"
        >
          {user && (
            <Tab textColor="inherit" label="待審批" value="HIDDEN" icon={<ThumbsUpDown />} />
          )}
          <Tab textColor="inherit" label="全部" value="" icon={<List />} />
          <Tab textColor="inherit" label="媒體" value="MEDIA" icon={<LiveTv />} />
          <Tab textColor="inherit" label="言論" value="SPEECH" icon={<ChatBubbleOutline />} />
          <Tab textColor="inherit" label="投票" value="VOTE" icon={<CheckCircleOutline />} />
          <Tab textColor="inherit" label="其他" value="OTHER" icon={<Photo />} />

        </Tabs>
      </AppBar>
      {/* Mobile only */}
      <Hidden smUp>
        <Grid container spacing={1} direction="column">


          {filteredEvent.map(e => (
            <Grid key={`grid-${e.eventId}`} item xs={12}>
              <Card elevation={0}>

                <CardHeader
                  title={`[${eventTitle(e.eventType)}] : ${e.title}`}
                  subheader={e.date}
                  avatar={eventIcon(e.eventType).icon}
                />


                <CardContent>
                  <EventDetail event={e} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Hidden>

      {/* Large screen only */}
      {filteredEvent.length > 0 && (
      <Hidden xsDown>
        <Grid key={`grid-${person.personId}`} item xs={12}>
          <Timeline
            style={{ fontSize: '100%' }}
            lineColor={theme.palette.primary.light}
          >
            {filteredEvent.map(e => (
              <TimelineEvent
                title={`[${eventTitle(e.eventType)}] : ${e.title}`}
                subtitle={e.date}
                {...eventIcon(e.eventType)}
                key={e.eventId}
              >
                <EventDetail event={e} />
              </TimelineEvent>
            ))}
          </Timeline>
        </Grid>
      </Hidden>
      )}


    </>
  );
};

Person.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  refreshAt: PropTypes.string,
};

Person.defaultProps = {
  refreshAt: '',
};

const mapStateToProps = state => ({
  personEvents: state.personEvents || {},
  refreshAt: state.refreshAt,
  user: state.user,
});
export default connect(mapStateToProps, { refreshed, setShortTitle })(withStyles(styles(theme))(Person));

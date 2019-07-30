import Typography from '@material-ui/core/Typography';
import validUrl from 'valid-url';
import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { OpenInNew, ThumbDown, ThumbUp } from '@material-ui/icons';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { ReactTinyLink } from 'react-tiny-link';
import IconButton from '@material-ui/core/IconButton';
import SimpleLink from '@material-ui/core/Link/Link';
import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PersonVote from './PersonVote';
import { host, header } from '../api';
import { refreshed } from '../actions';
import theme from '../theme';

const styles = theme => ({
  urlLink: {
    wordWrap: 'break-word',
    padding: theme.spacing(1, 1),
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.grey[100],
    display: 'block',

  },
  tinyLink: {
    margin: theme.spacing(2, 0),
  },

});
const EventDetail = (props) => {
  const {
    event, user, textOnly, classes, refreshed,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const deleteEvent = (pid, sid) => {
    axios.put(`${host}/admin/persons/${pid}/events/${sid}/delete`, null, header(user))
      .then(() => {
        enqueueSnackbar('Delete OK');
        refreshed();
      })
      .catch((error) => {
        enqueueSnackbar(`操作失敗: ${error.response.data.message}`);
      });
  };

  const voteUp = (pid, sid) => {
    axios.put(`${host}/admin/persons/${pid}/events/${sid}/up`, null, header(user))
      .then(() => {
        enqueueSnackbar('+1 OK');
        refreshed();
      })
      .catch((error) => {
        enqueueSnackbar(`操作失敗: ${error.response.data.message}`);
      });
  };

  const voteDown = (pid, sid) => {
    axios.put(`${host}/admin/persons/${pid}/events/${sid}/down`, null, header(user))
      .then(() => {
        enqueueSnackbar('-1 OK');
        refreshed();
      })
      .catch((error) => {
        enqueueSnackbar(`操作失敗: ${error.response.data.message}`);
      });
  };
  const ratingSection = (user, event) => {
    const isCreater = event.createdBy === user.getUsername();
    const isUpRater = isCreater || (event.upRaters && event.upRaters.indexOf(user.getUsername()) >= 0);
    const isDownRater = isCreater || (event.downRaters && event.downRaters.indexOf(user.getUsername()) >= 0);
    return (
      <>
        <ButtonGroup color="primary" size="small" aria-label="Small outlined button group">
          <Button
            color="inherit"
            aria-label="Vote up"
            onClick={() => voteUp(event.personId, event.eventId)}
            disabled={isUpRater}
          >
            <ThumbUp color={isUpRater ? 'disabled' : 'primary'} />
          </Button>
          <Button>{event.rating}</Button>
          <Button
            color="inherit"
            aria-label="Vote up"
            onClick={() => voteDown(event.personId, event.eventId)}
            disabled={isDownRater}
          >
            <ThumbDown color={isDownRater ? 'disabled' : 'primary'} />
          </Button>
          {isCreater && (<Button onClick={() => deleteEvent(event.personId, event.eventId)}>刪除事件</Button>)}

        </ButtonGroup>

      </>
    );
  };

  return (
    <>
      {event.eventType === 'VOTE' && (
      <PersonVote personVote={event.personVote} title={event.title} />
      )}

      <Typography variant="body2">
        {event.description}
      </Typography>

      {validUrl.isUri(event.url) && !textOnly ? (
        <Box className={classes.tinyLink}>

          <ReactTinyLink
            cardSize="small"
            showGraphic
            maxLine={3}
            minLine={2}
            url={event.url}
          />
        </Box>
      ) : (
        <SimpleLink href={event.url} target="new" className={classes.urlLink}>
          {event.url}
          <IconButton tooltip="Open" size="small">
            <OpenInNew />
          </IconButton>
        </SimpleLink>
      )
      }

      {user && (

        ratingSection(user, event)

      )}
    </>
  );
};

const mapStateToProps = state => ({
  refreshAt: state.refreshAt,
  user: state.user,
  textOnly: state.textOnly,
});
export default connect(mapStateToProps, { refreshed })(withStyles(styles(theme))(EventDetail));

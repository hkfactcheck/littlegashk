import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Link from '../src/link';

const useStyles = makeStyles(theme => ({
  root: {
    height: 380,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

const encodeBase64 = (topicId) => {
  const encodedString = new Buffer(topicId).toString('base64');
  // console.log('encoded : ', encodedString);
  return encodedString;
}

export default function SpeedDialTooltipOpen(data) {
  const classes = useStyles();
  // console.log('topicid = ', data.topicId);

  return (
    // <Link className={classes.speedDial}>
        <a target='_blank' href={`https://t.me/littlegashk_tg_bot?start=` + encodeBase64('tid=' + data.topicId)} className={classes.speedDial}>
            <Fab color="primary" aria-label="edit" className={classes.fab}>
                <AddCommentIcon/>
            </Fab>
        </a>
    // </Link>
  );
}
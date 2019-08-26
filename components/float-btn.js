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

export default function SpeedDialTooltipOpen(data) {
  const classes = useStyles();
  console.log('topicid = ', data.topicId);

  return (
    <Link className={classes.speedDial}>
        <a target='_blank' href={`https://t.me/littlegashk_tg_bot?start=base64("tid=` + data.topicId + `")`}>
            <Fab color="primary" aria-label="edit" className={classes.fab}>
                <AddCommentIcon/>
            </Fab>
        </a>
    </Link>
  );
}
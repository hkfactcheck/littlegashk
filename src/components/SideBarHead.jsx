import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

export default () => (
  <Toolbar>
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Avatar>
          <HowToVoteIcon />
        </Avatar>
      </Grid>

      <Grid item xs={9}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
選區事實處
          </Typography>
        </Link>


        <Typography variant="caption">Districts Facts Office</Typography>
      </Grid>
    </Grid>
  </Toolbar>


);

import React from 'react';
import {
  Block, Check, Clear, EventSeat,
} from '@material-ui/icons';
import { green, grey, red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import theme from '../theme';

export default (props) => {
  const { personVote, title } = props;
  let icon;
  let result;
  switch (personVote) {
    case 'YES':
      icon = (
        <Check style={{
          fontSize: 50, color: green[800], border: '1px solid', borderRadius: '5px 5px', backgroundColor: theme.palette.grey[100],
        }}
        />
      );
      result = '投下贊成票';
      break;
    case 'NO':
      icon = (
        <Clear style={{
          fontSize: 50, color: red[800], border: '1px solid', borderRadius: '5px 5px', backgroundColor: theme.palette.grey[100],
        }}
        />
      );
      result = '投下反對票';
      break;
    case 'ABSTAIN':
      icon = (
        <Block style={{
          fontSize: 50, color: grey[100], border: '1px solid', borderRadius: '5px 5px', backgroundColor: theme.palette.grey[800],
        }}
        />
      );
      result = '投下棄權票';
      break;
    case 'ABSENT':
      icon = (
        <EventSeat style={{
          fontSize: 50, color: grey[400], border: '1px solid', borderRadius: '5px 5px', backgroundColor: theme.palette.grey[100],
        }}
        />
      );
      result = '缺席投票';
      break;
    default:
      return null;
  }

  return (
    <Grid container spacing={2} alignItems="center" justify="flex-start" direction="row">
      <Grid item>
        {icon}
      </Grid>
      <Grid item xs>
        <Typography variant="subtitle2" component="p">
          {title}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {result}
        </Typography>
      </Grid>
    </Grid>
  );
};

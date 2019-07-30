import React from 'react';
import Chip from '@material-ui/core/Chip';
import { grey, red, yellow } from '@material-ui/core/colors';
import theme from '../theme';

export default (props) => {
  const { politicalFaction } = props;
  switch (politicalFaction) {
    case 'PANDEMO':
      return (
        <Chip
          size="small"
          label="泛民"
          style={{ margin: theme.spacing(0.5), backgroundColor: yellow[500] }}
          color="secondary"
        />
      );
    case 'PROESTAB':
      return (
        <Chip
          size="small"
          label="建制"
          style={{ margin: theme.spacing(0.5), backgroundColor: red[800], color: grey[50] }}
        />
      );
    default:
      return (
        <Chip
          size="small"
          label="獨立/其他"
          style={{ margin: theme.spacing(0.5) }}
        />
      );
  }
};

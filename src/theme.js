import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#353C51',
		},
	},
	overrides: {
		MuiDrawer: {
			paper: {
				fontSize: '1rem',
				backgroundColor: '#e2e2e2',
		  },
		},
	  },
});

export default theme;
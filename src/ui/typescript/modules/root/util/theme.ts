import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const AppTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ef4b4b'
    },
    secondary: {
      main: '#7ecfc0'
    },
  },
  typography: {
    fontFamily: `Poppins, Roboto, "Segoe UI", Arial, sans-serif`,
  },
});
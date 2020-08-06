import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Typography,
  AppBar,
  IconButton,
  Toolbar,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import HomeIcon from 'mdi-material-ui/Home';
import MenuIcon from 'mdi-material-ui/Menu';
import HeartIcon from 'mdi-material-ui/Heart';

import EntityPage from './EntityPage';
import Home from './Home';
import ProfileImg from './ProfileImg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: theme.palette.background.default,
  },
  title: {
    flexGrow: 1,
  },
  profile: {
    width: '36px',
    borderRadius: '100%',
  },
  swipeableView: {
    flexGrow: 1,
  },
  menu: {
    visibility: 'hidden',
  },
  '@media (max-width: 870px)': {
    menu: {
      visibility: 'visible',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;
  return value === index && <Box p={3}>{children}</Box>;
}

export default function Panel(props) {
  const theme = useTheme();
  const matchesUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleMenuClick = () => {
    window.parent.customPanel.parentNode.parentNode.offsetParent
      .querySelector('home-assistant')
      .shadowRoot.querySelector('home-assistant-main')
      .dispatchEvent(new Event('hass-toggle-menu'));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.header}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.menu}
            onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <ProfileImg />
        </Toolbar>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={matchesUpSm ? 'standard' : 'fullWidth'}
          centered>
          <Tab icon={<HomeIcon />} aria-label="Home" />
          <Tab icon={<HeartIcon />} aria-label="favorite" />
          <Tab icon={<HeartIcon />} aria-label="person" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        className={classes.swipeableView}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EntityPage />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

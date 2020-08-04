import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

import { Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import HomeIcon from 'mdi-material-ui/Home';
import MenuIcon from 'mdi-material-ui/Menu';
import HeartIcon from 'mdi-material-ui/Heart';

import Entities from './Entities';
import Home from './home/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
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
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menu}
            onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
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
          <Entities />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

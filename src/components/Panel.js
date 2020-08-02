import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HomeIcon from '@material-ui/icons/Home';

import Entities from './Entities';
import Home from './home/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
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

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab icon={<HomeIcon />} aria-label="Home" />
        <Tab icon={<FavoriteIcon />} aria-label="favorite" />
        <Tab icon={<PersonPinIcon />} aria-label="person" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Entities />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}

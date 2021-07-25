import React from 'react';
import { styled } from '@material-ui/core/styles';
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

import HomeIcon from 'mdi-material-ui/Home';
import MenuIcon from 'mdi-material-ui/Menu';
import HeartIcon from 'mdi-material-ui/Heart';

import EntityPage from './EntityPage';
import ProfileImg from './ProfileImg';
import CardDashboard from './CardDashboard';

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.primary,
  background: theme.palette.background.default,
}));

const Header = styled(AppBar)`
  background: ${({ theme }) => theme.palette.background.default};
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const Menu = styled(IconButton)`
  display: none;
  @media (max-width: 870px) {
    display: block;
  }
`;

function TabPanel(props) {
  const { children, value, index } = props;
  return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
}

export default function Panel() {
  const theme = useTheme();
  const matchesUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleMenuClick = () => {
    window.parent.customPanel.parentNode.parentNode.offsetParent
      .querySelector('home-assistant')
      .shadowRoot.querySelector('home-assistant-main')
      .dispatchEvent(new Event('hass-toggle-menu'));
  };

  return (
    <Container>
      <Header position="static" color="default">
        <Toolbar>
          <Menu edge="start" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </Menu>
          <Title variant="h6">Home</Title>
          <ProfileImg />
        </Toolbar>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={matchesUpSm ? 'standard' : 'fullWidth'}
          centered
        >
          <Tab icon={<HomeIcon />} aria-label="Home" />
          <Tab icon={<HeartIcon />} aria-label="favorite" />
        </Tabs>
      </Header>
      <div>
        <TabPanel value={value} index={0}>
          <CardDashboard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EntityPage />
        </TabPanel>
      </div>
    </Container>
  );
}

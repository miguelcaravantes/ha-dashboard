import { styled } from '@mui/material/styles';
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
} from '@mui/material';

import {
  Home as HomeIcon,
  Menu as MenuIcon,
  Heart as HeartIcon,
} from 'mdi-material-ui';

import EntityPage from './EntityPage.js';
import ProfileImg from './ProfileImg.js';
import CardDashboard from './CardDashboard.js';
import React, { useState } from 'react';

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.primary,
  background: theme.palette.background.default,
}));

const Header = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.default,
}));

const Title = styled(Typography)({
  flexGrow: 1,
});

const Menu = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down(870)]: {
    display: 'block',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
}

export default function Panel() {
  const theme = useTheme();
  const matchesUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleMenuClick = () => {
    const customPanel = (
      window as Window &
        typeof globalThis & {
          parent: {
            customPanel?: {
              parentNode: { parentNode: { offsetParent: HTMLElement } };
            };
          };
        }
    ).parent?.customPanel;
    if (customPanel) {
      const ha = customPanel.parentNode.parentNode.offsetParent?.querySelector(
        'home-assistant'
      ) as HTMLElement | null;
      ha?.shadowRoot
        ?.querySelector('home-assistant-main')
        ?.dispatchEvent(new Event('hass-toggle-menu'));
    }
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

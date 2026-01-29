import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Heart as HeartIcon,
} from "lucide-react";
import { Button } from "../components/ui/button.js";
import EntityPage from "./EntityPage.js";
import ProfileImg from "./ProfileImg.js";
import CardDashboard from "./CardDashboard.js";
import { isObject } from "../common/utils/typeGuards.js";
import type { HAWindow } from "../types/home-assistant.js";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return value === index ? <div className="p-4 md:p-6">{children}</div> : null;
}

export default function Panel() {
  const [value, setValue] = useState(0);

  const handleMenuClick = () => {
    const haWindow = window.parent as HAWindow;
    haWindow.customPanel?.parentNode.parentNode.offsetParent
      ?.querySelector("home-assistant")
      ?.shadowRoot?.querySelector("home-assistant-main")
      ?.dispatchEvent(new Event("hass-toggle-menu"));
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 w-full items-center px-4 md:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={handleMenuClick}
            aria-label="menu"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-bold md:mr-8">Home</h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Button
                variant={value === 0 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setValue(0)}
                className="gap-2"
              >
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Button>
              <Button
                variant={value === 1 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setValue(1)}
                className="gap-2"
              >
                <HeartIcon className="h-4 w-4" />
                <span>Favorite</span>
              </Button>
            </nav>

            <div className="flex flex-1 md:flex-initial items-center justify-end space-x-4">
              <ProfileImg />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6">
          <TabPanel value={value} index={0}>
            <CardDashboard />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EntityPage />
          </TabPanel>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t bg-background flex items-center justify-around">
        <button
          onClick={() => setValue(0)}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${value === 0 ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">
            Home
          </span>
        </button>
        <button
          onClick={() => setValue(1)}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${value === 1 ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <HeartIcon className="h-6 w-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">
            Favorite
          </span>
        </button>
      </nav>
    </div>
  );
}

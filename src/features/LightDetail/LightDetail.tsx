import * as React from 'react';
import {
  AdaptiveDialog,
  AdaptiveDialogContent,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
} from '../../components/ui/adaptive-dialog.js';
import { Switch } from '../../components/ui/switch.js';
import { Slider } from '../../components/ui/slider.js';
import { Button } from '../../components/ui/button.js';
import Icon from '../Icon.js';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../components/ui/tabs.js';
import ColorPresets from './ColorPresets.js';
import useLightDetail from './useLightDetail.js';
import useEntity from '../../common/hooks/useEntity.js';
import LightGroup from './LightGroup.js';
import type { KnownEntityId } from '../../types/entities.js';

interface LightDetailProps {
  entityId: KnownEntityId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LightDetail({
  entityId,
  open,
  onOpenChange,
}: LightDetailProps) {
  const { isGroup, name, state, toggle, openMoreInfo } = useEntity(entityId);
  const {
    doesSupportColor,
    doesSupportColorTemp,
    doesSupportBrightness,
    brightness,
    colorTemp,
    rgbColor,
    minMireds,
    maxMireds,
    handleColorChange,
    handleBrightnessChange,
    handleColorTempChange,
    isPending,
  } = useLightDetail(entityId);

  const [isTogglePending, startToggleTransition] = React.useTransition();

  const handleToggle = () => {
    startToggleTransition(async () => {
      await toggle();
    });
  };

  const activeColor = rgbColor
    ? `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`
    : state === 'on'
      ? '#ffffff'
      : undefined;

  const renderBrightnessSlider = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Brightness</span>
        <span className="text-muted-foreground text-sm">
          {Math.round((brightness / 255) * 100)}%
        </span>
      </div>
      <Slider
        value={[brightness]}
        max={255}
        step={1}
        trackColor={activeColor}
        onValueChange={(val) => handleBrightnessChange(val[0] ?? 0)}
        disabled={isPending}
      />
    </div>
  );

  const renderColorTempSlider = () => (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Temperature</span>
        <span className="text-muted-foreground text-sm">
          {colorTemp > 0 ? Math.round(1000000 / colorTemp) : 0}K
        </span>
      </div>
      <Slider
        value={[colorTemp]}
        min={minMireds}
        max={maxMireds}
        step={1}
        onValueChange={(val) => handleColorTempChange(val[0] ?? minMireds)}
        disabled={isPending}
      />
    </div>
  );

  const showTabs = doesSupportColor && doesSupportColorTemp;
  const showColorOnly = doesSupportColor && !doesSupportColorTemp;
  const showWhiteOnly = !doesSupportColor && doesSupportColorTemp;

  return (
    <AdaptiveDialog open={open} onOpenChange={onOpenChange}>
      <AdaptiveDialogContent className="max-w-md">
        <AdaptiveDialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pr-8">
          <div className="flex items-center gap-2">
            <AdaptiveDialogTitle className="text-xl font-semibold">
              {name}
            </AdaptiveDialogTitle>
            <Button variant="ghost" size="icon" onClick={openMoreInfo}>
              <Icon icon="mdi:tune" />
            </Button>
          </div>
          <Switch
            checked={state === 'on'}
            onCheckedChange={handleToggle}
            disabled={isPending || isTogglePending}
          />
        </AdaptiveDialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {doesSupportBrightness && renderBrightnessSlider()}

          {showTabs && (
            <Tabs defaultValue="color" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="color">Color</TabsTrigger>
                <TabsTrigger value="white">White</TabsTrigger>
              </TabsList>
              <TabsContent value="color" className="pt-4">
                <ColorPresets
                  onChange={handleColorChange}
                  disabled={isPending}
                />
              </TabsContent>
              <TabsContent value="white">{renderColorTempSlider()}</TabsContent>
            </Tabs>
          )}

          {showColorOnly && (
            <div className="pt-4">
              <ColorPresets onChange={handleColorChange} disabled={isPending} />
            </div>
          )}

          {showWhiteOnly && renderColorTempSlider()}

          {isGroup && <LightGroup entityId={entityId} />}
        </div>
      </AdaptiveDialogContent>
    </AdaptiveDialog>
  );
}

import * as React from "react";
import {
  AdaptiveDialog,
  AdaptiveDialogContent,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
} from "@/components/ui/adaptive-dialog";
import { Switch } from "@/components/ui/switch";
import LightBrightness from "./LightBrightness.js";
import LightColor from "./LightColor.js";
import useLightDetail from "./useLightDetail.js";
import useEntity from "../../common/hooks/useEntity.js";
import LightGroup from "./LightGroup.js";
import type { KnownEntityId } from "../../types/entities.js";

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
  const { isGroup, name, state, toggle } = useEntity(entityId);
  const {
    doesSupportColor,
    doesSupportBrightness,
    brightness,
    handleColorChange,
    handleBrightnessChange,
    isPending,
  } = useLightDetail(entityId);

  const [isTogglePending, startToggleTransition] = React.useTransition();

  const handleToggle = () => {
    startToggleTransition(async () => {
      await toggle();
    });
  };

  return (
    <AdaptiveDialog open={open} onOpenChange={onOpenChange}>
      <AdaptiveDialogContent className="max-w-md">
        <AdaptiveDialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <AdaptiveDialogTitle className="text-xl font-semibold">
            {name}
          </AdaptiveDialogTitle>
          <Switch
            checked={state === "on"}
            onCheckedChange={handleToggle}
            disabled={isPending || isTogglePending}
          />
        </AdaptiveDialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {doesSupportColor && (
            <LightColor onChange={handleColorChange} disabled={isPending} />
          )}
          {doesSupportBrightness && (
            <LightBrightness
              value={brightness}
              onChange={handleBrightnessChange}
              disabled={isPending}
            />
          )}
          {isGroup && <LightGroup entityId={entityId} />}
        </div>
      </AdaptiveDialogContent>
    </AdaptiveDialog>
  );
}

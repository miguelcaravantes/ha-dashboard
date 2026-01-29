import { useState, useTransition } from "react";
import { Fan as FanIcon } from "lucide-react";
import _AwesomeDebouncePromise from "awesome-debounce-promise";
import _useConstant from "use-constant";

import {
  AdaptiveDialog,
  AdaptiveDialogContent,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
} from "@/components/ui/adaptive-dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tune as TuneIcon } from "mdi-material-ui";
import { cn } from "@/lib/utils";

import useEntity from "../common/hooks/useEntity.js";
import { useHass } from "../common/hooks/useHass.js";
import { FAN_SUPPORT_SET_SPEED, FAN_SUPPORT_OSCILLATE } from "../constants.js";
import type { KnownEntityId } from "../types/entities.js";
import { isNumber, hasDefault } from "../common/utils/typeGuards.js";

const awesomeDebounce = hasDefault<unknown>(_AwesomeDebouncePromise)
  ? _AwesomeDebouncePromise.default
  : _AwesomeDebouncePromise;
const useConstantHook = hasDefault<unknown>(_useConstant)
  ? _useConstant.default
  : _useConstant;

interface FanDetailProps {
  entityId: KnownEntityId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FanDetail({
  entityId,
  open,
  onOpenChange,
}: FanDetailProps) {
  const { callService } = useHass();
  const { stateObj, supportedFeatures, name, state, toggle, openMoreInfo } =
    useEntity(entityId);
  const [isPending, startTransition] = useTransition();

  const attributes = stateObj?.attributes || {};
  const oscillating =
    typeof attributes.oscillating === "boolean"
      ? attributes.oscillating
      : undefined;
  const percentageStep = isNumber(attributes.percentage_step)
    ? attributes.percentage_step
    : undefined;
  const percentage = isNumber(attributes.percentage)
    ? attributes.percentage
    : undefined;

  const [localPercentage, setLocalPercentage] = useState(percentage ?? 0);

  const doesSupportSpeed = Boolean(
    (supportedFeatures ?? 0) & FAN_SUPPORT_SET_SPEED,
  );
  const doesSupportOscillate = Boolean(
    (supportedFeatures ?? 0) & FAN_SUPPORT_OSCILLATE,
  );

  const handleChangeOscillation = (checked: boolean) => {
    startTransition(async () => {
      await callService("fan", "oscillate", {
        entity_id: entityId,
        oscillating: checked,
      });
    });
  };

  const updatePercentage = useConstantHook(() =>
    awesomeDebounce(async (percentageValue: number) => {
      await callService("fan", "set_percentage", {
        entity_id: entityId,
        percentage: percentageValue,
      });
    }, 100),
  );

  const handleSpeedChange = (value: number) => {
    setLocalPercentage(value);
    startTransition(async () => {
      await updatePercentage(value);
    });
  };

  const [isTogglePending, startToggleTransition] = useTransition();

  const handleToggle = () => {
    startToggleTransition(async () => {
      await toggle();
    });
  };

  const isOn = state === "on";

  return (
    <AdaptiveDialog open={open} onOpenChange={onOpenChange}>
      <AdaptiveDialogContent className="max-w-md">
        <AdaptiveDialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pr-8">
          <div className="flex items-center gap-2">
            <AdaptiveDialogTitle className="text-xl font-semibold">
              {name}
            </AdaptiveDialogTitle>
            <Button variant="ghost" size="icon" onClick={openMoreInfo}>
              <TuneIcon className="h-5 w-5" />
            </Button>
          </div>
          <Switch
            checked={isOn}
            onCheckedChange={handleToggle}
            disabled={isPending || isTogglePending}
          />
        </AdaptiveDialogHeader>

        <div
          className={cn(
            "flex flex-col gap-6 py-4",
            (isPending || isTogglePending) && "opacity-70",
          )}
        >
          <div className="flex justify-center py-8">
            <div
              className={cn(
                "rounded-full bg-muted p-6 transition-all duration-1000",
                isOn && "bg-primary/10",
              )}
            >
              <FanIcon
                className={cn(
                  "h-24 w-24 text-muted-foreground transition-all duration-1000",
                  isOn && "text-primary animate-spin",
                )}
                style={{ animationDuration: "3s" }}
              />
            </div>
          </div>

          {doesSupportSpeed && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Speed</span>
                <span className="text-muted-foreground text-sm">
                  {Math.round(localPercentage)}%
                </span>
              </div>
              <Slider
                min={0}
                max={100}
                step={percentageStep ?? 1}
                value={[localPercentage]}
                onValueChange={(val: number[]) => {
                  if (isNumber(val[0])) {
                    handleSpeedChange(val[0]);
                  }
                }}
                disabled={isPending}
              />
            </div>
          )}

          {doesSupportOscillate && (
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <span className="text-sm font-medium">Oscillate</span>
              </div>
              <Switch
                checked={oscillating ?? false}
                onCheckedChange={handleChangeOscillation}
                disabled={isPending}
              />
            </div>
          )}
        </div>
      </AdaptiveDialogContent>
    </AdaptiveDialog>
  );
}

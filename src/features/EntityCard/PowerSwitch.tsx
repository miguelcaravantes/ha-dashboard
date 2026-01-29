import { useActionState, useOptimistic, startTransition } from "react";
import { Switch } from "@/components/ui/switch.js";
import type { UseEntityResult } from "../../common/hooks/useEntity.js";
import { type Color } from "@mui/material";

interface PowerSwitchProps {
  entity: UseEntityResult;
  color?: Color;
  className?: string;
}

const PowerSwitch = ({
  entity: { state, toggle },
  className,
}: PowerSwitchProps) => {
  const [optimisticOn, setOptimisticOn] = useOptimistic(
    state === "on",
    (_, newState: boolean) => newState,
  );

  const [_, toggleAction, isPending] = useActionState(async () => {
    await toggle();
    return null;
  }, null);

  const handleCheckedChange = (checked: boolean) => {
    startTransition(() => {
      setOptimisticOn(checked);
      toggleAction();
    });
  };

  return (
    <Switch
      checked={optimisticOn}
      onCheckedChange={handleCheckedChange}
      disabled={isPending}
      className={className}
      size="default"
    />
  );
};

export default PowerSwitch;

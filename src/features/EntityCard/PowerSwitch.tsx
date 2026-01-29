import { useActionState, useOptimistic, startTransition } from 'react';
import { Switch } from '@/components/ui/switch.js';
import type { UseEntityResult } from '../../common/hooks/useEntity.js';
import { cn } from '@/lib/utils.js';

interface PowerSwitchProps {
  entity: UseEntityResult;
  color?: string;
  className?: string;
}

const PowerSwitch = ({
  entity: { state, toggle },
  className,
}: PowerSwitchProps) => {
  const [optimisticOn, setOptimisticOn] = useOptimistic(
    state === 'on',
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

  const isColored = state === 'on';

  return (
    <Switch
      checked={optimisticOn}
      onCheckedChange={handleCheckedChange}
      disabled={isPending}
      className={cn(className, isColored && 'data-[state=checked]:bg-white/30')}
      size="default"
    />
  );
};

export default PowerSwitch;

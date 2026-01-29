import useEntity, { ActionType } from '../common/hooks/useEntity.js';
import { Button } from '../components/ui/button.js';
import { Switch } from '../components/ui/switch.js';
import Icon from './Icon.js';
import type { KnownEntityId } from '../types/entities.js';

interface EntityRowProps {
  entityId: KnownEntityId;
}

export default function EntityRow({ entityId }: EntityRowProps) {
  const { state, name, actionType, toggle, execute, icon } =
    useEntity(entityId);

  const renderAction = () => {
    switch (actionType) {
      case ActionType.Toggle:
        return <Switch onCheckedChange={toggle} checked={state === 'on'} />;
      case ActionType.Execute:
        return (
          <Button onClick={execute} size="sm">
            Execute
          </Button>
        );
      default:
        return <span className="text-sm text-muted-foreground">{state}</span>;
    }
  };

  return (
    <div className="flex items-center px-4 py-3 border-b last:border-b-0 hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-center w-10 h-10 mr-4 text-muted-foreground">
        <Icon icon={icon} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none truncate">{name}</p>
      </div>
      <div className="ml-4">{renderAction()}</div>
    </div>
  );
}

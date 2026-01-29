import { useTransition } from "react";
import {
  AdaptiveDialog,
  AdaptiveDialogContent,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
} from "../components/ui/adaptive-dialog.js";
import { Switch } from "../components/ui/switch.js";
import { Button } from "../components/ui/button.js";
import { Tune as TuneIcon } from "mdi-material-ui";
import useEntity, { actionTypes } from "../common/hooks/useEntity.js";
import FanDetail from "./FanDetail.js";
import LightDetail from "./LightDetail/LightDetail.js";
import type { KnownEntityId } from "../types/entities.js";

const domainDetailMap: Record<
  string,
  React.ComponentType<{ entityId: KnownEntityId }>
> = {};

interface EntityDialogProps {
  onClose: () => void;
  open: boolean;
  entityId: KnownEntityId;
}

export default function EntityDialog(props: EntityDialogProps) {
  const { onClose, open, entityId } = props;
  const { domain, name, state, toggle, openMoreInfo, actionType } =
    useEntity(entityId);

  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggle();
    });
  };

  const handleClose = () => {
    onClose?.();
  };

  if (open && domain === "light") {
    return (
      <LightDetail
        entityId={entityId}
        open={open}
        onOpenChange={(isOpen) => !isOpen && handleClose()}
      />
    );
  }

  if (open && domain === "fan") {
    return (
      <FanDetail
        entityId={entityId}
        open={open}
        onOpenChange={(isOpen) => !isOpen && handleClose()}
      />
    );
  }

  const Detail = domainDetailMap[domain];

  return (
    <AdaptiveDialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
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
          {actionType === actionTypes.Toggle && (
            <Switch
              checked={state === "on"}
              onCheckedChange={handleToggle}
              disabled={isPending}
            />
          )}
        </AdaptiveDialogHeader>
        {Detail && (
          <div className="pt-4">
            <Detail entityId={entityId} />
          </div>
        )}
      </AdaptiveDialogContent>
    </AdaptiveDialog>
  );
}

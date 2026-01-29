import { useTransition } from "react";
import {
  Dialog,
  Toolbar,
  Typography,
  Switch,
  DialogContent as MuiDialogContent,
  IconButton,
} from "@mui/material";

import useEntity, { actionTypes } from "../common/hooks/useEntity.js";
import { styled } from "@mui/material/styles";
import FanDetail from "./FanDetail.js";
import { Tune as TuneIcon } from "mdi-material-ui";
import LightDetail from "./LightDetail/LightDetail.js";
import type { KnownEntityId } from "../types/entities.js";

const Root = styled(Dialog)`
  backdrop-filter: blur(5px);
  & .MuiDialog-paper {
    width: 80%;
  }
`;

const Title = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(2)};
  flex: 1;
`;

const DialogContent = styled(MuiDialogContent)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const domainDetailMap: Record<
  string,
  React.ComponentType<{ entityId: KnownEntityId }>
> = {};

interface DialogToolbarProps {
  title: string | undefined;
  onMoreClick: () => void;
  showToggle: boolean;
  state: string;
  onToggle: () => Promise<void>;
}

const DialogToolbar = ({
  title,
  onMoreClick,
  showToggle,
  state,
  onToggle,
}: DialogToolbarProps) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await onToggle();
    });
  };

  return (
    <Toolbar sx={{ opacity: isPending ? 0.7 : 1 }}>
      <Title variant="h6">{title}</Title>
      <IconButton onClick={onMoreClick}>
        <TuneIcon />
      </IconButton>
      {showToggle && (
        <Switch
          checked={state === "on"}
          onChange={handleToggle}
          color="primary"
          disabled={isPending}
        />
      )}
    </Toolbar>
  );
};

interface EntityDialogProps {
  onClose: () => void;
  open: boolean;
  entityId: KnownEntityId;
}

export default function EntityDialog(props: EntityDialogProps) {
  const { onClose, open, entityId } = props;
  const { domain, name, state, toggle, openMoreInfo, actionType } =
    useEntity(entityId);

  const Detail = domainDetailMap[domain];

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

  return (
    <Root maxWidth="xs" onClose={handleClose} open={open}>
      <DialogToolbar
        showToggle={actionType === actionTypes.Toggle}
        onMoreClick={openMoreInfo}
        title={name}
        state={state}
        onToggle={toggle}
      />
      {open && Detail && (
        <DialogContent>
          <Detail entityId={entityId} />
        </DialogContent>
      )}
    </Root>
  );
}

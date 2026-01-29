import { useState } from "react";
import useEntity from "../../common/hooks/useEntity.js";
import { Button } from "../../components/ui/button.js";
import Icon from "../Icon.js";
import EntityDialog from "../EntityDialog.js";
import type { KnownEntityId } from "../../types/entities.js";
import { isEntityId } from "../../common/utils/typeGuards.js";

function Child({ entityId }: { entityId: KnownEntityId }) {
  const { icon, name } = useEntity(entityId);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => setModalOpen(true)}
      >
        <Icon icon={icon} /> {name}
      </Button>
      <EntityDialog
        entityId={entityId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default function LightGroup({ entityId }: { entityId: KnownEntityId }) {
  const { groupEntities } = useEntity(entityId);
  return (
    <div className="flex flex-col gap-2 pt-2">
      <h4 className="text-sm font-medium">Group Members:</h4>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {groupEntities?.map((e) =>
          isEntityId(e) ? <Child key={e} entityId={e} /> : null,
        )}
      </div>
    </div>
  );
}

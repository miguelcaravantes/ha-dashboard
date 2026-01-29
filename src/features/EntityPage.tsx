import { useHass } from '../common/hooks/useHass.js';
import EntityRow from './EntityRow.js';

export default function EntityPage() {
  const { states } = useHass();
  return (
    <div className="w-full bg-card text-card-foreground rounded-lg border shadow-sm">
      <nav aria-label="main mailbox folders" className="flex flex-col">
        {Object.keys(states)
          .filter((key) => !states[key]?.attributes.hidden)
          .map((key) => (
            <EntityRow key={key} entityId={key} />
          ))}
      </nav>
    </div>
  );
}

import { Plus } from 'lucide-react';

interface EmptyDashboardProps {
  onAddWidget: () => void;
}

export function EmptyDashboard({ onAddWidget }: EmptyDashboardProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Dashboard is Empty</h2>
        <p className="text-muted-foreground mb-6">
          Get started by adding your first widget.
        </p>
        <button
          onClick={onAddWidget}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Your First Widget
        </button>
      </div>
    </div>
  );
}


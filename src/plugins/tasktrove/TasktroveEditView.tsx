import { PluginComponentProps } from '@/types/plugin';
import { TasktroveConfig } from './types';
import { TasktroveConfigModal } from './TasktroveConfigModal';

export function TasktroveEditView({ config, onConfigChange, isEditing, onExitEditMode }: PluginComponentProps) {
  const tasktroveConfig = (config as unknown as TasktroveConfig) || {
    apiEndpoint: '',
    apiToken: '',
  };

  // Show modal when in edit mode
  if (!isEditing) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-sm text-muted-foreground">Click the gear icon to configure</p>
      </div>
    );
  }

  const handleSave = (newConfig: TasktroveConfig) => {
    onConfigChange(newConfig as unknown as Record<string, unknown>);
    onExitEditMode();
  };

  const handleClose = () => {
    onExitEditMode();
  };

  return (
    <TasktroveConfigModal
      config={tasktroveConfig}
      onSave={handleSave}
      onClose={handleClose}
    />
  );
}


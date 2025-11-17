import { useState, useEffect } from 'react';
import { PluginComponentProps } from '@/types/plugin';
import { TasktroveConfig } from './types';
import { TasktroveConfigModal } from './TasktroveConfigModal';

export function TasktroveEditView({ config, onConfigChange, isEditing }: PluginComponentProps) {
  const tasktroveConfig = (config as unknown as TasktroveConfig) || {
    apiEndpoint: '',
    apiToken: '',
  };

  const [showModal, setShowModal] = useState(false);

  // Open modal when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setShowModal(true);
    }
  }, [isEditing]);

  const handleSave = (newConfig: TasktroveConfig) => {
    onConfigChange(newConfig as unknown as Record<string, unknown>);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-sm text-muted-foreground">Click the gear icon to configure</p>
      </div>
    );
  }

  return (
    <TasktroveConfigModal
      config={tasktroveConfig}
      onSave={handleSave}
      onClose={handleClose}
    />
  );
}


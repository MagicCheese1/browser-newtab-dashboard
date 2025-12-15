import { useState, useEffect } from 'react';
import { PluginComponentProps } from '@/types/plugin';
import { YoutrackConfig } from './types';
import { YoutrackConfigModal } from './YoutrackConfigModal';

const DEFAULT_ISSUE_FIELDS = 'id,idReadable,created,updated,resolved,reporter(email),updater(email),commentsCount,tags(name),customFields($type,id,projectCustomField($type,id,field($type,id,name)),value($type,name,minutes,presentation)),summary,description';
const DEFAULT_QUERY = '#Unresolved';

export function YoutrackEditView({ config, onConfigChange, isEditing, onExitEditMode }: PluginComponentProps) {
  const youtrackConfig = (config as unknown as YoutrackConfig) || {
    baseUrl: '',
    apiEndpoint: '',
    authorizationHeader: '',
    issueFields: DEFAULT_ISSUE_FIELDS,
    query: DEFAULT_QUERY,
  };

  const [showModal, setShowModal] = useState(false);

  // Open modal when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setShowModal(true);
    }
  }, [isEditing]);

  const handleSave = (newConfig: YoutrackConfig) => {
    onConfigChange(newConfig as unknown as Record<string, unknown>);
    setShowModal(false);
    onExitEditMode();
  };

  const handleClose = () => {
    setShowModal(false);
    onExitEditMode();
  };

  if (!showModal) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-sm text-muted-foreground">Click the gear icon to configure</p>
      </div>
    );
  }

  return (
    <YoutrackConfigModal
      config={youtrackConfig}
      onSave={handleSave}
      onClose={handleClose}
    />
  );
}


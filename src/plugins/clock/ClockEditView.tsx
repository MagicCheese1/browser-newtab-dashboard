import { useEffect, useState } from 'react';

import { ClockConfig } from './types';
import { ClockConfigModal } from './ClockConfigModal';
import { PluginComponentProps } from '@/types/plugin';

export function ClockEditView({ config, onConfigChange, isEditing, onExitEditMode }: PluginComponentProps) {
  const clockConfig = (config as unknown as ClockConfig) || {
    theme: 'digital-simple',
    showDate: true,
    format: '24h',
    showSunrise: false,
    showSunset: false,
  };

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setShowModal(true);
    }
  }, [isEditing]);

  const handleSave = (newConfig: ClockConfig) => {
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
      <div className="flex items-center justify-center h-full p-4 text-sm text-muted-foreground">
        Click the gear icon to configure the clock widget.
      </div>
    );
  }

  return <ClockConfigModal config={clockConfig} onSave={handleSave} onClose={handleClose} />;
}


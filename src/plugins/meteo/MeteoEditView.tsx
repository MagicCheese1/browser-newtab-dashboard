import { useEffect, useState } from 'react';
import { PluginComponentProps } from '@/types/plugin';
import { MeteoConfig } from './types';
import { MeteoConfigModal } from './MeteoConfigModal';

export function MeteoEditView({ config, onConfigChange, isEditing }: PluginComponentProps) {
  const meteoConfig = (config as unknown as MeteoConfig) || {
    provider: 'openweather',
    apiKey: '',
  };

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setShowModal(true);
    }
  }, [isEditing]);

  const handleSave = (newConfig: MeteoConfig) => {
    onConfigChange(newConfig as unknown as Record<string, unknown>);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-sm text-muted-foreground">
        Click the gear icon to configure the weather widget.
      </div>
    );
  }

  return <MeteoConfigModal config={meteoConfig} onSave={handleSave} onClose={handleClose} />;
}


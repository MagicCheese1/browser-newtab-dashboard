import { pluginRegistry } from '@/lib/plugin-registry';
import { X } from 'lucide-react';

interface PluginSelectorProps {
  onSelect: (pluginId: string) => void;
  onClose: () => void;
}

export function PluginSelector({ onSelect, onClose }: PluginSelectorProps) {
  const plugins = pluginRegistry.getAllPlugins();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Choose a Widget</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plugins.map((plugin) => (
            <button
              key={plugin.metadata.id}
              onClick={() => onSelect(plugin.metadata.id)}
              className="flex flex-col items-start gap-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-colors text-left"
            >
              <div className="flex items-center gap-3 w-full">
                {plugin.IconComponent ? (
                  <plugin.IconComponent className="w-8 h-8 text-foreground" />
                ) : (
                  <div className="text-3xl">{plugin.metadata.icon}</div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{plugin.metadata.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plugin.metadata.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


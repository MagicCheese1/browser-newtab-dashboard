import { Settings, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { FrameData } from '@/lib/storage';
import { pluginRegistry } from '@/lib/plugin-registry';

interface FrameProps {
  frame: FrameData;
  onDelete: (frameId: string) => void;
  onConfigChange: (frameId: string, config: Record<string, unknown>) => void;
  onNameChange: (frameId: string, name: string) => void;
}

export function Frame({ frame, onDelete, onConfigChange, onNameChange }: FrameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [frameName, setFrameName] = useState(frame.name || '');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const plugin = pluginRegistry.getPlugin(frame.pluginId);

  // Update frameName when frame.name changes externally
  useEffect(() => {
    setFrameName(frame.name || '');
  }, [frame.name]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  if (!plugin) {
    return (
      <div className="w-full h-full bg-card border border-border rounded-lg p-4">
        <p className="text-muted-foreground">Plugin not found: {frame.pluginId}</p>
      </div>
    );
  }

  const handleConfigChange = (config: Record<string, unknown>) => {
    onConfigChange(frame.id, config);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(!isEditing);
    // Enable name editing when clicking the gear icon
    setIsEditingName(true);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
    onNameChange(frame.id, frameName);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setFrameName(frame.name || '');
      setIsEditingName(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(frame.id);
  };

  const ViewComponent = isEditing ? plugin.EditView : plugin.DashboardView;

  return (
    <div
      className="w-full h-full bg-card border border-border rounded-lg overflow-hidden relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="drag-handle flex items-center justify-between p-2 border-b border-border bg-muted/50">
        {isEditingName ? (
          <div className="flex items-center gap-2 flex-1">
            {plugin.IconComponent && (
              <plugin.IconComponent className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
            <input
              ref={nameInputRef}
              type="text"
              value={frameName}
              onChange={(e) => setFrameName(e.target.value)}
              onBlur={handleNameBlur}
              onKeyDown={handleNameKeyDown}
              className="text-sm font-semibold flex-1 bg-background border border-input rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={plugin.metadata.name}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {plugin.IconComponent && (
              <plugin.IconComponent className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
            <h3
              className="text-sm font-semibold truncate flex-1"
              title={frame.name || plugin.metadata.name}
            >
              {frame.name || plugin.metadata.name}
            </h3>
          </div>
        )}
        <div className="flex items-center gap-1" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={handleEditClick}
            onMouseDown={(e) => e.stopPropagation()}
            className={`p-1 rounded hover:bg-accent transition-colors ${
              isHovered || isEditing ? 'opacity-100' : 'opacity-0'
            }`}
            title={isEditing ? 'View mode' : 'Edit mode'}
            type="button"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteClick}
            onMouseDown={(e) => e.stopPropagation()}
            className={`p-1 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            title="Delete widget"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div 
        className="flex-1 overflow-hidden min-h-0"
        style={{ 
          height: 'calc(100% - 40px)',
          position: 'relative'
        }}
        onMouseDown={(e) => {
          // Prevent drag when clicking on interactive elements
          const target = e.target as HTMLElement;
          if (target.tagName === 'BUTTON' || 
              target.tagName === 'INPUT' || 
              target.tagName === 'A' ||
              target.closest('button') ||
              target.closest('input') ||
              target.closest('a')) {
            e.stopPropagation();
          }
        }}
      >
        <ViewComponent
          config={frame.config}
          isEditing={isEditing}
          onConfigChange={handleConfigChange}
        />
      </div>
    </div>
  );
}


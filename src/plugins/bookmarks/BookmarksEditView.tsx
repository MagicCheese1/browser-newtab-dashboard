import { useState, useEffect } from 'react';
import { PluginComponentProps } from '@/types/plugin';
import { BookmarksConfig, Bookmark } from './types';
import { X, Plus } from 'lucide-react';
import { BookmarkEditModal } from './BookmarkEditModal';

export function BookmarksEditView({ config, onConfigChange, isEditing }: PluginComponentProps) {
  const bookmarksConfig = (config as unknown as BookmarksConfig) || { bookmarks: [] };
  const bookmarks = bookmarksConfig.bookmarks || [];
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Automatically open the add modal when entering edit mode with no bookmarks
  useEffect(() => {
    if (isEditing && bookmarks.length === 0 && !isAdding && !editingBookmark) {
      setIsAdding(true);
    }
  }, [isEditing, bookmarks.length, isAdding, editingBookmark]);

  const handleDelete = (id: string) => {
    const newBookmarks = bookmarks.filter((b) => b.id !== id);
    onConfigChange({ ...bookmarksConfig, bookmarks: newBookmarks });
  };

  const handleSave = (bookmark: Bookmark) => {
    if (editingBookmark) {
      const newBookmarks = bookmarks.map((b) =>
        b.id === bookmark.id ? bookmark : b
      );
      onConfigChange({ ...bookmarksConfig, bookmarks: newBookmarks });
      setEditingBookmark(null);
    } else {
      const newBookmarks = [...bookmarks, bookmark];
      onConfigChange({ ...bookmarksConfig, bookmarks: newBookmarks });
      setIsAdding(false);
    }
  };

  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
  };

  return (
    <div className="p-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="relative group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <button
              onClick={() => handleDelete(bookmark.id)}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <X className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleEdit(bookmark)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border"
            >
              {bookmark.icon ? (
                <img
                  src={bookmark.icon}
                  alt={bookmark.title}
                  className="w-7 h-7 object-contain icon-svg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                className="w-7 h-7 flex items-center justify-center text-lg"
                style={{ display: bookmark.icon ? 'none' : 'flex' }}
              >
                {bookmark.title && bookmark.title.length > 0 ? bookmark.title.charAt(0).toUpperCase() : '?'}
              </div>
            </button>
            <span className="text-xs font-medium text-center w-full leading-tight px-1 line-clamp-2 break-words">
              {bookmark.title}
            </span>
          </div>
        ))}
        <button
          onClick={() => setIsAdding(true)}
          className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors min-h-[80px]"
        >
          <Plus className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Add Bookmark</span>
        </button>
      </div>

      {(editingBookmark || isAdding) && (
        <BookmarkEditModal
          bookmark={editingBookmark || undefined}
          onSave={handleSave}
          onClose={() => {
            setEditingBookmark(null);
            setIsAdding(false);
          }}
          focusUrl={isAdding}
        />
      )}
    </div>
  );
}


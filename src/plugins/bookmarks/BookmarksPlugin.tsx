import { Plugin } from '@/types/plugin';
import { BookmarksDashboardView } from './BookmarksDashboardView';
import { BookmarksEditView } from './BookmarksEditView';
import { Bookmark } from 'lucide-react';

export const BookmarksPlugin: Plugin = {
  metadata: {
    id: 'bookmarks',
    name: 'Bookmarks',
    description: 'Manage and access your favorite bookmarks',
    icon: 'bookmark',
    version: '1.0.0',
  },
  DashboardView: BookmarksDashboardView,
  EditView: BookmarksEditView,
  IconComponent: Bookmark,
};


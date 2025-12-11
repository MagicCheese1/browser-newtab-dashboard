import { Bookmark } from 'lucide-react';
import { BookmarksDashboardView } from './BookmarksDashboardView';
import { BookmarksEditView } from './BookmarksEditView';
import { Plugin } from '@/types/plugin';

export const BookmarksPlugin: Plugin = {
  metadata: {
    id: 'bookmarks',
    name: 'Bookmarks',
    description: 'Manage and access your favorite bookmarks',
    icon: 'bookmark',
    version: '1.0.3',
  },
  DashboardView: BookmarksDashboardView,
  EditView: BookmarksEditView,
  IconComponent: Bookmark,
};


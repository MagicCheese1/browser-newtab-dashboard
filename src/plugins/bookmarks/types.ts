export interface Bookmark {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface BookmarksConfig {
  bookmarks: Bookmark[];
}


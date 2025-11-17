import { Plugin } from '@/types/plugin';
import { TasktroveDashboardView } from './TasktroveDashboardView';
import { TasktroveEditView } from './TasktroveEditView';
import { CheckSquare2 } from 'lucide-react';

export const TasktrovePlugin: Plugin = {
  metadata: {
    id: 'tasktrove',
    name: 'Tasktrove',
    description: 'View and manage Tasktrove tasks',
    icon: 'tasktrove',
    version: '1.0.0',
  },
  DashboardView: TasktroveDashboardView,
  EditView: TasktroveEditView,
  IconComponent: CheckSquare2,
};


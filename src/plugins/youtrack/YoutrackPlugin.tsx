import { ListTodo } from 'lucide-react';
import { Plugin } from '@/types/plugin';
import { YoutrackDashboardView } from './YoutrackDashboardView';
import { YoutrackEditView } from './YoutrackEditView';

export const YoutrackPlugin: Plugin = {
  metadata: {
    id: 'youtrack',
    name: 'Youtrack',
    description: 'View and manage Youtrack issues',
    icon: 'youtrack',
    version: '1.0.3',
  },
  DashboardView: YoutrackDashboardView,
  EditView: YoutrackEditView,
  IconComponent: ListTodo,
};


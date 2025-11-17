import { Plugin } from '@/types/plugin';
import { YoutrackDashboardView } from './YoutrackDashboardView';
import { YoutrackEditView } from './YoutrackEditView';
import { ListTodo } from 'lucide-react';

export const YoutrackPlugin: Plugin = {
  metadata: {
    id: 'youtrack',
    name: 'Youtrack',
    description: 'View and manage Youtrack issues',
    icon: 'youtrack',
    version: '1.0.0',
  },
  DashboardView: YoutrackDashboardView,
  EditView: YoutrackEditView,
  IconComponent: ListTodo,
};


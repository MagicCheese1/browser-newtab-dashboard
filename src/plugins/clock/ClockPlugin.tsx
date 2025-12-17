import { Clock } from 'lucide-react';
import { ClockDashboardView } from './ClockDashboardView';
import { ClockEditView } from './ClockEditView';
import { Plugin } from '@/types/plugin';

export const ClockPlugin: Plugin = {
  metadata: {
    id: 'clock',
    name: 'Clock',
    description: 'Display current time with multiple themes and timezone support',
    icon: 'clock',
    version: '1.0.0',
  },
  DashboardView: ClockDashboardView,
  EditView: ClockEditView,
  IconComponent: Clock,
};




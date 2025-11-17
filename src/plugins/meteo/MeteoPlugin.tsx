import { Plugin } from '@/types/plugin';
import { MeteoDashboardView } from './MeteoDashboardView';
import { MeteoEditView } from './MeteoEditView';
import { CloudSun } from 'lucide-react';

export const MeteoPlugin: Plugin = {
  metadata: {
    id: 'meteo',
    name: 'Weather',
    description: 'Display current weather and forecast',
    icon: 'weather',
    version: '1.0.0',
  },
  DashboardView: MeteoDashboardView,
  EditView: MeteoEditView,
  IconComponent: CloudSun,
};


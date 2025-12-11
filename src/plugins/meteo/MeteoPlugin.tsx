import { CloudSun } from 'lucide-react';
import { MeteoDashboardView } from './MeteoDashboardView';
import { MeteoEditView } from './MeteoEditView';
import { Plugin } from '@/types/plugin';

export const MeteoPlugin: Plugin = {
  metadata: {
    id: 'meteo',
    name: 'Weather',
    description: 'Display current weather and forecast',
    icon: 'weather',
    version: '1.0.3',
  },
  DashboardView: MeteoDashboardView,
  EditView: MeteoEditView,
  IconComponent: CloudSun,
};


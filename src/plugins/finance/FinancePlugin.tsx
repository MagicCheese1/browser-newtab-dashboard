import { DollarSign } from 'lucide-react';
import { FinanceDashboardView } from './FinanceDashboardView';
import { FinanceEditView } from './FinanceEditView';
import { Plugin } from '@/types/plugin';

export const FinancePlugin: Plugin = {
  metadata: {
    id: 'finance',
    name: 'Firefly',
    description: 'View financial summary and net worth',
    icon: 'finance',
    version: '1.0.3',
  },
  DashboardView: FinanceDashboardView,
  EditView: FinanceEditView,
  IconComponent: DollarSign,
};


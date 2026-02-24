import { getAsyncLifecycle, defineConfigSchema } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

export const moduleName = '@openmrs/esm-template-app';

const options = {
  featureName: 'root-world',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const patientChartReminders = getAsyncLifecycle(
  () => import('./reminders/patient-chart/toaster-dashboard'),
  options,
);

export const patientBannerReminders = getAsyncLifecycle(
  () => import('./reminders/patient-banner/banner-reminders'),
  options,
);

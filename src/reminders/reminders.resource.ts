import { openmrsFetch } from '@openmrs/esm-framework';
import { getEtlBaseUrl } from '../utils/get-base-url';
import { type PatientReminder, type ClinicalRemindersResp } from './types';

export const getPatientClinicalReminders = async (
  patientUuid: string,
  reminderDate: string,
): Promise<PatientReminder[]> => {
  const etlBaseUrl = await getEtlBaseUrl();
  const remindersUrl = `${etlBaseUrl}/patient/${patientUuid}/hiv-clinical-reminder/${reminderDate}`;
  const resp = await openmrsFetch<ClinicalRemindersResp>(remindersUrl);
  const result: ClinicalRemindersResp = await resp.json();
  const reminders = result?.result?.reminders ?? [];
  return reminders;
};

export type ReminderType = 'danger' | 'info' | 'warning';

export type PatientReminder = {
  message: string;
  title: string;
  type: ReminderType;
  display: {
    banner: boolean;
    toast: boolean;
  };
};

export type ClinicalRemindersResp = {
  schemas: any;
  sqlQuery: string;
  results: any[];
  result: {
    person_id: number;
    person_uuid: string;
    reminders: PatientReminder[];
  };
};

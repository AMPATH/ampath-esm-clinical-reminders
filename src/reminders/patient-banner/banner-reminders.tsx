import React, { useEffect, useState } from 'react';
import { showSnackbar, usePatient } from '@openmrs/esm-framework';
import { type PatientReminder } from '../types';
import { getPatientClinicalReminders } from '../reminders.resource';
import styles from './banner-reminders.scss';
import { InlineNotification } from '@carbon/react';
import BannerAlert from '../../shared/ui/banner-alert/banner-alert';

interface BannerReminderProps {}
const BannerReminders: React.FC<BannerReminderProps> = () => {
  const { patientUuid, error, isLoading } = usePatient();
  const [reminders, setReminders] = useState<PatientReminder[]>([]);

  useEffect(() => {
    if (patientUuid && patientUuid.length > 0) {
      getPatientReminders();
    }
  }, [patientUuid]);

  if (!patientUuid) {
    return;
  }

  const getPatientReminders = async () => {
    const today = new Date().toLocaleDateString('en-CA');
    try {
      const reminders = await getPatientClinicalReminders(patientUuid, today);
      if (reminders) {
        setReminders(reminders);
      } else {
        setReminders([]);
      }
    } catch (error) {
      showSnackbar({
        kind: 'error',
        title: 'Error Getting Reminders',
        subtitle: 'An error occurred while fetching patient reminders',
      });
    }
  };
  return (
    <>
      {reminders && reminders.length > 0 ? (
        <>
          <div className={styles.bannerContainer}>
            {reminders.map((r) => {
              return (
                <div className={styles.notification}>
                  <BannerAlert message={r.message} type={r.type} title={r.title} />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default BannerReminders;

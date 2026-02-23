import React, { useEffect, useRef, useState } from 'react';
import styles from './toaster-dashboard.scss';
import Toaster from '../../shared/ui/toaster/toaster.component';
import { showSnackbar, usePatient } from '@openmrs/esm-framework';
import { getPatientClinicalReminders } from '../reminders.resource';
import { type PatientReminder } from '../types';
interface ToasterDashboardProps {}
const ToasterDashboard: React.FC<ToasterDashboardProps> = () => {
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
          <div className={styles.toasterContainer}>
            {reminders.map((r) => {
              return <Toaster title={r.title} content={r.message} type={r.type} />;
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ToasterDashboard;

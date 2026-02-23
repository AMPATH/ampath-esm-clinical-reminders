import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './root.scss';
import ToasterDashboard from './reminders/patient-chart/toaster-dashboard';

const Root: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h3 className={styles.welcome}>{t('welcomeText', 'Welcome to the O3 Clinical reminders app')}</h3>
      <ToasterDashboard />
    </>
  );
};

export default Root;

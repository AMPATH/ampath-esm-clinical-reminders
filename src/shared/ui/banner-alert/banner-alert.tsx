import React, { useState } from 'react';
import styles from './banner-alert.scss';
import { type ToasterType } from '../../types';
import { Button } from '@carbon/react';
interface BannerAlertProps {
  message: string;
  type: ToasterType;
  title: string;
}
const BannerAlert: React.FC<BannerAlertProps> = ({ message, type, title }) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const handleHideAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      {showAlert ? (
        <>
          <div className={styles[type]}>
            <div className={styles.bannerAlert}>
              <div className={styles.bannerContent}>
                <div className={styles.titleSection}>
                  <b>{title}:</b>
                </div>
                <div className={styles.messageSection}>{message}</div>
                <div className={styles.closeBtn}>
                  <span onClick={handleHideAlert}>x</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default BannerAlert;

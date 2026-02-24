import React, { useEffect, useRef, useState } from 'react';
import styles from './toaster.component.scss';
import { type ToasterType } from '../../types';
interface ToasterProps {
  title: string;
  content: string;
  type: ToasterType;
}
const Toaster: React.FC<ToasterProps> = ({ title, content, type }) => {
  const [displayToaster, setDisplayToaster] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => hideToaster(), 10000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [title]);
  const hideToaster = () => {
    setDisplayToaster(false);
  };

  return (
    <>
      {displayToaster ? (
        <>
          <div className={styles[type]}>
            <div className={styles.toasterLayout}>
              <div className={styles.headerSection}>
                <div className={styles.headerTitle}>
                  <h5>
                    <b>{title}</b>
                  </h5>
                </div>
                <div className={styles.headerAction}></div>
              </div>
              <div className={styles.headerContent}>
                <p>{content}</p>
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
export default Toaster;

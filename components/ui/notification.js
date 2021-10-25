import { useContext } from 'react';

import classes from './notification.module.css';
import NotificationContext from '../../store/notification-context';

function Notification() {
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = '';

  if (notificationCtx.notification.status === 'success') {
    statusClasses = classes.success;
  }

  if (notificationCtx.notification.status === 'error') {
    statusClasses = classes.error;
  }

  if (notificationCtx.notification.status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  // setTimeout(() => {
  //   notificationCtx.hideNotification();
  // }, 3000);

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{notificationCtx.notification.title}</h2>
      <p>{notificationCtx.notification.message}</p>
    </div>
  );
}

export default Notification;

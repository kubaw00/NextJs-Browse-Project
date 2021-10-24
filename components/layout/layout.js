import MainHeader from './main-header';
import Notification from '../ui/notification';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification title="test" message="this is a test" status="pending" />
      )}
    </>
  );
}

export default Layout;

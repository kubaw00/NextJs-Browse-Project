import { createContext, useState } from 'react';

const NotificationContext = createContext({
  noification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  function showNotificationHandler(dataNotification) {
    setActiveNotification(dataNotification);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

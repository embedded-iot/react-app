import React, { useEffect, useState } from 'react';
import { AdminNotificationsService } from 'services';
import NotificationsBox from 'components/Share/NotificationsBox';

export default function NotificationsList({ isExplain = true, redirectTo = () => {}, noData = '' }) {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = (params = {}) => {
    AdminNotificationsService.getNotifications({}, response => {
      setNotifications(AdminNotificationsService.getActivatedNotifications(response.items))
    }, () => {})
  }

  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line
  }, []);
  return (
    notifications.length ? <NotificationsBox items={notifications} isExplain={isExplain} redirectTo={redirectTo}/> : noData
  )
}

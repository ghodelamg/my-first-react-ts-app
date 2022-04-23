import { useLayoutEffect }  from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { selectAllUsers } from '../user/usersSlice'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import classnames from 'classnames'
import {
  selectAllNotifications,
  allNotificationsRead
} from './notificationsSlice'
import styles from './Notifications.module.css';

const NotificationsList = () => {
const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectAllNotifications)
  const users = useAppSelector(selectAllUsers)

 /* Dispatching the action to mark all notifications as read. */
//  useLayoutEffect callback will run after that first render and dispatch allNotificationsRead
  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }

    const notificationClassname = classnames('notification', {
      [styles.new]: notification.isNew
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationsList;
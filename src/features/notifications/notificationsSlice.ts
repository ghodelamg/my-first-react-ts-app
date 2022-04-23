import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { RootState } from '../../app/store'


export interface InitialState {
  id?: string;
  date: any;
  message: string;
  user: string;
  read: boolean
  isNew :boolean
}

export const fetchNotifications = createAsyncThunk<InitialState[], undefined, {state: RootState}>(
  'notifications/fetchNotifications',
  async (_, { getState }): Promise<any> => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification]: any = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [] as InitialState[],
  reducers: {
    allNotificationsRead(state) {
      state.forEach(notification => {
        notification.read = true
      })
    }
  },
 extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      state.forEach(notification => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  }
})

export default notificationsSlice.reducer

export const selectAllNotifications = (state: RootState) => state.notifications
export const { allNotificationsRead } = notificationsSlice.actions
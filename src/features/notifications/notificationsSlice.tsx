import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { RootState } from '../../app/store'


export interface InitialState {
  id?: string;
  date: any;
  message: string;
  user: string;
}

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }): Promise<any> => {
    const allNotifications = selectAllNotifications(getState() as RootState)
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
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled.type]: (state, action: PayloadAction<InitialState[]>) => {
      state.push(...action.payload)
      // Sort with newest first
      state.sort((a:any, b:any) => b.date.localeCompare(a.date))
    }
  }
})

export default notificationsSlice.reducer

export const selectAllNotifications = (state: RootState) => state.notifications
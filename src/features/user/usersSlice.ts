import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { RootState } from '../../app/store'

export interface IUser {
  firstName: string
  id: string
  lastName: string
  name: string
  username: string
}
const usersAdapter = createEntityAdapter<IUser>();

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
   builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users)
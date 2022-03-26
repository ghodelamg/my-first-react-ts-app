import { createSlice } from '@reduxjs/toolkit'
interface PostSlice {
  id: string;
  title: string;
  content: string;
}
const initialState: PostSlice[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}
})

export default postsSlice.reducer
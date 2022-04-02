import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
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
  reducers: {
     postAdded: {
      reducer(state, action: PayloadAction<{ title: string, content: string, id: string }>) {
        state.push(action.payload)
      },
      prepare(title, content) { //https://redux.js.org/tutorials/essentials/part-4-using-data#preparing-action-payloads
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
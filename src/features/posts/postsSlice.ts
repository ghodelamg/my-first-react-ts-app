import { RootState } from './../../app/store';
import { createSlice, createAsyncThunk, PayloadAction, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { IUser } from '../user/usersSlice';
export interface PostSlice {
  id?: string;
  title: string;
  content: string;
  user?: string;
  userId: string;
  date?: string;
  reactions?: {
      thumbsUp: number;
      hooray: number;
      heart: number;
      rocket: number;
      eyes: number;
    },
}

export interface ReactionPayload {
  postId: string;
  reaction: string;
}

export interface IInitialState {
    posts: PostSlice[],
    status: string,
    error: any,
}

// const initialState: IInitialState = {
//     posts: [],
//     status: 'idle',
//     error: null,
// }


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: PostSlice) => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  }
)

const postsAdapter = createEntityAdapter<PostSlice>({
  sortComparer: (a: any, b: any) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action: PayloadAction<ReactionPayload>) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId];
      if (existingPost && existingPost.reactions) {
        existingPost.reactions[reaction as keyof PostSlice['reactions']]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
    extraReducers(builder) {
    // omit other reducers

    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as any
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  }
})

export const { postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)
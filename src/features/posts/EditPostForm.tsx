import  { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import { postUpdated } from './postsSlice'

const EditPostForm = () => {
  const {postId} = useParams();

  const post = useAppSelector(state => state.posts.find((post: { id: any; }) => post.id == postId))
  const [title, setTitle] = useState((post as any).title)
  const [content, setContent] = useState((post as any).content)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onTitleChanged = (e: { target: { value: any; }; }) => setTitle(e.target.value)
  const onContentChanged = (e: { target: { value: any; }; }) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      navigate(`/posts/${postId}`);
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}

export default EditPostForm;
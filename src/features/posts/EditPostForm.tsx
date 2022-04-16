import  { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PostSlice, postUpdated, selectPostById } from './postsSlice'

const EditPostForm = () => {
  const {postId} = useParams();

  const post = useAppSelector((state) => selectPostById(state, postId as string))
  const [title, setTitle] = useState((post as PostSlice).title)
  const [content, setContent] = useState((post as PostSlice).content)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onTitleChanged = (e: { target: { value: string; }; }) => setTitle(e.target.value)
  const onContentChanged = (e: { target: { value: string; }; }) => setContent(e.target.value)

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
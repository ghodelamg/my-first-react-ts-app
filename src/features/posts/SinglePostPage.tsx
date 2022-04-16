
import { useAppSelector } from '../../app/hooks'
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom'
import { selectPostById } from './postsSlice';

const SinglePostPage = () => {
  const {postId} = useParams();
  const post = useAppSelector((state) => selectPostById(state, postId as string))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
      <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
        <br/>
      <Link to={'/posts'} className="button muted-button">
        View all posts
      </Link>
    </section>
  )
}
export default SinglePostPage;
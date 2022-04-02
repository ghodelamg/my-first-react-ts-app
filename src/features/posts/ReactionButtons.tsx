import { PostSlice } from './postsSlice'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }: {post: PostSlice}) => {
    const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" className="muted-button reaction-button" onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }>
        {emoji} {post.reactions[name as keyof PostSlice['reactions']]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
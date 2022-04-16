import { PostSlice } from './postsSlice'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'
import Button from '@mui/material/Button'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }: {post: PostSlice}) => {
    const dispatch = useDispatch()
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji], index) => {
    return (
        // <Stack key={name} direction="row" spacing={0} >
            <Button key={index} onClick={() =>
                dispatch(reactionAdded({ postId: post.id as string, reaction: name }))
                } variant="outlined">{emoji} {post.reactions ? post.reactions[name as keyof PostSlice['reactions']] : ''}</Button>   
        // </Stack>
    )
  })

  return <div>{reactionButtons}</div>
}
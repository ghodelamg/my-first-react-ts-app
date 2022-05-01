import { useAppSelector } from '../../app/hooks'
import { selectUserById } from '../user/usersSlice'

export const PostAuthor = ({ userId }: {userId: string}) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
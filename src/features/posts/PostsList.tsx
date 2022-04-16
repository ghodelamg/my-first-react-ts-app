import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AddPostForm } from './AddPostForm'
import { useNavigate } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CardActionArea from '@mui/material/CardActionArea'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { fetchPosts, selectAllPosts } from './postsSlice'
import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector((state) => state.posts.status)
  const error = useAppSelector((state) => state.posts.error)
  const dispatch = useAppDispatch()
    const navigate = useNavigate();
 const theme = createTheme();
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
 const orderedPosts = posts
      .slice()
      .sort((a, b) => (b.date as string).localeCompare(a.date as string))
  const RenderedPosts = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={4}>
            { orderedPosts.map(post  => (
               <Grid item xs={12} md={6} key={post.id} >
                <CardActionArea component="a">
                  <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography component="h2" variant="h5">
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        <PostAuthor userId={post.user as unknown as string} />
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        <TimeAgo timestamp={post.date as string} />
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        <span className="post-content">{post.content.substring(0, 100)}</span>
                      </Typography>
                      <ReactionButtons post={post} />
                      <Grid sx={{ mt: 3 }} container justifyContent="flex-end" onClick={ () => navigate(`/posts/${post.id}`)}>
                        <Grid item style={{ textDecoration: 'underline' }}>
                          View Post
                          {/* <Link to={`/posts/${post.id}`} className="button muted-button">
                            View Post
                          </Link> */}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
    )};

  let content;

  if (postStatus === 'loading') {
    content = <div><span><CircularProgress color="inherit" sx={{ mt: 2 }}/></span><span>Loading...</span></div>;
  } else if (postStatus === 'succeeded') {
    content = <RenderedPosts/>
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={4}>
              <AddPostForm></AddPostForm>
            </Grid>
            <Grid item xs={12} lg={8} sx={{ mt: 21 }}>
              { content}
            </Grid>
          </Grid>
        </main>
      </Container>
    </section>
  )
}

export default PostsList;
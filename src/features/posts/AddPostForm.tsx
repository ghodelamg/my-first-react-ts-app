import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postAdded } from './postsSlice'
import { useAppSelector } from '../../app/hooks'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import PostAddIcon from '@mui/icons-material/PostAdd';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useAppSelector(state => state.users)

  const onTitleChanged = (e: { target: { value: React.SetStateAction<string> } }) => setTitle(e.target.value)
  const onContentChanged = (e: { target: { value: React.SetStateAction<string> } }) => setContent(e.target.value)
  const onAuthorChanged = (e: { target: { value: React.SetStateAction<string> } }) => setUserId(e.target.value)

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
   const theme = createTheme();

  const usersOptions = users.map(user => (
    <MenuItem  key={user.id} value={user.id}>
      {user.name}
    </MenuItem>
  ))

  return (
    <section>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add a New Post
          </Typography>
          <Box component="form" onSubmit={onSavePostClicked} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth sx={{ mb: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="postTitle"
                label="Post Title"
                name="postTitle"
                autoFocus
                value={title}
                onChange={onTitleChanged}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Post Author</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Post Author"
                value={userId} onChange={onAuthorChanged}
              >
               {usersOptions}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                name="content"
                label="Content"
                id="content"
                multiline
                rows={4}
                value={content}
                onChange={onContentChanged}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              disabled={!canSave}
            >
              Save Post
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </section>
  )
}
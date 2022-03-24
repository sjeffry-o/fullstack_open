import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import MessageField from './components/MessageField'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')

  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) 
    {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  if (user === null)
    return (
      <div>
        <LoginForm username={username} setUsername={setUsername}
                   password={password} setPassword={setPassword}
                   setErrorMessage={setErrorMessage}
                   setUser={setUser} setBlogs={setBlogs}
                   errorMessage={errorMessage}
                   />
      </div>
    )
  return (
    <div>
      <h2>blogs</h2>
      <MessageField infoMessage={infoMessage}/>
      <p>{user.name} logged in <button onClick={window.localStorage.removeItem('loggedBlogAppUser')}>log out</button></p> 
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={newBlogRef}>
        <NewBlog newBlogAuthor={newBlogAuthor} setNewBlogAuthor={setNewBlogAuthor}
                 newBlogTitle={newBlogTitle} setNewBlogTitle={setNewBlogTitle}
                 newBlogUrl={newBlogUrl} setNewBlogUrl={setNewBlogUrl}
                 token={user.token} setInfoMessage={setInfoMessage}
                 newBlogRef={newBlogRef}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App

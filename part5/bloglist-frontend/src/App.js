import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = props.username
    const password = props.password
    try {
      const user = await loginService.login({
        username, password,
      })
      props.setUser(user)
      props.setUsername('')
      props.setPassword('')
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      console.log('logged in with', props.username, props.password)
    } catch (exception) {
      props.setErrorMessage('Wrong credentials')
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h1>log in to app</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const NewBlog = (props) => {
  return (
    <div>
        <div>
          title:
            <input
            type="text"
            value={props.newBlogTitle}
            name="Title"
            onChange={({ target }) => props.setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={props.newBlogAuthor}
            name="Author"
            onChange={({ target }) => props.setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={props.newBlogUrl}
            name="URL"
            onChange={({ target }) => props.setNewBlogUrl(target.value)}
          />
        </div>
      <button onClick={() => {blogService.create({url:props.newBlogUrl,
                                           title:props.newBlogTitle,
                                           author:props.newBlogAuthor})}}>create</button>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')

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
                   />
      </div>
    )
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={window.localStorage.removeItem('loggedBlogAppUser')}>log out</button></p> 
      <h2>create new</h2>
      <NewBlog newBlogAuthor={newBlogAuthor} setNewBlogAuthor={setNewBlogAuthor}
               newBlogTitle={newBlogTitle} setNewBlogTitle={setNewBlogTitle}
               newBlogUrl={newBlogUrl} setNewBlogUrl={setNewBlogUrl}
               token={user.token}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App

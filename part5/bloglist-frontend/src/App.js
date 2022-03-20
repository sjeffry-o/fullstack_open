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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App

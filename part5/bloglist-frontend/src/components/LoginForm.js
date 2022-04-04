import loginService from '../services/login'
import blogsService from '../services/blogs'
import MessageField from '../components/MessageField'

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
      blogsService.setToken(user.token)
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
      <MessageField errorMessage={props.errorMessage}/>
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

export default LoginForm

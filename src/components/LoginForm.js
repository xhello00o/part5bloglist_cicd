import PropTypes from 'prop-types'

const LoginForm = ({ handlelogin,username,setUsername,password,setPassword }) => {
  return (
    <form onSubmit={handlelogin}>
      <div>
          Username:
        <input type='text'
          value={username}
          id ='username'
          name='Username'
          onChange={({ target }) => { setUsername(target.value) }}></input>
      </div>
      <div>
        Password:
        <input type='password'
          id='password'
          value={password}
          name='Username'
          onChange={({ target }) => { setPassword(target.value) }}></input>
      </div>
      <div>
        <button type='submit'>
            login
        </button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handlelogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm
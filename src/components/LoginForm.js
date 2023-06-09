const LoginForm = ({handlelogin,username,setUsername,password,setPassword})=>{
    return (
      <form onSubmit={handlelogin}>
        <div>
          Username:
          <input type='text'
            value={username}
            name='Username'
            onChange={({ target }) => { setUsername(target.value) }}></input>
        </div>
        <div>
        Password:
          <input type='password'
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

export default LoginForm
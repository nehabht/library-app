import {useState} from 'react'

const Auth = () => {

  const [isLogIn, setIsLogin] = useState(true)
  const [error, setError] = useState(null)

  const viewLogin = (status) =>{
    setError(null)
    setIsLogin(status)
  }


    return (
      <div className="auth-controller">
        <div className="auth-container-box">

          <div className="auth-options button-container">
            <button className='signup' onClick={()=> viewLogin(false)} style={{backgroundColor : !isLogIn ? '#ff7e67': '#ffd1dc'}} >
              Sign up
            </button>
            <button className="login" onClick={()=> viewLogin(true)} style={{backgroundColor : !isLogIn ? '#ffd1dc': '#ff7e67'}}>
              Login
            </button>
          </div>

          <form>
            <h2>
              {isLogIn ? 'Log In Here' : 'Sign Up Here' }
            </h2>
            {!isLogIn && (
              <>
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="lastname"/>
              </>
            )}
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            {!isLogIn && <input type="password" placeholder="confirm password"/>}
            <input type="submit" className="create"/>
            {error && <p>{error}</p>}

          </form>

          
        </div>
      </div>
    )
  }
  
  export default Auth
  
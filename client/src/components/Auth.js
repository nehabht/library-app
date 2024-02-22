import {useState} from 'react'
import { useCookies } from 'react-cookie';

const Auth = () => {
  
  const [cookies, setCookie, removeCookie] = useCookies(null) 

  const [isLogIn, setIsLogin] = useState(true)
  const [error, setError] = useState(null)

  const [name, setName]= useState(null)
  const [lastname, setLastname]= useState(null)
  const [email, setEmail]= useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword]  = useState(null)

  //console.log(cookies)

  //console.log(name,lastname,email,password,confirmPassword)

  const viewLogin = (status) =>{
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLogIn && password !== confirmPassword) {
      setError('Passwords are not matching')
      return
    }

    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: 'POST',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({name, lastname, email, password})
    }) 

    const data= await response.json()
    // console.log(data)
    if(data.details) {
      setError(data.detail)
    }else{
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }
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
                <input 
                type="text" 
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="lastname"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </>
            )}
            <input 
              type="email" 
              placeholder="email" 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogIn && <input 
              type="password" 
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
            }
            <input type="submit" className="create" onClick={(e) => handleSubmit(e,isLogIn ? 'login' : 'signup')}/>
            {error && <p>{error}</p>}

          </form>

          
        </div>
      </div>
    )
  }
  
  export default Auth
  
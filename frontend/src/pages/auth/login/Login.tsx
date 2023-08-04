import { useState } from "react"
import LoginLogo from "../../../assets/images/LoginLogo.svg";
import loginsplash from "../../../assets/images/loginsplash.svg";
import "./Login.scss"
import Input from "../../../components/ui-widgets/Input/Input";
import Button from "../../../components/ui-widgets/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../config/axiosInstance";
import useAuth from "../../../hooks/useAuth";
import { toast } from 'react-toastify';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth, setPersist, persist } = useAuth();
  const from = location.state?.from?.pathname || '/';
  const [loginForm, setLoginForm] = useState({
    name:"",
    password:"",
  })

  const togglePersist = () => {
    setPersist((prev: any) => !prev);
}
  
  const [togglePassword, setTogglePassword] = useState(false);

  const changePasswordVisibility = () => {
    setTogglePassword((prev) => !prev)
  }  
  const onHandleClick = (e: any) => {
    e.preventDefault();
    axiosPrivate.post('/auth', {
      user: loginForm.name,
      pwd: loginForm.password
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
  }).then((response: any) => {
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      toast('Login successfull', {
        type: 'success'
      });
      setAuth({ user: loginForm.name, pwd: loginForm.password, role, accessToken });
      setLoginForm({
        name:"",
        password:"",
      })
      localStorage.setItem('persist', JSON.stringify(persist))
      localStorage.setItem('lastLogin', JSON.stringify(new Date()))
      navigate(from, { replace: true });
    }).catch((err: any) => {
      toast('Please enter correct username and password', {
        type: 'error'
      });
    })
  }

  const onChangeHandler = (e: any) => {
    setLoginForm((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  
  return (
    <div className='authBg'>
      <div className="loginWrapper">
        <div className="loginCard">
          <img src={LoginLogo} alt={'logo'} className="authLogo" />
          <div className="loginWrapper_main">
            <div className="left">
              <img src={loginsplash} alt="" />
              <p>
               Unleash the power of seamless data integration with our cutting-edge import app
              </p>
              <div className="nav-dots">
              </div>
            </div>
            <div className="right">
              <div className="input_div">
                <h3>Login</h3>
                <Input
                  placeholder="Enter Username"
                  label="Username"
                  value={loginForm.name}
                  name="name"
                  onChange={onChangeHandler}
                  />
                <Input
                  placeholder="Enter password"
                  label="Password"
                  value={loginForm.password}
                  name="password"
                  showIcon
                  type={togglePassword ? 'text' : 'password'}
                  isVisiblePassword={togglePassword}
                  onIconClick={changePasswordVisibility}
                  onChange={onChangeHandler}
                />
                <div className="loginUtility">
                  <div>
                    <label htmlFor="remember" className="container" >Remember me
                      <input onChange={togglePersist}
                        checked={persist} type="checkbox" id="remember"/>
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <Button onClick={onHandleClick} title="Login" className="btn btn-primary" />
                <div className="creatAccount">
                  Not have an account? <Link to="/register"> Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
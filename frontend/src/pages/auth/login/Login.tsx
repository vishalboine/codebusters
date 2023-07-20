import { useState } from "react"
import LongLogo from "../../../assets/images/longLogo.png";
import image1 from "../../../assets/images/image1.png";
import { LOGO_ALT, Roles } from "../../../constants";
import "./Login.scss"
import Input from "../../../components/ui-widgets/Input/Input";
import Button from "../../../components/ui-widgets/Button/Button";
import { Link, useLocation } from "react-router-dom";
import { axiosPrivate } from "../../../config/axiosInstance";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [loginForm, setLoginForm] = useState({
    name:"",
    password:"",
  })
  
  const [togglePassword, setTogglePassword] = useState(false);

  const changePasswordVisibility = () => {
    setTogglePassword((prev) => !prev)
  }  
  const onHandleClick = (e: any) => {
    e.preventDefault();
    console.log(loginForm);
    axiosPrivate.post('/auth/signup', loginForm, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
  }).then((res: any) => {
      console.log(res);
    }).catch((err: any) => {
      console.log(err);
      
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
          <img src={LongLogo} alt={LOGO_ALT} className="authLogo" />
          <div className="loginWrapper_main">
            <div className="left">
              <img src={image1} alt="" />
            </div>
            <div className="right">

              <div className="input_div">
                <h2>Login Now</h2>
                <Input
                  placeholder="Enter Username"
                  label="Username"
                  value={loginForm.name}
                  name="username"
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
                <div>
                  <input type="checkbox" name="" id="" />
                  <span>Remember me</span>
                </div>
                <div className="fp">
                  {/* <input type="checkbox" name="forget_password" id="forget_password" */} 
                  <label htmlFor="forget_password">Forget password</label> 
                </div>
                <Button title="Login" className="btn btn-primary" />
                <div className="creatAccount">
                  Already have an account? <Link to="/register"> Sign up</Link>
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
import { useState } from "react"
import LongLogo from "../../../assets/images/longLogo.png";
import image1 from "../../../assets/images/image1.png";
import { LOGO_ALT } from "../../../constants";
import "./Login.scss"
import Input from "../../../components/ui-widgets/Input/Input";
import Button from "../../../components/ui-widgets/Button/Button";
import { Link, useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  const [togglePassword, setTogglePassword] = useState(false);

  const changePasswordVisibility = () => {
    setTogglePassword((prev) => !prev)
  }  
  return (
    <div className='authBg'>
      <div className="loginWrapper">
        <div className="loginCard">
          <img src={LongLogo} alt={LOGO_ALT} className="authLogo" />
          <div className="loginWrapper_main">
            <div className="left">
              <img src={image1} alt="" />
              <caption>
               Unleash the power of seamless data integration with our cutting-edge import app
              </caption>
              <div className="nav-dots">

              </div>
            </div>
            <div className="right">
              <div className="input_div">
                <h3>Login</h3>
                <Input
                  placeholder="Enter e-mail id"
                  label="E-mail"
                  />
                <Input
                  placeholder="Enter password"
                  label="Password"
                  showIcon
                  type={togglePassword ? 'text' : 'password'}
                  isVisiblePassword={togglePassword}
                  onIconClick={changePasswordVisibility}
                />
                <div className="loginUtility">
                  <div>
                    <label htmlFor="remember" className="container" >Remember me
                      <input type="checkbox" id="remember"/>
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <Link to="/forgetPassword">Forget password?</Link> 
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
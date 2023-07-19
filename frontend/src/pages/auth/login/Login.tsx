import { useState, useCallback } from "react"
import LongLogo from "../../../assets/images/longLogo.png";
import image1 from "../../../assets/images/image1.png";
import { LOGO_ALT } from "../../../constants";
import "./Login.scss"
import Input from "../../../components/ui-widgets/Input/Input";
import Button from "../../../components/ui-widgets/Button/Button";

type Props = {}

const Login = (props: Props) => {

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
            </div>
            <div className="right">

              <div className="input_div">
                <h2>Login Now</h2>
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
                <div className="fp">
                  {/* <input type="checkbox" name="forget_password" id="forget_password" */} 
                  <label htmlFor="forget_password">Forget password</label> 
                </div>
                <Button title="Login" className="btn btn-primary" />
                <div className="creatAccount">
                  Already have an account? <a href="#"> Sign up</a>
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
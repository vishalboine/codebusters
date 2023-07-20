import { useState } from "react"
import LongLogo from "../../../assets/images/longLogo.png";
import image1 from "../../../assets/images/image1.png";
import { LOGO_ALT, Roles } from "../../../constants";
import "./Register.scss"
import Input from "../../../components/ui-widgets/Input/Input";
import Button from "../../../components/ui-widgets/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../config/axiosInstance";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    name:"",
    email:"",
    password:"",
    role: Roles.User
  })
  
  const [togglePassword, setTogglePassword] = useState(false);

  const changePasswordVisibility = () => {
    setTogglePassword((prev) => !prev)
  } 

  const onHandleClick = (e: any) => {
    e.preventDefault();
    console.log(registerForm);
    axiosPrivate.post('/auth/signup', registerForm, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
  }).then((res: any) => {
      console.log(res);
    }).catch((err: any) => {
      console.log(err);
      
    })
  }
  
  const onChangeHandler = (e: any) => {
    setRegisterForm((prev) => {
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
                <h2>Register Now</h2>
                <Input
                  placeholder="Enter Username"
                  label="Username"
                  value={registerForm.name}
                  name="username"
                  onChange={onChangeHandler}
                  />
                <Input
                  placeholder="Enter e-mail id"
                  label="E-mail"
                  value={registerForm.email}
                  name="email"
                  onChange={onChangeHandler}
                  />
                <Input
                  placeholder="Enter password"
                  label="Password"
                  value={registerForm.password}
                  name="password"
                  showIcon
                  type={togglePassword ? 'text' : 'password'}
                  isVisiblePassword={togglePassword}
                  onIconClick={changePasswordVisibility}
                  onChange={onChangeHandler}
                />
                <br />
                <Button onClick={onHandleClick} title="Register" className="btn btn-primary" />
                <div className="creatAccount">
                  New user? <Link to="/login"> Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
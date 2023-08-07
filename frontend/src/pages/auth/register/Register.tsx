import { useState } from "react"
import LoginLogo from "../../../assets/images/LoginLogo.svg";
import loginsplash from "../../../assets/images/loginsplash.svg";
import "./Register.scss"
import Input from "../../../components/ui-widgets/Input/Input";
import Button from "../../../components/ui-widgets/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../config/axiosInstance";
import { toast } from 'react-toastify';
import { passwordRegex, usernameRegex } from "../../../constant";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    user:"",
    pwd:"",
    cpwd:"",
  })
  
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleCPassword, setToggleCPassword] = useState(false);
  const navigate = useNavigate()
  const changePasswordVisibility = () => {
    setTogglePassword((prev) => !prev)
  } 
  const changeCPasswordVisibility = () => {
    setToggleCPassword((prev) => !prev)
  } 

  const onHandleClick = (e: any) => {
    e.preventDefault();
    if(!usernameRegex.test(registerForm.user)){
      toast('Username can only have letters and numbers', {
        type: 'error'
      });
    } else if(!passwordRegex.test(registerForm.pwd)){
      toast('Password is invalid', {
        type: 'error'
      });
    } else {

    
    if(registerForm.pwd === registerForm.cpwd) {

      axiosPrivate.post('/register', registerForm, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }).then((res: any) => {
        toast('User Registered successfully', {
          type: 'success'
        });
        navigate('/login')
      }).catch((err: any) => {
        console.log(err);
        
      })
    } else {
      toast('Password and Confirm Password should be same', {
        type: 'error'
      });
    }
  }
  }
  
  const onChangeHandler = (e: any) => {
    setRegisterForm((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const firstTemplate = () => {
    return (
        <ul className="passReq">
          <li>The password should be at least 5 characters long.</li>
          <li>It should include at least one special character (e.g. @, #, $, etc.).</li>
          <li>Needs to contain at least one uppercase letter (A-Z).</li>
          <li>Additionally, it should incorporate at least one digit (0-9).</li>
        </ul>
    );
}
const secondTemplate = () => {
    return (
        <p>Password should match with create password to confirm.</p>
    );
}

  return (
    <div className='authBg'>
      <div className="loginWrapper">
        <div className="loginCard">
          <div className="authLogo">
              <img src={LoginLogo} alt={'logo'} />
              <h6>ImportWizard</h6>
            </div>
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
                  <h4>Create account</h4>
                  <Input
                    placeholder="Enter Username"
                    label="Username"
                    value={registerForm.user}
                    name="user"
                    onChange={onChangeHandler}
                    />
                  <Input
                    placeholder="Enter password"
                    label="Create Password"
                    value={registerForm.pwd}
                    name="pwd"
                    showIcon
                    type={togglePassword ? 'text' : 'password'}
                    isVisiblePassword={togglePassword}
                    onIconClick={changePasswordVisibility}
                    onChange={onChangeHandler}
                    showNote={true}
                    tooltipTitle={firstTemplate}
                    id="createPassword"
                  />
                  <Input
                    placeholder="Confirm password"
                    label="Confirm Password"
                    value={registerForm.cpwd}
                    name="cpwd"
                    showIcon
                    type={toggleCPassword ? 'text' : 'password'}
                    isVisiblePassword={toggleCPassword}
                    onIconClick={changeCPasswordVisibility}
                    onChange={onChangeHandler}
                    showNote={true}
                    tooltipTitle={secondTemplate}
                    id="confirmPassword"
                  />
                  <br />
                  <Button onClick={onHandleClick} title="Sign Up" className="btn btn-primary" />
                  <div className="creatAccount">
                    Already have an account? <Link to="/login"> Login</Link>
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
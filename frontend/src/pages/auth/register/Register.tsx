import { useState } from "react"
import LoginLogo from "../../../assets/images/LoginLogo.svg";
import loginsplash from "../../../assets/images/loginsplash.svg";
import "./Register.scss"
import Input from "../../../components/ui-widgets/Input/Input";
import Button from "../../../components/ui-widgets/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../config/axiosInstance";
import { toast } from 'react-toastify';

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
  
  const onChangeHandler = (e: any) => {
    setRegisterForm((prev) => {
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
                  <h3>Create account</h3>
                  <Input
                    placeholder="Enter Username"
                    label="Username"
                    value={registerForm.user}
                    name="user"
                    onChange={onChangeHandler}
                    />
                  <Input
                    placeholder="Enter password"
                    label="Password"
                    value={registerForm.pwd}
                    name="pwd"
                    showIcon
                    type={togglePassword ? 'text' : 'password'}
                    isVisiblePassword={togglePassword}
                    onIconClick={changePasswordVisibility}
                    onChange={onChangeHandler}
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
                  />
                  <br />
                  <Button onClick={onHandleClick} title="Register" className="btn btn-primary" />
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
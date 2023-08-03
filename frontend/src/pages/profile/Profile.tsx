import React, {useState,useEffect, useContext} from 'react';
import CustomTabPanel from '../../components/layouts/CustomTabPanel';
import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../styles/theme-variable.scss';
import { ThemeContext } from '../../context/theme-context';
import './Profile.scss';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import Input from "../../components/ui-widgets/Input/Input";
import useAuth from "../../hooks/useAuth";

const Profile = () => {

  const [value, setValue] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
    localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark');
  };

  const { auth } = useAuth();

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Manage Password" {...a11yProps(1)} />
        <Tab label="History" {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel index={0} value ={value}>
        <div className="profileWrapper">
          <h4>Profile Info</h4>
          <div className="formDiv">
            <div className="profileInfo">
              <div className="userInfo">
                <div className="userIcon">
                  {auth.user.charAt(0)}
                </div>
                <h6>Username</h6>
              </div>
              <span>Admin</span>
            </div>
            <div className="theme">
              <div className="themeContent">
                <p>Theme</p>
                <ToggleButtonGroup
                  color="primary"
                  value={theme}
                  exclusive
                  onChange={handleThemeChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="light"><RiSunFill/></ToggleButton>
                  <ToggleButton value="dark"><RiMoonClearFill/></ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={1} value ={value}>
        <div className="changePassWrapper">
          <h4>Change Password</h4>
          <div className="formDiv">
            <div className="formGroup">
              <Input
                placeholder="Enter password"
                label="Current Password"
                // value={loginForm.password}
                // name="password"
                // showIcon
                // type={togglePassword ? 'text' : 'password'}
                // isVisiblePassword={togglePassword}
                // onIconClick={changePasswordVisibility}
                // onChange={onChangeHandler}
              />
            </div>
            <div className="formGroup">
              <Input
                placeholder="Enter password"
                label="New Password"
                // value={loginForm.password}
                // name="password"
                // showIcon
                // type={togglePassword ? 'text' : 'password'}
                // isVisiblePassword={togglePassword}
                // onIconClick={changePasswordVisibility}
                // onChange={onChangeHandler}
              />
            </div>
            <div className="formGroup">
              <Input
                placeholder="Enter password"
                label="Confirm Password"
                // value={loginForm.password}
                name="password"
                showIcon
                // type={togglePassword ? 'text' : 'password'}
                // isVisiblePassword={togglePassword}
                // onIconClick={changePasswordVisibility}
                // onChange={}
              />
            </div>
            <button className='btn btn-primary'>Update</button>
          </div>
        </div>
      </CustomTabPanel>
    </div>
  )
}

export default Profile
import React, {useState,useEffect, useContext} from 'react';
import CustomTabPanel from '../../components/layouts/CustomTabPanel';
import { Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../styles/themeVariable.scss';
import { ThemeContext } from '../../context/theme-context';
import './Profile.scss';
import { RiLogoutCircleRLine, RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import Input from "../../components/ui-widgets/Input/Input";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';
import useLogout from '../../hooks/useLogout';
import { getFormattedDate } from '../../utils/common';

const Profile = () => {

  const [value, setValue] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext);
  const [historyData, setHistoryData] = useState([])
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [isLogoutModalOpen, setisLogoutModalOpen] = useState(false);
  const logout = useLogout();
  const handleIsOpen = () => {
    setisLogoutModalOpen((prev:any) => !prev)
  }

  useEffect(() => {
    return () => {
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      })
    }
  },[])

  const [togglePassword, setTogglePassword] = useState({
    newP: false,
    confirmP: false
  })

  useEffect(() => {
    axiosPrivate.post('/history/me', {
      user: auth.user
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((res: any) => {
      setHistoryData(res.data)
    }).catch((err: any) => { })

  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setForm({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
  };

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
    localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark');
  };

  const handleFormChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit= (e: any) => {
    if(form.newPassword !== form.confirmNewPassword){
      toast('New Password and Confirm Password should be same', {
        type: 'error'
      });
    } else {

    axiosPrivate.post('/auth/changePassword', {
      user: auth.user, cpwd: form.currentPassword, npswd: form.newPassword
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((response) => {
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      })

      toast(response.data.message, {
        type: 'success'
      });
      
    }).catch((err) => {
      if(err.response.status === 401) {

        toast('Please enter correct password', {
          type: 'error'
        });
      } else {

        toast(err.response.data.message, {
          type: 'error'
        });
      }
      
    })
  }
  }

  const { auth } = useAuth();

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const lastLogin = JSON.parse(localStorage.getItem('lastLogin') || 'null');
  const updatedLastLogin = new Date(lastLogin).toLocaleString();
  
  
  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Manage Password" {...a11yProps(1)} />
        <Tab label="Activity" {...a11yProps(2)} />
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
                <h6 style={{ textTransform: 'capitalize' }} >{auth.user}</h6>
              </div>
              <span>{auth?.role}</span>
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
            <div className='loggedDetail'>
              <p>Last login</p>
              <span>{updatedLastLogin}</span>
            </div>
          </div>
          <div className="logoutDiv">
            <button onClick={()=> setisLogoutModalOpen(true)} className='btn btn-text'><RiLogoutCircleRLine/>Logout</button>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={1} value ={value}>
        <div className="changePassWrapper">
          <h4>Reset Password</h4>
          <div className="formDiv">
            <div className="formGroup">
              <Input
                placeholder="Enter password"
                label="Current Password"
                value={form.currentPassword}
                onChange={handleFormChange}
                name='currentPassword'
              />
            </div>
            <div className="formGroup">
              <Input
                placeholder="Enter password"
                label="New Password"
                type={togglePassword.newP ? 'text' : 'password'}
                isVisiblePassword={togglePassword.newP}
                showIcon
                onIconClick={() => {
                  setTogglePassword({
                    ...togglePassword,
                    newP: !togglePassword.newP
                  })
                }}
                value={form.newPassword}
                onChange={handleFormChange}
                name='newPassword'
              />
            </div>
            <div className="formGroup">
              <Input
                placeholder="Enter password"
                label="Confirm Password"
                // value={loginForm.password}
                showIcon
                value={form.confirmNewPassword}
                onChange={handleFormChange}
                name='confirmNewPassword'
                type={togglePassword.confirmP ? 'text' : 'password'}
                isVisiblePassword={togglePassword.confirmP}
                onIconClick={() => {
                  setTogglePassword({
                    ...togglePassword,
                    confirmP: !togglePassword.confirmP
                  })
                }}
                // onChange={}
              />
            </div>
            <button onClick={handleSubmit} className='btn btn-primary'>Update</button>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={2} value ={value}>
      <div className="profileWrapper">
        <h4>Activity Log</h4>
        <div className='table'>
          <div className="table-header">
            <div className="header__item">Date & Time</div>
            <div className="header__item">User</div>
            <div className="header__item">Data Type</div>
            <div className="header__item">Imported File</div>
          </div>
          <div className="table-content">
            {
              historyData.length > 0 ? (
                historyData.map((item:any) => (
                  <div key={item._id} className='table-row'>
                    <div className='table-data'>{getFormattedDate(item.createdAt)}</div>
                    <div className='table-data'>{item.user}</div>
                    <div className='table-data'>{item.tableName}</div>
                    <div className='table-data'>{item.fileName}</div>
                  </div>
                ))
              ) : (<h6>No History Found</h6>)
            }
          </div>	
        </div>
      </div>
      </CustomTabPanel>
      <Modal className="wd25" overlayClick={true} isOpen={isLogoutModalOpen} handleClose={handleIsOpen}>
        <div className="logoutWrapper">
          <h5>Are you sure you want to log out?</h5>
          <p>Logging out will end your current session and you'll need to sign in again.</p>
          <div className="d-flex">
            <button onClick={()=> setisLogoutModalOpen(false)} className='btn btn-text'>Cancel</button>
            <button onClick={logout} className='btn btn-primary'>Logout</button>
          </div>
        </div>
        
      </Modal>
    </div>
  )
}

export default Profile
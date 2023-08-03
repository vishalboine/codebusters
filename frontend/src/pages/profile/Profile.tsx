import React, {useState,useEffect, useContext} from 'react';
import CustomTabPanel from '../../components/layouts/CustomTabPanel';
import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../styles/theme-variable.scss';
import { ThemeContext } from '../../context/theme-context';
import './Profile.scss';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

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
          </div>
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
      </CustomTabPanel>
      <CustomTabPanel index={1} value ={value}>
      <div className="profileWrapper">
            <h4>Change Password</h4>
          </div>
      </CustomTabPanel>
    </div>
  )
}

export default Profile
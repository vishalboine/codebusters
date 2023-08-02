import React, {useState,useEffect, useContext} from 'react';
import CustomTabPanel from '../../components/layouts/CustomTabPanel';
import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../styles/theme-variable.scss';
import { ThemeContext } from '../../context/theme-context';
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
    <div className='header'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add Table" {...a11yProps(0)} />
          <Tab label="Update Table" {...a11yProps(1)} />
          <Tab label="Column Validation" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel index={0} value ={value}>
          <h1>Profile</h1>
          <ToggleButtonGroup
            color="primary"
            value={theme}
            exclusive
            onChange={handleThemeChange}
            aria-label="Platform"
          >
            <ToggleButton value="light">Light</ToggleButton>
            <ToggleButton value="dark">Dark</ToggleButton>
          </ToggleButtonGroup>
      </CustomTabPanel>
      <CustomTabPanel index={1} value ={value}>
          <h1>Add</h1>
      </CustomTabPanel>
    </div>
  )
}

export default Profile
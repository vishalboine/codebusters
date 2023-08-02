import Login from "./pages/auth/login/Login";
import { Routes, Route } from 'react-router-dom';
import Register from "./pages/auth/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./config/RequireAuth";
import Layout from "./components/layouts/Layout";
import Unauthorized from "./pages/public/Unauthorized";
import NotFound from "./pages/public/NotFound";
import PersistLogin from "./config/PersistLogin";
import Admin from "./pages/admin/Admin";
import ToastLayout from "./components/layouts/ToastLayout";
import Users from "./pages/admin/Users";
import Profile from "./pages/profile/Profile";
import { ThemeContext } from '../src/context/theme-context';
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material';
import { useContext } from "react";

function App() {
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());

  const lightTheme = createTheme({
    typography: {
      fontFamily: [
        'Inter', 'sans-serif'
      ].join(',')
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: '1.6rem',
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.Mui-focused': { 
              border: '1px solid #ADBDFF',
              outline: 0,
              boxShadow: '0px 0px 0px 1px #ADBDFF'
            },
            '&.Mui-disabled': {
              background: '#e7e9e9',
              border: '0px solid #e7e9e9',
              color: '#666',
              cursor: 'not-allowed'
            },
            '&.validControl': {
              border: '2px solid #287151',
              backgroundColor: '#F7FAF9'
            },
            '&.invalidControl': {
              border: '2px solid #B2292E',
              backgroundColor: '#FCF6F6'
            },
            '&.SearchPanelInput': {
              backgroundColor:'#dbe6ec',
              height:'5rem'
            },
            border: '1px solid #C8D3FF', 
            height: '46px',
            fontSize: '1.6rem',
            backgroundColor: '#f6f7fe',
            borderRadius: '12px!important',
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            padding: '10px 12px',
            '&.Mui-disabled': {
              "&&": {
                background: '#e7e9e9',
                border: '0px solid #e7e9e9',
                cursor: 'not-allowed',
                '-webkit-text-fill-color': '#666',
              }
            }
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: 'Inter',
            fontSize: '1.6rem',
            color: '#040a21',
            minHeight: '40px',
            padding: '10px 12px',
            '&.Mui-selected': { 
              background: '#edf1ff',
              '&:hover': {
                background: '#ADBDFF'
              } 
            }
          }
          
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            display: 'none'
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '1.2rem',
            color: '#040a21',
            padding: '10px 12px',
            background: '#EDF1FF'
          }
          
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.MuiTab-root': { 
              fontSize:'1.6rem',
              fontWeight: '400',
              '&.Mui-selected': {
                color: '#3650B5',
                fontWeight: '500',
              },
              
            }
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '&indicator': {
              backgroundColor:'#333',
            }
          }
        }
        
      },

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            '&.MuiSelect-icon': { 
              fontSize:'2.5rem',
              color: '#626D99'
            }
          }
        }
      }
    }    
  });

  const darkTheme = createTheme({
    typography: {
      fontFamily: [
        'Inter', 'sans-serif'
      ].join(',')
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: '1.6rem',
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.Mui-focused': { 
              border: '1px solid #ADBDFF',
              outline: 0,
              boxShadow: '0px 0px 0px 1px #ADBDFF'
            },
            '&.Mui-disabled': {
              background: '#e7e9e9',
              border: '0px solid #e7e9e9',
              color: '#666',
              cursor: 'not-allowed'
            },
            '&.validControl': {
              border: '2px solid #287151',
              backgroundColor: '#F7FAF9'
            },
            '&.invalidControl': {
              border: '2px solid #B2292E',
              backgroundColor: '#FCF6F6'
            },
            '&.SearchPanelInput': {
              backgroundColor:'#dbe6ec',
              height:'5rem'
            },
            border: '1px solid #C8D3FF', 
            height: '46px',
            fontSize: '1.6rem',
            backgroundColor: '#f6f7fe',
            borderRadius: '12px!important',
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            padding: '10px 12px',
            '&.Mui-disabled': {
              "&&": {
                background: '#e7e9e9',
                border: '0px solid #e7e9e9',
                cursor: 'not-allowed',
                '-webkit-text-fill-color': '#666',
              }
            }
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: 'Inter',
            fontSize: '1.6rem',
            color: '#040a21',
            minHeight: '40px',
            padding: '10px 12px',
            '&.Mui-selected': { 
              background: '#edf1ff',
              '&:hover': {
                background: '#ADBDFF'
              } 
            }
          }
          
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            display: 'none'
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '1.2rem',
            color: '#040a21',
            padding: '10px 12px',
            background: '#EDF1FF'
          }
          
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.MuiTab-root': { 
              fontSize:'1.6rem',
              fontWeight: '400',
              color: '#eff2f7',
              '&.Mui-selected': {
                color: '#1659b6',
                fontWeight: '500',
              },
              '&.MuiTabs-indicator': {
                backgroundColor: '#1659b6',
              }
            }
          }
        }
      },
     
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            '&.MuiSelect-icon': { 
              fontSize:'2.5rem',
              color: '#626D99'
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
        <Routes>
            <Route element={<ToastLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={['User', 'Admin']} />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/update-users" element={<Users />} />
                </Route>
              </Route>
            </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export default App
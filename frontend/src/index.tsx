import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'devextreme/dist/css/dx.light.css';
import "./styles/iwVariables.scss";
import "./styles/dxTable.scss";
import "./styles/formElemets.scss";
import "./styles/mixins.scss";
import "./styles/index.scss";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

const theme = createTheme({
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
          borderRadius: '8px!important',
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

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
root.render(
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
);
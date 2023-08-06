import {useState} from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { RiHome6Line, RiHome6Fill, RiAdminLine, RiAdminFill, RiLogoutCircleRLine } from 'react-icons/ri';
import { HiUserGroup,HiOutlineUserGroup } from 'react-icons/hi';
import logo from '../../assets/images/logo.svg';
import Modal from '../Modal';
import useLogout from '../../hooks/useLogout';
import useAuth from "../../hooks/useAuth";
import 'devextreme/dist/css/dx.light.css';

const Layout = () => {

  const {pathname} = useLocation();
  const [isLogoutModalOpen, setisLogoutModalOpen] = useState(false);
  const handleIsOpen = () => {
    setisLogoutModalOpen((prev:any) => !prev)
  }
  const logout = useLogout();
  const { auth } = useAuth();
    
  const navItems = [
    {
      key: 1,
      logo: <div className="userIcon">
      {auth.user.charAt(0)}
      </div>,
      activeLogo: <div className="userIcon">
      {auth.user.charAt(0)}
      </div>,
      to: '/profile'
    },
    {
      key: 2,
      logo: <RiHome6Line size={26} />,
      activeLogo: <RiHome6Fill size={26} />,
      to: '/'
    },
    {
      key: 3,
      logo: <RiAdminLine size={26} />,
      activeLogo: <RiAdminFill size={26} />,
      to: '/admin'
    },
    {
      key: 4,
      logo: <HiOutlineUserGroup size={26} />,
      activeLogo: <HiUserGroup size={26} />,
      to: '/update-users'
    },
  ]

  return (
    <div className='dashboard'>
      <div className="leftPanel">
        <div className="head">
          <img src={logo} alt="" />
        </div>
        <div className="navItems">
          { navItems.map((item: any) => (
            <Link className={`navItem ${item.to === pathname ? 'active' : ''}`} to={item.to} key={item.key}>
              {item.to === pathname ? item.activeLogo : item.logo}
            </Link>
          ))}
          <a onClick={handleIsOpen} className='navItem' aria-label="logout">
            <RiLogoutCircleRLine size={26} />
          </a>
          <div className="userIcon mobile">
          <Link to='/profile'>
            {auth.user.charAt(0)}
            <span>{auth.user}</span>
          </Link>
          </div>
        </div>
      </div>
      <div className="rightPanel">
        <Outlet />
      </div>
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

export default Layout
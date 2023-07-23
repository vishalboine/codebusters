import { Link, Outlet, useLocation } from 'react-router-dom';
import { RiHome6Line, RiHome7Fill ,RiSettings5Line, RiSettings5Fill, RiAdminLine, RiAdminFill, RiLogoutCircleRLine, RiLogoutCircleRFill } from 'react-icons/ri';
import logo from '../../assets/images/logo.svg';

const Layout = () => {

  const {pathname} = useLocation();
  
  const navItems = [
    {
      key: 1,
      logo: <RiHome6Line size={26} />,
      activeLogo: <RiHome7Fill />,
      to: '/'
    },
    {
      key: 2,
      logo: <RiSettings5Line size={26} />,
      activeLogo: <RiSettings5Fill />,
      to: '/settings'
    },
    {
      key: 3,
      logo: <RiAdminLine size={26} />,
      activeLogo: <RiAdminFill />,
      to: '/admin'
    },
    {
      key: 4,
      logo: <RiLogoutCircleRLine size={26} />,
      activeLogo: <RiLogoutCircleRFill />,
      to: '/logout'
    }
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
              {item.logo}
            </Link>
          ))}
        </div>
      </div>
      <div className="rightPanel">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
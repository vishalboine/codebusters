import LongLogo from '../../../assets/images/longLogo.png';
import CustomSlider from '../components/CustomSlider';

type Props = {}

const Login = (props: Props) => {
  return (
    <div className='authBg'>
      <div className="card">
        <img src={LongLogo} style={{ width: '10rem' }} alt="" />
        <CustomSlider />
      </div>
    </div>
  )
}

export default Login
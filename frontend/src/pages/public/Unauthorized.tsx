import './public.scss';
import unauthorizedImg from'../../assets/images/unauthorized.svg';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1)
  return (
    <div className='publicPgWrp'>
      <img src={unauthorizedImg} />
      <h1>No authorization found</h1>
      <h5>This page is not publically available.<br/>
          To access it please login first.
      </h5>
      <button className='btn' onClick={goBack}>Go Back</button>
    </div>
  )
}

export default Unauthorized
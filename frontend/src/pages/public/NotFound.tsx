import './public.scss';
import notFoundImg from'../../assets/images/notFoundImg.svg';

const NotFound = () => {
  return (
    <div className='publicPgWrp'>
      <img src={notFoundImg} />
      <h1>Oops! The page you're looking for is on vacation.</h1>
      <h5>Don't worry, our team of tech-savvy explorers is on the case to find that missing destination.<br/>
          To access it please login first.
      </h5>
      <button className='btn'>Return to home</button>
    </div>
  )
}

export default NotFound
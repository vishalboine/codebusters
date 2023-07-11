import LongLogo from '../../../assets/images/longLogo.png';
import Img1 from '../../../assets/images/image1.png';
import Img2 from '../../../assets/images/image1.png';
import Img3 from '../../../assets/images/image1.png';
import { Gallery } from 'devextreme-react';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import "./Login.scss"

type Props = {}

const Login = (props: Props) => {
  const gallery = [Img1, LongLogo, Img3];
  return (
    <div className='authBg'>
      <div className="loginCard">
        <img src={LongLogo} style={{ width: '10rem' }} alt="" />
        <div className="loginWrapper">
          <Gallery
            id="gallery"
            dataSource={gallery}
            height={300}
            slideshowDelay={2000}
            loop={true}
            showNavButtons={false}
            showIndicator={true} />

          <div className="loginInputs card">
          <div className="dx-field-value">
              <TextBox
                placeholder="password"
                stylingMode="filled"
                defaultValue="password"
                // inputAttr={passwordLabel}
                mode={'password'}>
                <TextBoxButton
                  options={{
                  icon: 'images/icons/eye.png',
                  type: 'default',
                  onClick: () => {
                    // this.setState({
                    //   passwordMode: (this.state.passwordMode === 'text' ? 'password' : 'text'),
                    // });
                  },
                }}
                  //#region 
                  name="password"
                  location="after"
                  // options={this.passwordButton}
                />
              </TextBox>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
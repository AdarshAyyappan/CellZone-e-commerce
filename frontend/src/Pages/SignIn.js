import React, { useState, useEffect } from 'react';
import './Signin.css'
import { useNavigate, useSearchParams,Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { googleLogin } from '../actions/userActions'
import GoogleLogin from 'react-google-login';

const SignIn = () => {


  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || ''
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  console.log(error,'---------------');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userGoogleLogin=useSelector(state=>state.userGoogleLogin)
const {loading: googleLoading,error : googleError,userInfo: googleUserInfo}=userGoogleLogin

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo || googleUserInfo) {
      navigate(`/${redirect}`)
    }
  }, [userInfo, redirect,navigate,googleUserInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if(email!=="" && password!==""){
      dispatch(login(email, password))
    }
    // console.log(email,password)
  }
  const responseSuccessGoogle=(response)=>{

    console.log(response);
    
  
   const tokenId=response.tokenId
    
  
    dispatch(googleLogin(tokenId))
    
  
    
       
      
    
  
    }
      
  
  const responseErrorGoogle=(e)=>(response)=>{
   console.log(response);
  }
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={4} className='m-auto '>
          <div className="text-center my-5 ">
            <div className="screen">
              <div className="screen__content ">
                <Form onSubmit={submitHandler} className="login py-5">
                {/* <img width="50" className='shadow border' style={{borderRadius:"50%"}}  src="https://media.istockphoto.com/vectors/running-shoe-heart-symbol-on-white-backdrop-vector-id1212219150?k=20&m=1212219150&s=612x612&w=0&h=HDUBBEueWigtu3f7ne8mZFbJmjtfzGqSdSLIgmw5-Lw=" alt="" /> */}

                  <h3>log In</h3>
                  {error && <Message variant="danger">{error}</Message>}
                  {loading && <Loader />}
                  <div className="login__field">
                    <i className="login__icon fas fa-user"></i>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="login__input" placeholder=" Email" />
                  </div>
                  <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="login__input" placeholder="Password" />
                  </div>
                  <div className="login__field px-5">
                    <Button type='submit' className="w-100  my-1  bg-info " >
                      <span className="">Log In Now</span>
                    </Button >
                  </div>
                  <div className="login__field px-5 ">
                    <Button type='btn' className="w-100  my-1 bg-danger " onClick={((e)=>navigate('/otp'))}>
                      <span className="">Log In with otp</span>
                    </Button >
                  </div>
                  <GoogleLogin className='ms-3 mt-3'
        
        clientId="1094715592292-amog7s71ap0kmg0v0leuf756ru37pdkt.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
                  <div className='    text-center'>
                    <p className=''>Don't have an account?<Link to={'/signup'}  className='text-info h6' >Create New</Link></p>
                  </div> 
                </Form>
              </div>

            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default SignIn;

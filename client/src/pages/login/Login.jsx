import { useNavigate } from "react-router-dom";
import "./login.css"
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate()
    const  { loading, error, dispatch } = useContext(AuthContext)

    const [passwordType, setPasswordType] = useState("password");
    const [ credentials, setCredentials ] = useState({
        email: undefined,
        password: undefined
    })

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value}));
    }

    const togglePassword = () => {
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

    const handleLogin = async () => {
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("/auth/loginCustomer", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate(-1)
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
        }
    }

    console.log(error)
      
  return (
    <div className="login">
        <div className="loginContainer">
            <div className="loginContainerHeader">
                <span className="accountLogin" onClick={(e) => navigate(-1)}>
                    <i class='bx bx-arrow-back'></i>
                    BACK
                </span>
                <span className="accountSpan" onClick={(e) => navigate('/register')}>CREATE ACCOUNT</span>
            </div>
            <div className="loginBody">
                <div className="appIcon">
                    <img src="../../images/logo/logo.png" className="app_logo" alt="logo" />
                </div>
                <h3 className="app-title">Log into Call a Ride</h3>
                <div className="loginBodyContainer">
                    <div className="loginBodyForm">
                        <div className="loginFormItem">
                            <p className="loginFormError">{ error? error.message : "" }</p>
                        </div>
                        <div className="loginFormItem">
                            <label>Email Address</label>
                            <input type="email" onChange={handleChange} id="email" placeholder="name@example.com" />
                        </div>
                        <div className="loginFormItem">
                            <label>Password</label>
                            <div className="passwordField">
                                <input type={passwordType} id="password" onChange={handleChange} name="password" placeholder="Password" />
                                <span>
                                    <i onClick={togglePassword} class={passwordType==="password"?"bx bx-show":"bx bx-hide"} ></i>
                                </span>
                            </div>
                        </div>
                        <div className={loading ? "loginFormItemBtn disabled":"loginFormItemBtn"} onClick={()=>handleLogin()}>
                            {loading ? "Logging in ..." : "Log In"}
                        </div>
                    </div>
                    <div className="loginBodyDivider">
                        <div className="vDivider"></div>
                        <span>OR</span>
                        <div className="vDivider"></div>
                    </div>
                    <div className="loginBodySocials">
                        <span className="loginSocialItem button-hover-effect bg-grey">
                            <img src="../../images/login/google-logo.png" className="google_logo" alt="Google Logo" />
                            <h5>Continue with Google</h5>
                        </span>
                        <span className="loginSocialItem button-hover-effect bg-grey">
                            <img src="../../images/login/apple-logo.png" className="apple_logo" alt="Apple Logo" />
                            <h5>Continue with Apple</h5>
                        </span>
                        <span className="loginSocialItem button-hover-effect bg-grey">
                            <img src="../../images/login/facebook-logo.png" className="facebook_logo" alt="Facebook Logo" />
                            <h5>Continue with Facebook</h5>
                        </span>
                    </div>
                </div>
                <div className="loginTextIssue">
                    <span>Can't Login?</span>
                </div>
                <div className="loginAppDesc">
                    <p>
                        By logging in, you agree to our <br />
                        Terms & Privacy
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
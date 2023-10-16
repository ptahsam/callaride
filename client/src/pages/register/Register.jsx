import { useNavigate } from "react-router-dom"
import "./register.css"
import { useState } from "react";
import axios from "axios"
import { customer } from "../../components/utils/register";
import { hasValues } from "../../components/utils/helper";

const Register = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [customerDetails, setCustomerDetails] = useState(customer)
  const [register, setRegister] = useState({ loading: false, error: null })

  const togglePassword = () => {
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const toggleConfirmPassword = () => {
    if(confirmPasswordType==="password")
    {
     setConfirmPasswordType("text")
     return;
    }
    setConfirmPasswordType("password")
  }

  const handleChange = (e) => {
    if(e.target.id === 'confirmpassword'){
        setConfirmPassword(e.target.value)
        return;
    }
    setCustomerDetails((prev) => ({ ...prev, [e.target.id]: e.target.value}));
  }

  const handleSubmit = async () => {
    const newCustomerDetails = {
        'firstname': customerDetails.firstname,
        'lastname': customerDetails.lastname,
        'email': customerDetails.email,
        'birthdate': customerDetails.birthdate,
        'address': customerDetails.address,
        'phonenumber': customerDetails.phonenumber,
        'password': customerDetails.password,
    };
    if(!hasValues(newCustomerDetails)){
        setRegister((prev) => ({...prev, ['error']: 'Enter required fields'}))
        return;
    }

    if(customerDetails.password !== '' && customerDetails.password === confirmPassword){
        setRegister((prev) => ({...prev, ['loading']: true}))
        try{
            const resp = await axios.post("/auth/registerCustomer", customerDetails);
            setRegister((prev) => ({...prev, ['loading']: false, ['error']: resp.data}))
            setCustomerDetails(customer)
        }catch(err){
            setRegister((prev) => ({...prev, ['[lading']:false, ['error']: err.response.data}))
        }
    }else{
        setRegister((prev) => ({...prev, ['error']: 'Password Incorrect'}))
        return;
    }
  }

  return (
    <div className="register">
        <div className="registerContainer">
            <div className="registerContainerHeader">
                <span className="accountRegister" onClick={(e) => navigate(-1)}>
                    <i class='bx bx-arrow-back'></i>
                    BACK
                </span>
            </div>
            <div className="registerBody">
                <div className="appIcon">
                    <img src="../../images/logo/logo.png" className="app_logo" alt="logo" />
                </div>
                <h3 className="app-title">Create a Rent Go account</h3>
                <div className="registerBodyContainer">
                    <div className="registerFormItemError">
                        <p className="registerFormError">{register.error?register.error:""}</p>
                    </div>
                    <div className="registerForm">
                        <div className="registerFormItem">
                            <label>Firstname <sup>*</sup></label>
                            <input 
                                type="text" 
                                placeholder="Enter your firstname"
                                value={customerDetails.firstname}
                                onChange={(e) => handleChange(e)}
                                id="firstname"
                            />
                        </div>
                        <div className="registerFormItem">
                            <label>Lastname <sup>*</sup></label>
                            <input 
                                type="text" 
                                placeholder="Enter your lastname"
                                value={customerDetails.lastname}
                                onChange={(e) => handleChange(e)}
                                id="lastname"
                            />
                        </div>
                        <div className="registerFormItem">
                            <label>Email <sup>*</sup></label>
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                value={customerDetails.email}
                                onChange={(e) => handleChange(e)}
                                id="email"
                            />
                        </div>
                        <div className="registerFormItem">
                            <label>Gender</label>
                            <select
                                value={customerDetails.gender}
                                onChange={(e) => handleChange(e)}
                                id="gender"
                            >
                                <option value={''}>-Select gender-</option>
                                <option value={'male'}>Male</option>
                                <option value={'female'}>Female</option>
                                <option value={'other'}>Other</option>
                            </select> 
                        </div>
                        <div className="registerFormItem">
                            <label>Phone number <sup>*</sup></label>
                            <input 
                                type="phone" 
                                placeholder="Enter your phonenumber"
                                value={customerDetails.phonenumber}
                                onChange={(e) => handleChange(e)}
                                id="phonenumber"
                            />
                        </div>
                        <div className="registerFormItem">
                            <label>Alt Phone number <sup>*</sup></label>
                            <input 
                                type="phone" 
                                placeholder="Enter alternative phone number"
                                value={customerDetails.altphonenumber}
                                onChange={(e) => handleChange(e)}
                                id="altphonenumber"
                            />
                        </div>
                        <div className="registerFormItem">
                            <label>Birthdate <sup>*</sup></label>
                            <input 
                                type="date" 
                                placeholder="Enter birthdate"
                                value={customerDetails.birthdate}
                                onChange={(e) => handleChange(e)}
                                id="birthdate"
                            />
                        </div>
                        <div className="registerFormItem">
                            <label>Address location <sup>*</sup></label>
                            <input 
                                type="location" 
                                placeholder="Enter your location i.e Nairobi"
                                value={customerDetails.address}
                                onChange={(e) => handleChange(e)}
                                id="address"
                            />
                        </div>
                        <div className="registerFormItem">
                            <label>Password</label>
                            <div className="passwordField">
                                <input 
                                    type={passwordType} 
                                    id="password" 
                                    name="password" 
                                    value={customerDetails.password}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Enter password" 
                                />
                                <span>
                                    <i onClick={togglePassword} class={passwordType==="password"?"bx bx-show":"bx bx-hide"} ></i>
                                </span>
                            </div>
                        </div>
                        <div className="registerFormItem">
                            <label>Confirm Password</label>
                            <div className="passwordField">
                                <input 
                                    type={confirmPasswordType} 
                                    id="confirmpassword" 
                                    name="confirmpassword" 
                                    placeholder="Confirm password" 
                                    value={confirmPassword}
                                    onChange={(e) => handleChange(e)}
                                />
                                <span>
                                    <i onClick={toggleConfirmPassword} class={confirmPasswordType==="password"?"bx bx-show":"bx bx-hide"} ></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="registerFormItemBtn" onClick={(e) => handleSubmit()}>
                        {register.loading?"Submitting...":"Submit"}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
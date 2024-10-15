
import React, { useState, useEffect } from "react";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.jpeg";
import show from "../../assets/show.jpeg";
import hide from "../../assets/hide.jpeg";
import "./Login.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, TextField, InputAdornment } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { motion, AnimatePresence } from 'framer-motion';
import {
  slideAnimation 
} from '../../config/Motion.jsx';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LoginDetails, SignUpDetails } from "../../slice/LoginSlice.jsx";
const SignUp = () => {
    const dispatch=useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const previousToastIdRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  useEffect(() => {
    const storedCredentials = localStorage.getItem("loginCredentials");
    if (storedCredentials && rememberMe) {
      const { userName,email,password,phoneNumber } = JSON.parse(storedCredentials);
      formik.setFieldValue("email", email);
      formik.setFieldValue("password", password);
    }
  }, [rememberMe]);

  const sendMailtoReset = (email) => {
    axios
      .get(`/forgotpassword?email=${email}`)
      .then((res) => {
        toast.success("Link has been sent to your email!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch((error) => {
        toast.error("Failed to send reset link", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  }

  const formik = useFormik({
    initialValues: { name:"",email: "",phoneNumber:"", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("*Please enter a valid email ID").required("Enter an email"),
      password: Yup.string().required("Required").min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      console.log('Form values:', values);
      var loginData = { name:values.name,email: values.email,phoneNumber:values.phoneNumber, password: values.password };
      setIsSubmitting(true);
      try {
        console.log('Dispatching LoginDetails...',loginData);
        const result = await dispatch(SignUpDetails(loginData)); // Dispatch login action
        console.log('Login successful:', result);
        // navigate('/');
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",        // This ensures the image covers the entire area
    backgroundRepeat: "no-repeat",  // Prevents repeating the image
    backgroundPosition: "center",   // Ensures the image is centered
    width: "100vw",                 // Full viewport width
    height: "100vh",                // Full viewport height
    display: "flex",                // Centering content within
    justifyContent: "center",       // Horizontally center content
    alignItems: "center",           // Vertically center content
    position: "absolute",           // Ensures it covers the whole screen
    top: 0,                         // Aligns to the top of the viewport
    left: 0                         // Aligns to the left of the viewport
  };

  const handleForgotOpen = () => {
    setOpenForgot(true);
  };

  const handleForgotClose = () => {
    setOpenForgot(false);
  };

  const handleForgotPass = () => {
    navigate("/ForgotPassword")
  }
  const handleChangePass = () => {
    navigate("/PasswordReset")
  }
  const handleRequestResetLink = () => {
    sendMailtoReset(forgotEmail);
    setOpenForgot(false);
    setForgotEmail("")
  };

  const [showText, setShowText] = useState(false);
  const [play, setPlay] = useState(true);
  useEffect(() => {

    const Welcome = setTimeout(() => {
      setShowText(true)
    }, 100);


    return () => {

      clearTimeout(Welcome);
    };

  }, []);

  return (
    <div style={backgroundStyle}>
      <AnimatePresence>
        {play && (
          
                   <motion.header {...slideAnimation('up')}>
                <AnimatePresence>
                {showText && (
                 
                 <motion.div

                  // className={styles.textContainer} // Apply CSS module class
                   initial={{ opacity: 0, scale: 0.1, rotate: 0 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0 ,x:-530,y:10}}
                   exit={{ opacity: 0, y: 0.1, rotate: 0 }}
                   transition={{ duration: 3 ,ease: "easeInOut"}}
                 >
                
      <div className="left-side-text">
      COMIC<span style={{ color: "rgb(250, 137, 31)" }}>VERSE</span>
        <br />
        <span className="left-side-text2">Where Every <span style={{ color: "rgb(250, 137, 31)" }}>Comic</span> Journey Begins.</span>
      </div>
      </motion.div>
                    
                )}
              </AnimatePresence>
            </motion.header>
            
            )}
           
            </AnimatePresence>
            <AnimatePresence>
        {play && (
          
                   <motion.header {...slideAnimation('up')}>
                <AnimatePresence>
                {showText && (
                 
                 <motion.div
                    style={{width:'20px'}}
                   initial={{ opacity: 0, scale: 0.1, rotate: 0 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0 ,x:500,y:-30}}
                   exit={{ opacity: 0, y: 0.1, rotate: 0 }}
                   transition={{ duration: 2 }}
                 >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
      
        <div className="login-container">
          <div>
            <h2 className="heading">Sign Up</h2>
            <h5 className="heading2">
              {" "}
              No account?
              <span>
                <a className="heading3" onClick={()=>navigate('/')}>
                  Sign In
                </a>
              </span>{" "}
            </h5>
            <form onSubmit={formik.handleSubmit}>
              <label className="label">User Name</label>
              <br />
              <input
                type="text"
                placeholder="User Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="errorText">{formik.errors.name}</div>
              )}
              <br />
              <label className="label">Email</label>
              <br />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="errorText">{formik.errors.email}</div>
              )}
              <br />
              <label className="label">phone Number</label>
              <br />
              <div className="password-input-container">
                <input
                 // type={showPassword ? "text" : "password"}
                 type="number" 
                 name="phoneNumber"
                  placeholder="phoneNumber"
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  className="input"
                />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="errorText">{formik.errors.phoneNumber}</div>
              )}
              <br />
            <label className="label">PassWord</label>
              <br />
              <input
                type="text"
                placeholder="PassWord"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="errorText">{formik.errors.password}</div>
              )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                >
                  <img
                    src={showPassword ? hide : show}
                    alt={showPassword ? "Hide" : "Show"}
                    style={{ width: "20px", height: "20px",marginTop:"20p" }}
                  />
                </button>
              </div>
              {/* <br /> */}
              <button
                type="submit"
                className="sign-in-button"
                disabled={isSubmitting}
              >
              {isSubmitting ? "Signing In..." : "SIGN IN"}
              </button>
              <ToastContainer
                toastStyle={{
                  marginTop: "4rem",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  alignContent: "center",
                  closeOnClick: true,
                  textAlign: "center",
                }}
                closeButton={false}
                hideProgressBar={false}
                autoClose={2000}
                position="top-center"
              />
            </form>
            <br />
            <div className="privacy">
              By continuing, you agree to accept our
              <br />
              <span style={{ color: "#ff7300" }}>Privacy Policy</span> &{" "}
              <span style={{ color: "#ff7300" }}>Terms of Service</span>
            </div>
            <br />
            {/* <div className="forget-pass">
              <span style={{ color: "#83A8FF", cursor: "pointer" }} onClick={handleForgotOpen}>Forgot Password?</span> */}
              {/* <span style={{ color: "#83A8FF",cursor:"pointer" }} onClick={handleChangePass}>Reset Password</span> */}
            {/* </div> */}
          </div>
        </div>
        
            
      </div>
            
            </motion.div>
                    
        )}
      </AnimatePresence>
    </motion.header>
    
    )}
   
    </AnimatePresence>
    

      <Dialog
        PaperProps={{
          sx: {
            width: "450px",
            height: "350px",
            backgroundColor: "#FFFFFF",
            overflow: "hidden"
          },
        }}
        open={openForgot}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "10px",
            overflow: "hidden"
          }}
        >
          <DialogTitle
            style={{
              fontSize: "20px",
              fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif`,
              color: "#000000",
              overflow: "hidden"
            }}
          >
            Forgot Password
          </DialogTitle>
        </div>
        <DialogContent style={{ marginTop: "-10px", overflow: "hidden" }}>
          <p style={{ color: "black", fontWeight: "400" }}>
            Please enter the email address you'd like to send your password reset information to
          </p>
          <br />
          <label>Enter email address</label>
          <br />
          <TextField
            style={{ marginTop: "1%", height: "20px", width: "400px" }}
            autoFocus
            margin="dense"
            id="forgot-email"
            type="email"
            fullWidth
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <br />
          <br />
          <DialogActions
            style={{
              marginTop: "4%",
              overflow: "hidden",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <List>
              <div
                style={{
                  color: "#FFFFFF",
                  background: "#4779EF",
                  borderRadius: "8px",
                  width: "300px",
                  height: "40px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ListItem
                  button
                  onClick={handleRequestResetLink}
                  style={{
                    fontFamily: "normal normal bold 16px/21px Product Sans",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    fontWeight:"600"
                  }}
                >
                  Request a password reset link
                </ListItem>
              </div>
            </List>
            <List>
              <div
                style={{
                  color: "#4779EF",
                  marginTop: "1%",
                  borderRadius: "8px",
                  width: "300px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight:"600"
                }}
              >
                <ListItem
                  button
                  onClick={handleForgotClose}
                  style={{
                    fontFamily: "normal normal bold 16px/21px Product Sans",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%"
                  }}
                >
                  Back to Sign In
                </ListItem>
              </div>
            </List>
          </DialogActions>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default SignUp;

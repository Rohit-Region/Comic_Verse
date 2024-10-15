import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileDetails } from '../../../slice/UserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { LoginData, userId, loading, error } = useSelector((state) => state.login);
  const Id = LoginData.userId;
  const [view, setView] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const availableRoles = ['user', 'admin', 'author']; // Example roles
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: LoginData?.name || '',
      email: LoginData?.email || '',
      phoneNumber: LoginData?.phoneNumber || '',
      role: LoginData?.role || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Please enter a valid email").required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
    //   password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
    }),
    enableReinitialize: true, // This ensures the formik values reinitialize when LoginData changes
    onSubmit: async (values) => {
      console.log('Form values:', values);
      const updatedData = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        role: values.role,
      };
      setIsSubmitting(true);
      try {
        console.log('Dispatching updateProfileDetails...', updatedData);
        const result = await dispatch(ProfileDetails({ Id, ProfileData: updatedData })); // Corrected dispatch
        console.log('Profile update successful:', result);
      } catch (error) {
        console.error('Profile update error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>PROFILE {LoginData.role}</h2>
        <button className="author-button" onClick={() => console.log('Request for Author')}>BECOME AN AUTHOR</button>
      </div>
      <div className="profile-info">
        <h2>Name: {LoginData.name}</h2>
        <h2>Phone Number: {LoginData.phoneNumber}</h2>
        <h2>Email: {LoginData.email}</h2>
      </div>
      <button onClick={() => setView(true)}>View</button>

      {/* Modal Component */}
      <Modal isOpen={view} onClose={() => setView(false)}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Input Data Edit</h1>
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>User Name</label>
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '60%',
            }}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.name}</div>
          )}

          <label style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '60%',
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.email}</div>
          )}

          <label style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '60%',
            }}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.phoneNumber}</div>
          )}
            <label style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Role</label>
          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '60%',
            }}
          >
            <option value="">Select Role</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {formik.touched.role && formik.errors.role && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.role}</div>
          )}
          {/* <label style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Password</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                width: '60%',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '5px',
              }}
            >
              <img
                src={showPassword ? 'hide-icon-path' : 'show-icon-path'}
                alt={showPassword ? 'Hide' : 'Show'}
                style={{ width: '20px', height: '20px' }}
              />
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.password}</div>
          )} */}

          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '10px',
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'UPDATE PROFILE'}
          </button>

          <ToastContainer
            toastStyle={{
              marginTop: '4rem',
              borderRadius: '10px',
              backgroundColor: 'white',
              textAlign: 'center',
            }}
            closeButton={false}
            hideProgressBar={false}
            autoClose={2000}
            position="top-center"
          />
        </form>
      </Modal>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button style={modalStyles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '14px',
    width: '65%',
    height: '80%',
    overflow: 'hidden',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '1px',
    right: '1px',
    border: 'none',
    borderRadius: '25px',
    background: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#cfcfcf',
  },
};

export default Profile;

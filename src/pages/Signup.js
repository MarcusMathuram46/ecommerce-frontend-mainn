import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../features/user/userSlice';
import CustomInput from '../components/CustomInput';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name cannot be empty'),
  lastName: Yup.string().required('Last name cannot be empty'),
  email: Yup.string().email('Email is not valid').required('Email cannot be empty'),
  mobile: Yup.string().required('Mobile number cannot be empty').matches(
    /^(91|0)?[6-9]\d{9}$/,
    'Invalid mobile number'
  ),
  password: Yup.string()
    .required('Password cannot be empty')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters'
    ),
});

const Signup = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // console.log('Form values:', values);
        // Dispatch the registerUser action creator
        await dispatch(registerUser(values));
        // If registration is successful, redirect to login page
        navigate("/login");
      } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
        // Provide feedback to the user about the registration error
        // For example, display an error message on the form or use a notification system
        // You can also update the state to display an error message to the user
        // For example: setError('Registration failed. Please try again.');
      } finally {
        // Reset form submission state
        setSubmitting(false);
      }
    },    
  });

  useEffect(() => {
    if (authState.createdUser !== undefined && !authState.isError) {
      navigate('/login');
    }
  }, [authState, navigate]);

  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Register" />
      <Container class1="login-wrapper py-5" style={{ backgroundColor: '#7985c9' }}>
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Register</h3>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="error">{formik.errors.firstName}</div>
                )}
                <CustomInput
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="error">{formik.errors.lastName}</div>
                )}
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Phone number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="error">{formik.errors.mobile}</div>
                )}
                <div className="custom-input-password">
                  <CustomInput
                    type={isShowPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="error">{formik.errors.password}</div>
                  )}
                  <span onClick={() => setIsShowPassword(!isShowPassword)}>
                    {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>

                <div>
                  <div className="d-flex justify-content-center align-items-center gap-15">
                  <button className="button border-0 signIn" type="submit" disabled={formik.isSubmitting}>
                      {formik.isSubmitting ? 'Submitting...' : 'Register'}
                    </button>
                    <Link to="/login" className="button signup">
                      Log in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;

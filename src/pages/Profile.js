import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta"; 
import Container from "../components/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetState, updateProfile } from "../features/user/userSlice";
import { useState } from "react";
// import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

let profileSchema = Yup.object().shape({
  firstName: Yup.string().required("They cannot be left blank"),
  lastName: Yup.string().required("Name cannot be blank"),
  email: Yup.string()
    .email("Email is not available")
    .required("Email cannot be blank"),
  mobile: Yup.string()
    .required("Phone number can not be left blank")
    .matches(/^(91|0[6-9])+([0-9]{9})$/, "Invalid phone number"),
});

const Profile = () => {
  const getTokenFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null

   const config2 = {
      headers: {
         'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
         'Accept': 'application/json'
      }
   }

  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);

  const userState = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    dispatch(resetState());
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstName || "",
      lastName: userState?.lastName || "",
      email: userState?.email || "",
      mobile: userState?.mobile || "",
      address: userState?.address || "",
      city: userState?.city || "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile({ data: values, config2: config2 }));
      setEdit(true);
    },
  });
  return (
    <>
      <Meta title={"My-Profile"} />
      <BreadCrumb title="my profile" />
      <Container
        class1="my-profile-wrapper home-wrapper-2 py-5"
        style={{ backgroundColor: "#7985c9" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="my-profile-card">
              <div>
                <h3 className="my-3 section-heading text-center">my profile</h3>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <p
                    onClick={() => setEdit(false)}
                    className="btn-change-password mb-0 w-50 text-center"
                  >
                    Edit information
                  </p>
                  <Link
                    to="/change-password"
                    className="btn-change-password w-50 text-center"
                  >
                    Change Password?
                  </Link>
                </div>
              </div>
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="example2" className="form-label">
                      FirstName
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      disabled={edit}
                      className="form-control"
                      id="example2"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                    />
                    <div className="error">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="example1" className="form-label">
                      LastName
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      disabled={edit}
                      className="form-control"
                      id="example1"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                    />
                    <div className="error">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      disabled={edit}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail2" className="form-label">
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      disabled={edit}
                      className="form-control"
                      id="exampleInputEmail2"
                      aria-describedby="emailHelp"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="example3" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      disabled={edit}
                      className="form-control"
                      id="example3"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />
                    <div className="error">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="example3" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      disabled={edit}
                      className="form-control"
                      id="example3"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />
                    <div className="error">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  {edit === false && (
                    <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                      <button
                        type="submit"
                        className="button signIn border-0 edit-profile"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;

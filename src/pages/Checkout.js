import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
// import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createAnOrder,
  deleteUserCart,
  updateProfile,
} from "../features/user/userSlice";
// import { PayPalButton } from "react-paypal-button-v2";
import { paymentService } from "../features/payment/paymentService";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

let shippingSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  mobile: Yup.string()
    .required("Phone number is required")
    .matches(/^(91|0[6-9])+([0-9]{9})$/, "Invalid phone number"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state.auth);

  const [totalAmount, setTotalAmount] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // The default is payment upon receipt
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    let sumPriceAfterDiscount = 0;
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      sumPriceAfterDiscount =
        sumPriceAfterDiscount +
        Number(cartState[index].quantity) * cartState[index].priceAfterDiscount;
      items.push({
        product: cartState[index].productId?._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color,
        price: cartState[index].price,
        priceAfterDiscount: cartState[index].priceAfterDiscount,
      });
    }
    setTotalAmount(sumPriceAfterDiscount);
    setCartProductState(items);
  }, [cartState]);

  useEffect(() => {
    if (
      authState?.orderedProduct?.createdOrder !== null &&
      authState?.orderedProduct?.message === "SUCCESS"
    ) {
      dispatch(deleteUserCart());
      navigate("/my-orders");
    } else if (
      authState?.orderedProduct?.message === "ERR" &&
      authState?.orderedProduct?.product.length > 0
    ) {
      navigate("/cart");
    }
  }, [authState]);

  const deliveryPrice = useMemo(() => {
    if (totalAmount >= 2000000 && totalAmount < 5000000) {
      return 10000;
    }
    if (totalAmount === 0 || totalAmount >= 5000000) {
      return 0;
    } else {
      return 20000;
    }
  }, [totalAmount]);

  const formik = useFormik({
    initialValues: {
      firstName: authState?.user?.firstName || "",
      lastName: authState?.user?.lastName || "",
      address: authState?.user?.address || "",
      city: authState?.user?.city || "",
      mobile: authState?.user?.mobile || "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      if (
        values.firstName !== authState?.user?.firstName ||
        values.lastName !== authState?.user?.lastName ||
        values.address !== authState?.user?.address ||
        values.city !== authState?.user?.city ||
        values.mobile !== authState?.user?.mobile
      ) {
        dispatch(updateProfile(values));
      }
      setTimeout(() => {
        dispatch(
          createAnOrder({
            itemsPrice: totalAmount, // Calculate the total price in the cart
            shippingPrice: deliveryPrice,
            totalPrice: totalAmount + deliveryPrice,
            orderItems: cartProductState, // Calculate the price for each product in the cart
            paymentMethod:
              paymentMethod === "COD"
                ? "Pay on delivery"
                : paymentMethod === "paypal-card"
                ? "Pay with Paypal"
                : "",
            shippingInfo: values,
          })
        );
      }, 500);
    },
  });

  // PAY WITH PAYPAL
  const onSuccessPaypal = (details, data) => {
    // console.log("details, data: ", details, data);
    dispatch(
      createAnOrder({
        itemsPrice: totalAmount, // Calculate the total price in the cart
        shippingPrice: deliveryPrice,
        totalPrice: totalAmount + deliveryPrice,
        orderItems: cartProductState, // Calculate the price for each product in the cart
        paymentMethod:
          paymentMethod === "COD"
            ? "Payment upon delivery."
            : paymentMethod === "paypal-card"
            ? "Payment with Paypal"
            : "",
        shippingInfo: formik.values,
        isPaid: true,
        paidAt: details.update_time,
      })
    );
  };

  const addPaypalScript = async () => {
    const { data } = await paymentService.getConfig(); //get Client_id from DB
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const exchangeRate = 24265; // Exchange rate
  const totalAmountUSD = (totalAmount + deliveryPrice) / exchangeRate;
  const convertTotalAmountUSD = Math.round(totalAmountUSD * 10) / 10;
  return (
    <>
      <Meta title={"Checkout"} />
      <BreadCrumb title="Payment" />
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-md-8">
            <div className="checkout-left-data">
              <h4 className="mb-3">Delivery information</h4>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-wrap gap-15 justify-content-between"
              >
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last name"
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="d-flex justify-content-between gap-15 w-100">
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Phone number"
                      className="form-control"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                </div>
                <div className="w-100 pb-3 border-bottom">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100 border-bottom py-4">
                  <h4 className="mb-3">Products</h4>
                  {cartState &&
                    cartState?.map((item, index) => {
                      let discountPercent =
                        100 - (item?.priceAfterDiscount / item?.price) * 100;
                      return (
                        <div
                          className="d-flex gap-10 py-3 align-items-center border-bottom checkout-product-mobile"
                          key={index}
                        >
                          <div className="w-75 d-flex gap-30">
                            <div className="position-relative">
                              <div>
                                <span
                                  style={{ top: "-10px", right: "-10px" }}
                                  className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                >
                                  {item?.quantity}
                                </span>
                                <img
                                  src={item?.productId?.images[0]?.url}
                                  width={100}
                                  height={100}
                                  alt="product"
                                />
                              </div>
                            </div>
                            <div>
                              <h5 className="total-price">
                                {item?.productId?.title}
                              </h5>
                              <p className="total-price">
                                {item?.color?.title}
                              </p>
                            </div>
                          </div>
                          <div className="w-25 text-center price-product-mobile">
                            <h5
                              className="total"
                              style={{
                                color:
                                  item?.priceAfterDiscount !== item?.price
                                    ? "gray"
                                    : "red",
                              }}
                            >
                              {item?.priceAfterDiscount !== item?.price ? (
                                <del>
                                  {item?.price * item?.quantity
                                    ? (
                                        item?.price * item?.quantity
                                      ).toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                      })
                                    : "₹"}
                                </del>
                              ) : item?.price * item?.quantity ? (
                                (item?.price * item?.quantity).toLocaleString(
                                  "en-IN",
                                  {
                                    style: "currency",
                                    currency: "INR",
                                  }
                                )
                              ) : (
                                "₹"
                              )}
                            </h5>
                            {item?.priceAfterDiscount !== item?.price && (
                              <div className="d-flex gap-1 justify-content-center">
                                <h5 className="total" style={{ color: "red" }}>
                                  {item?.priceAfterDiscount * item?.quantity
                                    ? (
                                        item?.priceAfterDiscount *
                                        item?.quantity
                                      ).toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                      })
                                    : "₹"}
                                </h5>
                                <h6
                                  style={{ color: "#434141", fontSize: "14px" }}
                                >{`(-${discountPercent}%)`}</h6>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center checkout-navigate-mobile">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Back to cart
                    </Link>
                    <Link to="/product" className="button button-navigate">
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-sm-6 col-md-12 border-bottom py-4">
                <h4 className="mb-3">Payment method</h4>
                <div className="form-check">
                  <input
                    type="radio"
                    id="COD"
                    name="payment"
                    value="COD"
                    className="me-2 form-check-input"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  />
                  <label htmlFor="COD">Payment upon delivery</label>
                  <br />
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="paypal-card"
                    className="me-2 form-check-input"
                    checked={paymentMethod === "paypal-card"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  />
                  <label htmlFor="card">Pay with Paypal</label>
                  <br />
                </div>
              </div>
              <div className="col-sm-6 col-md-12 border-bottom py-4">
                <h4 className="mb-3">Payment</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Total amount</p>
                  <p className="total-price">
                    {totalAmount
                      ? totalAmount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })
                      : "0 ₹"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping fee</p>
                  <p className="mb-0 total-price">
                    {totalAmount
                      ? deliveryPrice.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })
                      : 0}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between align-items-center pt-4">
                <h4 className="total">Total amount</h4>
                <h5 className="total-price">
                  {totalAmount
                    ? (totalAmount + deliveryPrice).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })
                    : "0 ₹"}
                </h5>
              </div>
              {paymentMethod === "paypal-card" && sdkReady ? (
                // <PayPalButton
                //   amount={convertTotalAmountUSD}
                //   // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                //   onSuccess={onSuccessPaypal}
                //   onError={() => {
                //     alert("Error");
                //   }}
                // />
                <button/>
              ) : (
                <button
                  className="button border-0 w-100 mt-3"
                  type="submit"
                  style={{ backgroundColor: "#fd7e14" }}
                  onClick={formik.handleSubmit}
                >
                  Place an order
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;

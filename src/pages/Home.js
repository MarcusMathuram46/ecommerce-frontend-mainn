import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Meta from "../components/Meta";
// import BlogCard from "../components/BlogCard";
// import ProductCard from "../components/ProductCard";
// import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import {
  addToWishlist,
  getAllProducts,
  getCategories,
} from "../features/products/productSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from 'antd';

import slider1 from '../images/slider1.png';
import slider2 from '../images/slider2.jpg';
import slider3 from '../images/slider3.jpg';
import slider4 from '../images/slider4.jpg';

// special product
// import wish from '../images/wish.svg';
// import wishlist from '../images/wishlist.svg';
import watch from '../images/watch.jpg';
// import watch2 from '../images/watch-1.avif';
import ReactStars from "react-rating-stars-component";
// import prodcompare from '../images/prodcompare.svg';
// import addcart from '../images/add-cart.svg';
// import view from '../images/view.svg';
import { getAllCoupons } from "../features/coupon/couponSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getUserProductWishlist } from "../features/user/userSlice";
// special product end

const Home = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const arrImagesSlider = [slider1, slider2, slider3, slider4];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const authState = useSelector((state) => state?.auth);
  const blogState = useSelector((state) => state?.blog?.blogs);
  const productState = useSelector(
    (state) => state?.product?.products?.product
  );
  const couponState = useSelector((state) => state.coupon?.coupons);
  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const addedWishlistState = useSelector(
    (state) => state?.product?.addToWishlist
  );
  const pCategoryState = useSelector((state) => state?.product?.pCategories);

  useEffect(() => {
    getBlogs();
    getProducts();
    dispatch(getAllCoupons());
    dispatch(getCategories());
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  useEffect(() => {
    dispatch(getUserProductWishlist(config2));
  }, [addedWishlistState]);

  const addToWishList = (id) => {
    dispatch(addToWishlist({ id, config2 }));
  };
  
  return (
    <>
      <Meta title="Ecommerce App" />
      <Container class1="home-wrapper-1 py-3">
        <div className="row">
          <div className="col-12">
            <Slider {...settings}>
              {arrImagesSlider.map((image, index) => {
                return (
                  <div key={index}>
                    <Image
                      src={image}
                      alt="slider"
                      width="100%"
                      preview={false}
                      height="250px"
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          {/* <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>
                  From $999.00 or $41.62/mo. <br />
                  for 24 mo. Footnote*
                </p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>BEST SALE</h4>
                  <h5>Laptops Max</h5>
                  <p>
                    From $1699.00 or  <br /> $64.62/mo.
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>New arrival</h4>
                  <h5>Buy iPad air</h5>
                  <p>
                    From $599 or <br /> $49.91/mo. for 12 mo. *
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>15% off</h4>
                  <h5>Smartwatch 7</h5>
                  <p>
                    Shop the latest band  <br /> styles and colors.
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Free engraving</h4>
                  <h5> AirPods max</h5>
                  <p>
                    High-fidelity playback & <br /> ultra-low distortion
                  </p>
                </div>
              </div>

            </div>
          </div> */}
        </div>
      </Container>
      <Container className="home-wrapper-2 py-3 home-page">
  <div className="row">
    <div className="col-12">
      <h3 className="section-heading">Product Categories</h3>
    </div>
    <div className="col-12">
      <div className="categories d-flex justify-content-between flex-wrap align-items-center">
        {pCategoryState &&
          pCategoryState.map((category, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate("/product", { state: category?.title })}
                style={{ cursor: "pointer" }}
              >
                <div className="category-images">
                  {category.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image.url}
                      alt={`Image ${idx}`}
                      className="d-block"
                      style={{ height: "75px", margin: "0 auto 8px" }}
                    />
                  ))}
                </div>
                <p style={{ fontWeight: "600", textAlign: "center" }}>
                  {category?.title}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  </div>
</Container>

      <Container class1="marquee-wrapper py-3 home-wrapper-2 home-page">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Well-Known Brands</h3>
          </div>
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-xiaomi.png" alt="xiaomi" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-levoit.png" alt="levoit" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-sharp.png" alt="sharp" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-dyson.png" alt="dyson" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="LG" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="samsung" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="apple" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper pt-3 pb-4 home-wrapper-2 home-page">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading mb-0">Featured Products</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "Featured") {
                let priceAfterDiscount = item?.price;
                let discountPercent = 0;
                let isShowPriceDiscount = false;
                for (let j = 0; j < couponState.length; j++) {
                  if (item._id === couponState[j].product?._id) {
                    // Is there a discount code?
                    const currentDate = new Date();
                    const startDate = new Date(couponState[j].start);
                    const endDate = new Date(couponState[j].expiry);
                    if (currentDate >= startDate && currentDate <= endDate) {
                      //Is there an expiration date for the promotion?
                      discountPercent = couponState[j].discount;
                      priceAfterDiscount =
                        (priceAfterDiscount * (100 - couponState[j].discount)) /
                        100;
                      isShowPriceDiscount = true;
                    }
                    break;
                  }
                }
                let alreadyAddedToWishlist = false;
                for (let i = 0; i < wishlistState?.length; i++) {
                  if (item._id === wishlistState[i]?._id) {
                    // Have you added it to your wishlist?
                    alreadyAddedToWishlist = true;
                    break;
                  }
                }
                return (
                  <div
                    key={index}
                    className="col-xl-2-4 col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-3 home-product-card"
                    disabled={item?.quantity === 0}
                  >
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent btn-wishlist"
                          onClick={(e) => {
                            addToWishList(item?._id);
                          }}
                        >
                          <div>
                            {alreadyAddedToWishlist ? (
                              <FaHeart
                                className="fs-5 btn-wishlist-fill"
                                style={{ color: "red" }}
                              />
                            ) : (
                              <FaRegHeart className="fs-5 btn-wishlist-empty" />
                            )}
                          </div>
                        </button>
                      </div>
                      <Link
                        to={item?.quantity !== 0 && "/product/" + item?._id}
                        className="w-100"
                      >
                        <div className="product-image">
                          <img
                            src={
                              item?.images[0]?.url
                                ? item?.images[0]?.url
                                : watch
                            }
                            className="img-fluid mx-auto"
                            alt="product image"
                            width={160}
                            style={{ width: "100%", height: "100%" }}
                          />
                          <img
                            src={
                              item?.images[1]?.url
                                ? item?.images[1]?.url
                                : watch
                            }
                            className="img-fluid mx-auto"
                            alt="product image"
                            width={160}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                        <div className="product-details">
                          <h6 className="brand mt-2">{item?.brand}</h6>
                          <h5 className="title mb-1"> {item?.title}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={Number(item?.totalrating) || 5}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <div className="d-flex gap-1 price-on-mobile-home">
                            <p
                              className="price mb-0"
                              style={{
                                color: isShowPriceDiscount ? "gray" : "red",
                                fontSize: isShowPriceDiscount ? "14px" : "",
                              }}
                            >
                              {isShowPriceDiscount ? (
                                <del>
                                  {(item?.price).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                  })}
                                </del>
                              ) : (
                                (item?.price).toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })
                              )}
                            </p>
                            {isShowPriceDiscount && (
                              <div className="d-flex gap-1">
                                <p
                                  className="price mb-0"
                                  style={{ color: "red" }}
                                >
                                  {priceAfterDiscount
                                    ? priceAfterDiscount.toLocaleString(
                                        "en-IN",
                                        {
                                          style: "currency",
                                          currency: "INR",
                                        }
                                      )
                                    : "₹0"}
                                </p>
                                <h6
                                  style={{ color: "#434141" }}
                                >{`(-${discountPercent}%)`}</h6>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <div className='action-bar position-absolute'>
                          <div className='d-flex flex-column gap-15'>
                            <button className='border-0 bg-transparent'>
                              <img src={prodcompare} alt='compare' />
                            </button>
                            <Link to={'/product/' + item?._id} className='border-0 bg-transparent'>
                              <img src={view} alt='view' />
                            </Link>
                              <button className='border-0 bg-transparent'>
                              <img src={addcart} alt='addcart' />
                            </button>
                          </div>
                        </div> */}
                      </Link>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      {/* <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sake</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {data1?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.images} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
        </div>
      </Container> */}
    </>
  );
};

export default Home;

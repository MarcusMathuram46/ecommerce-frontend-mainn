/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "./../components/Container";

const Introduce = () => {
  return (
    <>
      <Meta title="Introduction" />
      <BreadCrumb title="Introduction" />
      <Container class1="contact-wrapper home-wrapper-2 pt-3 pb-4">
        <div className="row">
          <div className="col-12">
            <header className="p-2 bg-primary text-white text-center">
              <h3 className="mb-0">Welcome to our e-commerce website.</h3>
            </header>
            <section className="container my-4 contact-item">
              <h2>Introduction</h2>
              <p className="mb-0">
              Welcome to our cutting-edge e-commerce app, where convenience meets quality. Discover a seamless shopping experience right at your fingertips. Browse through a diverse range of products from renowned brands, carefully curated to cater to your every need. With user-friendly navigation and secure payment options, shopping has never been easier. Whether you're searching for the latest fashion trends, must-have gadgets, or everyday essentials, our app has you covered. Explore personalized recommendations tailored just for you, ensuring every purchase is a perfect fit. Elevate your shopping journey with our app and indulge in the ultimate convenience of online shopping, anytime, anywhere.
              </p>
            </section>
            <section className="container my-4 contact-item">
              <h2>"Gadget Galaxy: Explore, Shop, Enjoy!"</h2>
              <p>Our website offers a range of products, including:</p>
              <ul>
                <li>
                Mobile: Stay connected on the go with powerful communication and access to essential apps.
                </li>
                <li>Tablet: Versatile device for entertainment, productivity, and portable computing tasks.</li>
                <li>
                Laptop: Portable powerhouse for work, creativity, and multimedia consumption.
                </li>
                <li>
                TV: Central hub for entertainment, gaming, and streaming content on a big screen.
                </li>
                <li>
                Watch: Convenient wearable device for notifications, fitness tracking, and quick access to information.
                </li>
              </ul>
            </section>
            <section className="container my-4 contact-item">
              <h2>Quality and Reliability</h2>
              <p>
                We are committed to providing high-quality products from
                reputable brands. Our reliability ensures that you always
                receive the best products for your home. We inspect and evaluate
                each product to ensure they meet the highest quality standards.
              </p>
            </section>
            <section className="container my-4 contact-item">
              <h2>Why Choose Us?</h2>
              <p>
                We understand that you have many choices when shopping online.
                Why choose us?
              </p>
              <ul>
                <li>
                  Diversity: We offer a variety of different products so you can
                  find what you need.
                </li>
                <li>Quality: Our products meet high-quality standards.</li>
                <li>
                  Excellent customer service: Our customer support team is
                  always ready to assist you.
                </li>
                <li>
                  Great value: We are committed to providing products with the
                  best value for you.
                </li>
                <li>
                  Satisfy all needs: We bring you everything to make your home
                  smart and convenient.
                </li>
              </ul>
            </section>
            <section className="container my-4 contact-item">
              <h2>Start Shopping Now</h2>
              <p>
                Don't miss the chance to enhance your daily life with smart
                products for your home. Visit our website and start shopping
                now!
              </p>
            </section>
            <footer className="p-2 bg-primary text-white text-center">
              <p>Thank you for visiting our e-commerce website.</p>
              <p className="mb-0">
                Wishing you a wonderful shopping experience!
              </p>
            </footer>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Introduce;

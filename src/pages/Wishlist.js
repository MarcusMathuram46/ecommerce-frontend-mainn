import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
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

  const dispatch = useDispatch();

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const addedWishlistState = useSelector(
    (state) => state?.product?.addToWishlist
  );

  useEffect(() => {
    getWishlistFromDb();
  }, [addedWishlistState]);

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist(config2));
  };
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="row">
            {wishlistState && wishlistState.length === 0 && (
              <div className="text-center fs-3">
                There are no favorite products
              </div>
            )}
            <ProductCard data={wishlistState} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;

import axios from "axios";
import { base_url, config } from '../../utils/axiosconfig';

// console.log(JSON.parse(localStorage.getItem("customer")).token);
// console.log("token", localStorage.getItem("token"));

const getAllProducts = async (data) => {
  // console.log("data filter: ", data);
  // console.log(`product?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.tag ? `tags=${data?.tag}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}${data?.page ? `page=${data?.page}&&` : ""}${data?.limit ? `limit=${data?.limit}&&` : ""}`);

  //const response = await axios.get(`${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.tag ? `tags=${data?.tag}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}${data?.page ? `page=${data?.page}&&` : ""}${data?.limit ? `limit=${data?.limit}&&` : ""}`);
  const response = await axios.get(`${base_url}product?page=1&limit=10`);
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (data) => {
  const response = await axios.put(`${base_url}product/wishlist`, { prodId: data.id }, data.config2);
  if (response.data) {
    return response.data;
  }
}

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
}

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  // console.log(response);
  return response.data;
};

export const productService = {
  getAllProducts,
  addToWishlist,
  getSingleProduct,
  rateProduct,
  getProductCategories,

}
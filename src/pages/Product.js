/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getCategories } from '../features/products/productSlice';
import { useLocation } from 'react-router-dom';
import { AiFillFilter, AiOutlineClose } from 'react-icons/ai';
import { Pagination } from 'antd';

const Product = () => {
  const location = useLocation();


  const [grid, setGrid] = useState(4);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);

  // Filter states
  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState("title");

  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 10
});

console.log('paginate', paginate);
  const pCategoryState = useSelector((state) => state?.product?.pCategories);


  //------------------------------------------------ useEffect start---------------------------------------------------- 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  const data1 = [{
          "id": "65d34112215d927f57b55c77",
          "title": "Apple Macbook Pro",
          "slug": "apple-macbook-pro",
          "description": "<p>Apple Macbook Pro</p>",
          "price": 200000,
          "brand": "Apple",
          "category": "Laptop",
          "tags": "Special",
          "color": "Black",
          "quantity": 20,
          "sold": 0,
          "numViews": 0,
          "size": "15",
          "weight": "1000",
          "power": "240",
          "lifespan": "8",
          "warranty": "24",
          "totalrating": "0",
          "images":[{"url":"../images/famous-2.webp"}],
          "supplierID": "65c3d95bfd41134f9d0554db",
          "ratings": [],
          "createdAt": "2024-02-19T11:52:50.874Z",
          "updatedAt": "2024-02-19T11:52:50.874Z"
      }];


  //------------------------------------------------ useEffect end---------------------------------------------------- 


  // FUNCTION
  const removeAllFilter = () => {
    setTag(null);
    setCategory(null);
    setBrand(null);
    setMinPrice(null);
    setMaxPrice(null);
    setSort("title");
    if (location.state) {
      delete location.state;
    }
  }

  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current, limit: pageSize })
  };

  return (
    <div>
      <Meta title='Our Store' />
      <BreadCrumb title='Product' />
      <Container class1='store-wrapper home-wrapper-2 py-4'>
        <div className='row'>
          <div className='col-lg-3'>
            <div className='d-none d-lg-block'>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Filter by Category</h3>
                <div>
                  <ul className='ps-0 mb-0'>
                    {
                      pCategoryState && pCategoryState.map((item, index) => {
                        return <li key={index} onClick={() => setCategory(item?.title)}>{item?.title}</li>
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Filter By</h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div className='d-flex align-items-center gap-10'>
                    <div className="form-floating">
                      <input type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="from"
                        value={minPrice || ''}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input type="number"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="to"
                        value={maxPrice || ''}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput1">Arrive</label>
                    </div>
                  </div>
                </div>
                <div className='mt-4 mb-3'>
                  <h3 className='sub-title'>Tag</h3>
                  <div>
                    <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                      {
                        tags && [...new Set(tags)].map((item, index) => {
                          return (
                            <span onClick={() => setTag(item)} key={index} className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                              {item}
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className=' mb-3'>
                  <h3 className='sub-title'>Trademark</h3>
                  <div>
                    <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                      {
                        brands && [...new Set(brands)].map((item, index) => {
                          return (
                            <span onClick={() => setBrand(item)} key={index} className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                              {item}
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OVERLAY */}
            <input type="checkbox" hidden className="header__mobile-filter-checkbox" id="mobile-filter-checkbox"></input>

            <label htmlFor="mobile-filter-checkbox" className="header__overlay"></label>

            <div className="header__mobile">
              <label htmlFor="mobile-filter-checkbox" className="header__mobile-close">
                <AiOutlineClose />
              </label>
              <ul className="header__mobile-list">
                <li>
                  <h3 className='filter-title header__mobile-link mb-0' style={{ borderBottom: "0" }}>Category</h3>
                </li>
                {
                  pCategoryState && pCategoryState.map((item, index) => {
                    return <li className="header__mobile-link py-2" key={index} onClick={() => setCategory(item?.title)}>{item?.title}</li>
                  })
                }

                <li>
                  <h3 className='filter-title header__mobile-link mb-0 mt-2' style={{ borderBottom: "0" }}>Price</h3>
                </li>
                <li>
                  <div className="header__mobile-link pt-0">
                    <div className='d-flex align-items-center gap-10'>
                      <div className="form-floating">
                        <input type="number"
                          className="form-control"
                          id="floatingInput"
                          placeholder="from"
                          value={minPrice || ''}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <label htmlFor="floatingInput">From</label>
                      </div>
                      <div className="form-floating">
                        <input type="number"
                          className="form-control"
                          id="floatingInput1"
                          placeholder="to"
                          value={maxPrice || ''}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <label htmlFor="floatingInput1">Arrive</label>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <h3 className='filter-title header__mobile-link mb-0 mt-2' style={{ borderBottom: "0" }}>Tag</h3>
                </li>
                <li className="header__mobile-link">
                  {
                    tags && [...new Set(tags)].map((item, index) => {
                      return (
                        <span onClick={() => setTag(item)} key={index} className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                          {item}
                        </span>
                      )
                    })
                  }
                </li>

                <li>
                  <h3 className='filter-title header__mobile-link mb-0 mt-2' style={{ borderBottom: "0" }}>Trademark</h3>
                </li>
                <li className="header__mobile-link">
                  {
                    brands && [...new Set(brands)].map((item, index) => {
                      return (
                        <span onClick={() => setBrand(item)} key={index} className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                          {item}
                        </span>
                      )
                    })
                  }
                </li>

                <li>
                  {
                    (tag !== null || category !== null || brand !== null || minPrice !== null || maxPrice !== null || sort !== "title") &&
                    <label htmlFor="mobile-filter-checkbox"
                      className="border mt-2 bg-success text-white text-uppercase text-center header__mobile-link"
                    >
                      OK
                    </label>
                  }
                </li>
              </ul>
            </div>
            {/* END OVERLAY */}

          </div>
          <div className='col-12 col-lg-9'>
            <div className='filter-sort-grid col-12'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-3'>
                  <div className='d-block d-lg-none ps-sm-2 ps-md-4 fs-2 text-dark'>
                    <label htmlFor='mobile-filter-checkbox'><AiFillFilter /></label>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='mb-0 d-block' style={{ whiteSpace: "nowrap" }}>Arrange</p>
                    <select
                      name=''
                      className='form-control form-select'
                      id=''
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="title">Characters, A-Z</option>
                      <option value="-title">Characters, Z-A</option>
                      <option value="price">Price, low to high</option>
                      <option value="-price">Price, high to low</option>
                      <option value="createdAt">Days, old to new</option>
                      <option value="-createdAt">Day, new to old</option>
                    </select>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <p className='totalproducts mb-0'>{productState?.productCount} product</p>
                  <div className='d-none d-xl-flex gap-10 align-items-center grid'>
                    <img onClick={() => setGrid(3)}
                      src='images/gr4.svg'
                      className='d-block img-fluid'
                      alt='grid'
                    />
                    <img onClick={() => setGrid(4)}
                      src='images/gr3.svg'
                      className='d-block img-fluid'
                      alt='grid'
                    />
                    <img onClick={() => setGrid(6)}
                      src='images/gr2.svg'
                      className='d-block img-fluid'
                      alt='grid'
                    />
                    <img onClick={() => setGrid(12)}
                      src='images/gr.svg'
                      className='d-block img-fluid'
                      alt='grid'
                    />
                  </div>
                </div>
              </div>
            </div>
            {
              (tag !== null || category !== null || brand !== null || minPrice !== null || maxPrice !== null || sort !== "title") && (
                <div className='filter-sort-grid mb-3'>
                  <div className='filter-title mb-2'>Filtering by</div>
                  <div className='d-flex align-items-center gap-2 flex-wrap'>
                    {
                      tag !== null && <button className="btn-filter" onClick={() => { setTag(null) }}>× {tag}</button>
                    }{
                      category !== null && <button className="btn-filter" onClick={() => { setCategory(null) }}>× {category}</button>
                    }{
                      brand !== null && <button className="btn-filter" onClick={() => { setBrand(null) }}>× {brand}</button>
                    }{
                      minPrice !== null && <button className="btn-filter" onClick={() => { setMinPrice(null) }}>× {minPrice}</button>
                    }{
                      maxPrice !== null && <button className="btn-filter" onClick={() => { setMaxPrice(null) }}>× {maxPrice}</button>
                    }{
                      sort !== "title" && <button className="btn-filter" onClick={() => { setSort("title") }}>× {sort}</button>
                    }
                    <button className="btn-filter" onClick={() => { removeAllFilter() }}>× Deselect all</button>
                  </div>
                </div>
              )
            }
            <div className='products-list pb-3 col-12 home-page'>
              <div className='row'>
                <ProductCard data={data1} grid={grid} />
              </div>
            </div>
            <div className='col-12 text-center mt-2'>
              <Pagination defaultCurrent={paginate?.page} total={productState?.productCount} onChange={onChange} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Product;
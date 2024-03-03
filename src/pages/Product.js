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
import { SpinningCircles } from 'react-loading-icons'

const Product = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);


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

// console.log('paginate', paginate);
  const pCategoryState = useSelector((state) => state?.product?.pCategories);


  //------------------------------------------------ useEffect start---------------------------------------------------- 
  const dispatch = useDispatch();

useEffect(() => {
  setLoading(true); // Set loading to true before fetching data
  dispatch(getAllProducts()).then(() => setLoading(false)); // Dispatch action and set loading to false when data is fetched
}, []); // Run only once when the component mounts


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
  
      const data2 = [{
        "id": "65c21f6fa39a819c95ba89c9",
        "title": "Samsung Galaxy Watch4",
        "slug": "samsung-galaxy-watch4",
        "description": "Samsung Galaxy Watch4 Bluetooth(4.0 cm, White, Compatible with Android only",
        "price": 12000,
        "brand": "Samsung",
        "category": "Watch",
        "tags": "product",
        "color": "65c2137da39a819c95ba8966",
        "quantity": 100,
        "sold": 0,
        "numViews": 0,
        "size": "4.0cm",
        "weight": "26 gram",
        "lifespan": "4 years",
        "warranty": "12 month",
        "totalrating": "0",
        "supplierID": "65b9e615dfbf90646b1d6efc",
        "images": [{"url":"../images/watch.jpg"}],
        "ratings": [],
        "createdAt": "2024-02-06T12:00:47.401Z",
        "updatedAt": "2024-02-06T12:10:03.079Z"
    }];

    const data3 =[{
      "_id": "65c223eba39a819c95ba89d8",
        "title": "Apple Iphone 13",
        "slug": "apple-iphone-13",
        "description": "Apple Iphone 13(red,128 GB)",
        "price": 53000,
        "brand": "Apple Iphone 13",
        "category": "Mobile",
        "tags": "product",
        "color": "65c21bcfa39a819c95ba89a1",
        "quantity": 100,
        "sold": 0,
        "numViews": 0,
        "size": "6.1-inch",
        "weight": " 174gram",
        "lifespan": "8 years",
        "warranty": "24 month",
        "totalrating": "0",
        "supplierID": "65b9e615dfbf90646b1d6efc",
        "images": [{"url":"../images/im5g.jpeg"}],
        "ratings": [],
        "createdAt": "2024-02-06T12:19:55.382Z",
        "updatedAt": "2024-02-06T12:31:35.493Z"
    }]
    const data4 =[{
      "id": "65c2265aa39a819c95ba89e7",
        "title": "Xiamomi Pad 5",
        "slug": "xiamomi-pad-5",
        "description": "Xiamomi Pad 5",
        "price": 23000,
        "brand": "Xiamomi",
        "category": "Mobile",
        "tags": "product",
        "color": "65c22628a39a819c95ba89e3",
        "quantity": 100,
        "sold": 0,
        "numViews": 0,
        "size": "11-inch",
        "weight": " 300gram",
        "lifespan": "5 years",
        "warranty": "24 month",
        "totalrating": "0",
        "supplierID": "65b9e615dfbf90646b1d6efc",
        "images": [{"url":"../images/tab3.jpg"}],
        "ratings": [],
        "createdAt": "2024-02-06T12:30:18.577Z",
        "updatedAt": "2024-02-06T12:30:18.577Z"
    }]

    const data5 =[{
      "_id": "65e3754024c24e70987100e8",
      "title": "Apple Watch Ultra",
      "slug": "apple-watch-ultra",
      "description": "hey this is Apple Watch",
      "price": 100000,
      "brand": "Apple",
      "category": "Watch",
      "tags": "product",
      "color": "65c2137da39a819c95ba8966",
      "quantity": 100,
      "sold": 0,
      "numViews": 0,
      "size": "3inch",
      "weight": "250gram",
      "lifespan": "7years",
      "warranty": "24months",
      "totalrating": "0",
      "supplierID": "65c3d95bfd41134f9d0554db",
      "images": [{"url":"../images/catbanner-02.jpg"}],
      "ratings": [],
      "createdAt": "2024-03-02T18:51:44.601Z",
      "updatedAt": "2024-03-02T18:51:44.601Z"
    }]

    const data6 =[{
      "id": "65e376a424c24e70987100ee",
      "title": "Apple 13 Pro Max",
    "slug": "apple-13-pro-max",
    "description": "hey this is Apple Iphone",
    "price": 150000,
    "brand": "Apple",
    "category": "Mobile",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "6inch",
    "weight": "750gram",
    "lifespan": "10years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/famous-3.webp"}],
    "ratings": [],
    "createdAt": "2024-03-02T18:57:40.260Z",
    "updatedAt": "2024-03-02T18:57:40.260Z",
    }]

    const data7 =[{
      "id": "65e3778824c24e70987100f2",
      "title": "Apple Watch se",
    "slug": "apple-watch-se",
    "description": "hey this is Apple Watch se",
    "price": 35000,
    "brand": "Apple",
    "category": "Watch",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "2inch",
    "weight": "150gram",
    "lifespan": "7years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/img2.jpeg"}],
    "ratings": [],
    "createdAt": "2024-03-02T19:01:28.549Z",
    "updatedAt": "2024-03-02T19:01:28.549Z",
    }]

    const data8 =[{
      "id": "65e378e424c24e70987100fa",
      "title": "Sony Alpha 6",
      "slug": "sony-alpha-6",
      "description": "hey this is Sony Alpha 6 Camera",
      "price": 50000,
      "brand": "Sony",
      "category": "camera",
      "tags": "product",
      "color": "[65c2137da39a819c95ba8966]",
      "quantity": 100,
      "sold": 0,
      "numViews": 0,
      "size": "4inch",
      "weight": "450gram",
      "lifespan": "10years",
      "warranty": "24months",
      "totalrating": "0",
      "supplierID": "65c3d95bfd41134f9d0554db",
      "images": [{"url":"../images/camera1.jpg"}],
      "ratings": [],
      "createdAt": "2024-03-02T19:07:16.618Z",
      "updatedAt": "2024-03-02T19:07:16.618Z",
        
    }]

    const data9 = [{
      "id": "65e4c4be5926f6b2ea38212c",
      "title": "Htc U play",
    "slug": "htc-u-play",
    "description": "hey this is Htc U play",
    "price": 15000,
    "brand": "Htc",
    "category": "mobile",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "5inch",
    "weight": "650gram",
    "lifespan": "7years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/mobile.jpg"}],
    "ratings": [],
    "createdAt": "2024-03-03T18:43:10.252Z",
    "updatedAt": "2024-03-03T18:43:10.252Z",
    "__v": 0
    }]

    const data10 = [{
      "id": "65e4c7245926f6b2ea382130",
      "title": "Iphone 14 plus",
    "slug": "iphone-14-plus",
    "description": "hey this is Apple iphone 14 plus",
    "price": 100000,
    "brand": "Apple",
    "category": "mobile",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "6inch",
    "weight": "650gram",
    "lifespan": "7years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/mobile1.png"}],
    "ratings": [],
    "createdAt": "2024-03-03T18:53:24.891Z",
    "updatedAt": "2024-03-03T18:53:24.891Z",
    }]

    const data11 = [{
      "id": "65e4df0d5926f6b2ea382134",
      "title": "Samsung Tv",
    "slug": "samsung-tv",
    "description": "hey this is Samsung Tv",
    "price": 100000,
    "brand": "Samsung",
    "category": "tv",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "40inch",
    "weight": "3kg",
    "lifespan": "10years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/tv.jpg"}],
    "ratings": [],
    "createdAt": "2024-03-03T20:35:25.645Z",
    "updatedAt": "2024-03-03T20:35:25.645Z",
    }]

    const data12 = [{
      "_id": "65e4e0975926f6b2ea38213c",
      "title": "Hp pavillion laptop",
    "slug": "hp-pavillion-laptop",
    "description": "hey this is Hp laptop",
    "price": 80000,
    "brand": "Hp",
    "category": "laptop",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "13inch",
    "weight": "1kg",
    "lifespan": "10years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/laptop.jpg"}],
    "ratings": [],
    "createdAt": "2024-03-03T20:41:59.945Z",
    "updatedAt": "2024-03-03T20:41:59.945Z",

    }]

    const data13 = [{
      "id": "65e4e29b5926f6b2ea382140",
      "title": "Apple Macbook Air",
    "slug": "apple-macbook-air",
    "description": "hey this is Apple Macbook Air",
    "price": 100000,
    "brand": "Apple",
    "category": "laptop",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "15inch",
    "weight": "2kg",
    "lifespan": "10years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/laptop1.jpg"}],
    "ratings": [],
    "createdAt": "2024-03-03T20:50:35.779Z",
    "updatedAt": "2024-03-03T20:50:35.779Z",
    }]

    const data14 = [{
      "id": "65e4ebae5926f6b2ea382148",
      "title": "Apple Airpods Pro",
    "slug": "apple-airpods-pro",
    "description": "hey this is Apple Airpods Pro",
    "price": 20000,
    "brand": "Apple",
    "category": "headphone",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "5inch",
    "weight": "500gram",
    "lifespan": "5years",
    "warranty": "24months",
    "totalrating": "0",
    "images": [{"url":"../images/acc.jpg"}],
    "supplierID": "65c3d95bfd41134f9d0554db",
    "ratings": [],
    "createdAt": "2024-03-03T21:29:18.258Z",
    "updatedAt": "2024-03-03T21:29:18.258Z",
      
    }]

    const data15 = [{
      "_id": "65e4ee335926f6b2ea38214c",
      "title": "Samsung NX20 Camera",
    "slug": "samsung-nx20-camera",
    "description": "hey this is Samsung NX20 Camera ",
    "price": 40000,
    "brand": "Samsung",
    "category": "Camera",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "3inch",
    "weight": "1000gram",
    "lifespan": "7years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/camera.jpg"}],
    "ratings": [],
    "createdAt": "2024-03-03T21:40:03.354Z",
    "updatedAt": "2024-03-03T21:40:03.354Z",
    }]

    const data16 = [{
      "id": "65e4ef0b5926f6b2ea382150",
      "title": "Apple Ipad",
    "slug": "apple-ipad",
    "description": "hey this is Apple Ipad ",
    "price": 40000,
    "brand": "Apple",
    "category": "tablet",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "12inch",
    "weight": "3000gram",
    "lifespan": "7years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/catbanner-03.jpg"}],
    "ratings": [],
    "createdAt": "2024-03-03T21:43:39.378Z",
    "updatedAt": "2024-03-03T21:43:39.378Z",
    }]

    const data17 = [{
      "id": "65e4efb55926f6b2ea382154",
      "title": "Samsung Galaxy headphone",
    "slug": "samsung-galaxy-headphone",
    "description": "hey this is Samsung Galaxy headphone",
    "price": 8000,
    "brand": "Samsung",
    "category": "headphone",
    "tags": "product",
    "color": "[65c2137da39a819c95ba8966]",
    "quantity": 100,
    "sold": 0,
    "numViews": 0,
    "size": "5inch",
    "weight": "3000gram",
    "lifespan": "7years",
    "warranty": "24months",
    "totalrating": "0",
    "supplierID": "65c3d95bfd41134f9d0554db",
    "images": [{"url":"../images/headphone.jpg"}],
    "ratings": [],
    "createdAt": "2024-03-03T21:46:29.665Z",
    "updatedAt": "2024-03-03T21:46:29.665Z",
    }]

    // const data18 = [{
    //   "id": "65e4f3d25926f6b2ea382158",
    //   "title": "Samsung Note",
    // "slug": "samsung-note",
    // "description": "hey this is Samsung Note",
    // "price": 120000,
    // "brand": "Samsung",
    // "category": "mobile",
    // "tags": "product",
    // "color": "[65c2137da39a819c95ba8966]",
    // "quantity": 100,
    // "sold": 0,
    // "numViews": 0,
    // "size": "6inch",
    // "weight": "2000gram",
    // "lifespan": "7years",
    // "warranty": "24months",
    // "totalrating": "0",
    // "supplierID": "65c3d95bfd41134f9d0554db",
    // "images": [{"url":"../images/samsung note11.jpg"}],
    // "ratings": [],
    // "createdAt": "2024-03-03T22:04:02.687Z",
    // "updatedAt": "2024-03-03T22:04:02.687Z",
    // }]


  //------------------------------------------------ useEffect end---------------------------------------------------- 


  // FUNCTION
  const removeAllFilter = () => {
    setLoading(true);

    setTimeout(() => {

      setTag(null);
      setCategory(null);
      setBrand(null);
      setMinPrice(null);
      setMaxPrice(null);
      setSort("title");
      if (location.state) {
        delete location.state;
      }
      setLoading(false);
    } , 1000 );
  };

    
    

  const onChange = (current, pageSize) => {
    setLoading(true);
    setTimeout(() => {
      setPaginate({ ...paginate, page: current, limit: pageSize });
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Meta title='Our Store' />
      <BreadCrumb title='Product' />
      {!loading ? (
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
                <ProductCard data={data2} grid={grid} />
                <ProductCard data={data3} grid={grid} />
                <ProductCard data={data4} grid={grid} />
                <ProductCard data={data5} grid={grid} />
                <ProductCard data={data6} grid={grid} />
                <ProductCard data={data7} grid={grid} />
                <ProductCard data={data8} grid={grid} />
                <ProductCard data={data9} grid={grid} />
                <ProductCard data={data10} grid={grid} />
                <ProductCard data={data11} grid={grid} />
                <ProductCard data={data12} grid={grid} />
                <ProductCard data={data13} grid={grid} />
                <ProductCard data={data14} grid={grid} />
                <ProductCard data={data15} grid={grid} />
                <ProductCard data={data16} grid={grid} />
                <ProductCard data={data17} grid={grid} />
                {/* <ProductCard data={data18} grid={grid} /> */}
              </div>
            </div>
            <div className='col-12 text-center mt-2'>
              <Pagination defaultCurrent={paginate?.page} total={productState?.productCount} onChange={onChange} />
            </div>
          </div>
        </div>
        
      </Container>
      ):(
      <SpinningCircles/>
      )}
    </div>
  )
}

export default Product;
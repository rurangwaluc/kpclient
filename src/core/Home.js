import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Card from "./UCard";
import { Link } from 'react-router-dom'
import { Col, Row, Button } from 'antd';
import Icon from '@ant-design/icons';
import ShowImage from './Tools/ShowImage';
import { getProducts, getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { addItem } from './cartHelpers';
import Menu from './Menu'
import Navbar from './Navbar'
import Footer from './Footer'
import img1 from '../img/phone1.jpg'
import img2 from '../img/phone2.jpg'
import img4 from '../img/a.jpg'
import img5 from '../img/b.jpg'
import img6 from '../img/c.jpg'
import img7 from '../img/e.jpg'
import img8 from '../img/e.jpg'
import img9 from '../img/f.jpg'

const API = process.env.REACT_APP_API_URL;

const { Meta } = Card;

const Home = (props) => {

  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerms, setSearchTerms] = useState("")
  const [categories, setCategories] = useState([]);

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [Product, setProduct] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [productsBySell, setProductsBySell] = useState([]);
  const [error, setError] = useState(false);
  // const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };


  const loadFilteredResults = newFilters => {
    // console.log(newFilters);
    getFilteredProducts(Skip, Limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);

      } else {
        setProductsByArrival(data.data);
        setProductsBySell(data.data);
        setSize(data.size);
        setSkip(0);
      }

    });
  };


  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  const loadProductsBySell = () => {
    getProducts('price').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };


  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
    init();
    loadFilteredResults(Skip, Limit, myFilters.filters);
    const variables = {
      skip: Skip,
      limit: Limit,
    }

    getProducts(variables)

  }, [])

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    // if (filterBy === "price") {
    //     let priceValues = handlePrice(filters);
    //     newFilters.filters[filterBy] = priceValues;
    // }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: myFilters,
      searchTerm: SearchTerms
    }
    getProducts(variables)
    setSkip(skip)
  }

  const renderCardByArrival = productsByArrival.map((product, index) => {



    const addToCart = () => {
      addItem(product, setRedirect(true));
      console.log('added');
    };
    return <div key={index} className="daily-product">


      <Link to="" className="daily-product-category">{product.brand}</Link>
      <div className="product-info-container">

        <div className="daily-product-description">
          <Link to={`/product/${product._id}`}>
            {product.title}
          </Link>
        </div>
        <div className="product-image">
          <Link to={`/product/${product._id}`}>
            <ShowImage images={product.images} />
          </Link>
        </div>
        <div className="price-container">
          <div className="view-price"><span>{`Rwf ${product.price}`}</span></div>
          {/* <button onClick={addToCart} className="add-to-cart"><i className="fas fa-cart-plus"></i></button> */}
        </div>
      </div>

      <div className="hover-container">
        <div className="add-to-compare">
          <Link to="/cart" onClick={addToCart} title="Add to Cart"><i className="fas fa-cart-plus"></i>Cart</Link>
        </div>
        <div className="add-to-wishlist">
          <Link to="" title="Add to WishList"><i className="far fa-heart"></i>WishList</Link>
        </div>
      </div>
    </div>

  })


  const renderCardBySell = productsBySell.map((product, index) => {
    const addToCart = () => {
      addItem(product, setRedirect(true));
      console.log('added');
    };

    return <div key={index} className="product-item">
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <ShowImage images={product.images} />
        </Link>
      </div>

      <div className="product-description">
        <div className="product-border">
          <div className="product-category">

            <Link to="" >{product.brand}</Link>
          </div>
          <div className="product-name">
            <Link to={`/product/${product._id}`}>
              {product.title}
            </Link>
          </div>

          <div className="price-container">
            <div className="view-price"><span>{`Rwf ${product.price}`}</span></div>
            {/* <button onClick={addToCart} className="add-to-cart"><i className="fas fa-cart-plus"></i></button> */}
          </div>
        </div>

        <div className="hover-container">
          <div className="add-to-compare">
            <Link to="/cart" onClick={addToCart} title="Add to Cart"><i className="fas fa-cart-plus"></i>Cart</Link>
          </div>
          <div className="add-to-wishlist">
            <Link to="" title="Add to WishList"><i className="far fa-heart"></i>WishList</Link>
          </div>
        </div>
      </div>



    </div>

  })


  return (
    <div>
      <a id="button" title="Back To Top"></a>
      <Menu />
      <Navbar />
      <div className="main-home">

        <section className="categories">
          {/* <h2><i className="fas fa-bars"></i>Categories</h2>
          <div className="main-home-categories">

            <Checkbox
              categories={categories}
              handleFilters={filters =>
                handleFilters(filters, "category")
              }
            />



          </div> */}
          {/* <a href=""><div className="other-ad"></div></a>
          <a href=""><div className="other-ad"></div></a> */}
        </section>
        <section className='slider-info'>
          <div className="slide-container">
            <div className="slides">
              <div className="slide">
                <a href="https://www.google.com/" className="slide current"><img src={img8} alt="" /></a>
              </div>
              <div className="slide">
                <a href="https://www.twitter.com/" className="slide"><img src={img5} alt="" /></a>
              </div>
              <div className="slide">
                <a href="https://www.amazon.com/" className="slide"><img src={img6} alt="" /></a>
              </div>
              <div className="slide">
                <a href="https://www.youtube.com/" className="slide"><img src={img7} alt="" /></a>
              </div>
              <div className="slide">
                <a href="https://www.netflix.com/" className="slide"><img src={img8} alt="" /></a>
              </div>
              <div className="slide">
                <a href="https://www.quora.com/" className="slide"><img src={img9} alt="" /></a>
              </div>


            </div>
            <div className="slide-controls">
              <button id="prev-btn">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button id="next-btn">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="other-categories">
            <div className="other-menu1">
              <a href="https://www.google.com/"><img src={img1} alt="" /></a>
            </div>
            <div className="other-menu2">
              <a href="https://www.youtube.com/"><img src={img2} alt="" /></a>

            </div>
            <div className="other-menu3">
              <a href="https://www.amazon.com/"><img src={img1} alt="" /></a>

            </div>
            <div className="other-menu2">
              <a href="https://www.youtube.com/"><img src={img2} alt="" /></a>

            </div>

          </div>
        </section>
        <section className="ads-bar">
          <a href=""><div className="ad1"></div></a>
          <a href=""><div className="ad2"></div></a>
        </section>
      </div>

      <div className="new-arrivals">
        <div className="arrivals-header">

          <div className="arrivals-title"> <h3>New Arrivals</h3></div>
        </div>
        <div className="new-products-container">

          {renderCardByArrival}



        </div>

      </div>
      <section className="best-sellers">
        <div className="mytabs">
          <div className="sellers-title">
            <h3>Best Sellers</h3>
          </div>
          <input type="radio" name="mytabs" id="tvs" />
          <label htmlFor="tvs">Televisions</label>

          <input type="radio" name="mytabs" id="watches" />
          <label htmlFor="watches">Watches</label>


          <input type="radio" name="mytabs" id="accessories" />
          <label htmlFor="accessories">Accessories</label>

          <input type="radio" name="mytabs" id="phones" defaultChecked="checked" />
          <label htmlFor="phones">Phones & Tablets</label>


          <div className="tab">
            <div className="content-container">
              {renderCardBySell}
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>

  )
};

export default Home;
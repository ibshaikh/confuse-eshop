import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './ProductDetails.css'

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProductDetails ,url , addToCart} = useContext(StoreContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      const productData = await fetchProductDetails(id);
      setProduct(productData);
    };

    getProductData();
  }, [fetchProductDetails, id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={`${url}/images/`+product.image} alt="" />
                <img src={`${url}/images/`+product.image} alt="" />
                <img src={`${url}/images/`+product.image} alt="" />
                <img src={`${url}/images/`+product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={`${url}/images/`+product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">₹{product.oldprice}</div>
                <div className="productdisplay-right-price-new">₹{product.price}</div>
            </div>
            <div className="productdisplay-right-description">
                {product.description}
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(id)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category :</span> {product.category}</p>
            <p className='productdisplay-right-category'><span>Tags :</span> Modern, Latest</p>
        </div>
    </div>
  )
};

export default ProductDetails;

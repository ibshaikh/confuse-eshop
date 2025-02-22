import React, { useContext } from 'react'
import './ProductItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, oldprice, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);


  return (
    <div className='product-item'>
        <div className="product-item-img-container">
        <Link to={`/product/${id}`} className='product-item-link'>
          <img src={url + "/images/" + image} alt="" className="product-item-image" />
        </Link>
            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className='product-item-counter'>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <Link to={`/product/${id}`} className='product-item-link'>
        <div className="product-item-info">
            <div className="product-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="product-item-desc">{description}</p>
            <div className="price">
            <div className="product-item-price">₹{price}</div>
            <div className="product-item-oldprice">₹{oldprice}</div>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default ProductItem
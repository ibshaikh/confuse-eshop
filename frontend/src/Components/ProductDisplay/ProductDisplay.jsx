import React, { useContext } from 'react'
import './ProductDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import ProductItem from '../ProductItem/ProductItem'

const ProductDisplay = ({category}) => {

    const {product_list} = useContext(StoreContext)

  return (
    <div className='product-display' id='product-display'>
        <h2>Top products</h2>
        <div className="product-display-list">
          {product_list.map((item,index)=>{
            {console.log(category,item.category);}
            if(category==="All" || category===item.category){
              return <ProductItem key={index} id={item._id} name={item.name} description={item.description} oldprice={item.oldprice} price={item.price} image={item.image} />  
            }            
          })}
        </div>

    </div>
  )
}

export default ProductDisplay
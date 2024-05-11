import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {


  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    category:"Men",
    oldprice:"",
    price:""    
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("oldprice",Number(data.oldprice))
    formData.append("price",Number(data.price))
    formData.append("image",image)
    const response = await axios.post(`${url}/api/product/add`,formData);
    if(response.data.success) {
      setData({
        name:"",
        description:"",
        category:"Men",
        oldprice:"",
        price:""    
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }
  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' required/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price ">
        <div className="add-category flex-col">
          <p>Product category</p>
          <select onChange={onChangeHandler} value={data.category} name="category" required>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Shoes">Shoes</option>
            <option value="Watches">Watches</option>
            <option value="Bags">Bags</option>
            <option value="Caps">Caps</option>
            <option value="Accessories">Accessories</option>
          </select>
          </div>
          <div className="old-price flex-col">
            <p>Old price</p>
            <input onChange={onChangeHandler} value={data.oldprice} type="Number" name="oldprice" placeholder='₹1000' required/>
          </div>
          <div className="new-price flex-col">
            <p>New price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='₹999' required/>
          </div>
        </div>
          <button type='submit' className='add-btn'>ADD PRODUCT</button>
      </form>
    </div>
  )
}

export default Add
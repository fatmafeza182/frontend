"use client"
import React, { useEffect, useState } from 'react'


const accountPage = () => {
  const [cartItems,setCartItems] = useState([]);
  const [favoriteItems,setFavoriteItems]=useState([]);
  

  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  },[])

useEffect(()=>{
  const favorite = JSON.parse(localStorage.getItem('favorites'))
  setFavoriteItems(favorite)
},[])
const handleRemoveItem  = (index)=> {
  const updateCart = [...cartItems]
  updateCart.splice(index,1)
  setCartItems(updateCart);
  localStorage.setItem("cart",JSON.stringify(updateCart))
}

const handleRemoveFav = (index)=>{
  const updatedFavories = [...favoriteItems]
  updatedFavories.splice(index,1)
  setFavoriteItems(updatedFavories);
  localStorage.setItem("favorites",JSON.stringify(updatedFavories))
}
return (
  <div className='mt-20 p-10'>
    <div className='flex justify-between items-start max-w-5xl mx-auto mt-10'>
      <div className='text-lg font-semibold mr-16'>
        <h2 className='text-purple-950 text-3xl '>Geçmiş Siparişerim</h2>
      </div>
      <div className='text-lg font-semibold ml-5'>
        <h2 className='text-purple-950 text-3xl'>Favorilerim</h2>
        <div className='mt-10'>
          {favoriteItems.length > 0 ? (
            <div className='space-y-4'>
              {favoriteItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-300">
                  <img
                    className="w-12 h-20 object-cover rounded-md"
                    src={item?.resim}
                    alt={item?.isim}
                  />
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">{item.isim}</h2>
                    <p className="text-gray-700">{item.yazar}</p>
                  </div>
                  <button onClick={()=>handleRemoveFav(index)} className="bg-red-500 ml-10 text-white px-2 py-1 rounded-md hover:bg-red-700">Ürünü sil</button>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-red-600'>Bir favoriniz bulunmuyor</div>
          )}
        </div>
      </div>
      <div className='text-lg font-semibold ml-5'>
        <h1 className='text-purple-950 text-3xl'>Sepetim</h1>
        <div>
          {cartItems.length > 0 ? (
            <div className='space-y-4 mt-10'>
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-300">
                  <img
                    className="w-12 h-20 object-cover rounded-md"
                    src={item?.resim}
                    alt={item?.isim}
                  />
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">{item.isim}</h2>
                    <p className="text-gray-700">{item.yazar}</p>
                  </div>
                  <button onClick={()=>handleRemoveItem(index)} className="bg-red-500 ml-10 text-white px-2 py-1 rounded-md hover:bg-red-700">Ürünü sil</button>
                </div>
                
              ))}
              
            </div>
          ) : (
            <div className="text-gray-500">Sepetinizde ürün yok.</div>
          )}
          
        </div>
      </div>
    </div>
  </div>
);


}

export default accountPage;

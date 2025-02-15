"use client";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

const handleRemoveItem = (index)=>{
    const updateCart =[...cartItems]
    updateCart.splice(index,1)
    setCartItems(updateCart);
    localStorage.setItem("cart",JSON.stringify(updateCart))
}

  return (
    <div className="mt-28">
      <h1 className="text-4xl font-bold">Sepetim</h1>
      {cartItems.length === 0 ? (
        <p className="text-purple-950 mt-5 p-3">Sepetiniz boş</p>
      ) : (
        <div className="mt-5 space-y-4">
          {cartItems.map((item, index) => (
            <div
              className="flex items-center gap-4 p-8 border rounded-md shadow-sm"
              key={index}
            >
              <img
                className="w-24 h-32 object-cover rounded-md"
                src={item?.resim}
                alt={item?.isim}
              ></img>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.isim}</h2>
                <p className="text-gray-700">{item.yazar}</p>
              </div>
              <button onClick={()=>handleRemoveItem(index)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Ürünü sil</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;

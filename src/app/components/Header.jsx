"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ImBooks } from "react-icons/im";
import { CiUser } from "react-icons/ci";
import { UserContext } from "../Context/context";
import { useRouter } from "next/navigation";
import { SlBasket } from "react-icons/sl";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [searchTerm, setSearchTeam] = useState("");
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [favoritesSideBar,setFavoritesSideBar]= useState([]);
  const [cartItems,setCartItems] = useState([]);
  const [favories,setFavories]=useState([]);

  useEffect(()=>{
    const storedCart = JSON.parse(localStorage.getItem("cart"))|| [];
    setCartItems(storedCart)

  const handleStorageChange=()=>{
    const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(updatedCart);
  };
  window.addEventListener("storage",handleStorageChange);
  return () => window.removeEventListener("storage",handleStorageChange)
},[]);

  useEffect(()=>{
    const storedFavories = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavories(storedFavories)

    const handleStorageChange = ()=> {
      const updatedFavories = JSON.parse(localStorage.getItem("favorites"))|| [];
      setFavories(updatedFavories);
    };
    window.addEventListener("storage",handleStorageChange);
    return () => window.removeEventListener("storage",handleStorageChange)
  },[])


   
  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTeam("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setSearchTeam("");
    }
  };
  const toggleSideBar=()=>{
    setSidebarOpen(!sidebarOpen);
  }
  const toggleFavorites=()=>{
    setFavoritesSideBar(!favoritesSideBar)
  }
  const goToAccount = ()=>{
    setSidebarOpen(false);
    router.push('/account')
  }
  return (
    <header className="p-5 h-20 flex items-center justify-between shadow-md bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        <ImBooks
          onClick={() => router.push("/")}
          size={50}
          className="text-purple-950 cursor-pointer"
        />
        <h1 className="text-3xl font-bold text-purple-950">Kitap Dünyasi</h1>
      </div>

      <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-1 border border-gray-300">
        <input
          className="outline-none px-2 py-1 w-60 text-gray-700 bg-transparent"
          type="text"
          value={searchTerm}
          placeholder="Arama yapiniz..."
          onChange={(e) => setSearchTeam(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-1 bg-purple-950 text-white rounded-md hover:bg-purple-800 transition"
        >
          Ara
        </button>
      </div>
      <div className="flex items-center gap-5 ml-5">
      <div onClick={toggleSideBar} className="relative cursor-pointer" >
        <FaRegHeart size={25} className="text-red-600 ml-52"/>
        {favories.length > 0 && (
          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white  text-xs font-bold px-2 py-1 rounded-full">{favories.length}</span>
        )}
      </div>

      <nav className="flex items-center gap-5" >
        {user ? (
          <button
            onClick={toggleSideBar}
            href="/account"
            className="text-purple-950 font-semibold hover:text-purple-700 transition flex items-center gap-1 text-xl"
          >
            <CiUser size={30} />
            Hesabim
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="text-purple-950 font-semibold hover:text-purple-700 transition"
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="text-purple-950 font-semibold hover:text-purple-700 transition"
            >
              Üye Ol
            </Link>
          </>
        )}
      </nav>
      <div onClick={()=>router.push('/cart')} className=" text-purple-950 font-semibold p-3  cursor-pointer hover:text-purple-700 transition flex items-center gap-1 text-xl">
        <SlBasket  size={30} className="text-red-700" />
        {
          cartItems.length > 0 && (
            <span className="absolute top-4 right-4 bg-red-700 text-white font-bold text-xs px-2 py-1 rounded-full ">{cartItems.length}</span>
          )
        }
       </div>
      </div>
      {sidebarOpen && ( 
        <div className="fixed top-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 z-40 ">
          <div className="h-full w-64 bg-white shadow-lg p-5 ">
          <button className="font-bold text-purple-950 text-xl mb-5" onClick={toggleSideBar}><IoCloseCircleSharp size={30} className="text-red-600"/></button>
          <div className="flex flex-col">
              <button className="font-bold text-red-600 text-xl hover:text-red-300 transition mb-2" onClick={goToAccount}>
                Hesabim
              </button>
            </div>
          {
            cartItems.length > 0 ?(
              <div className="space-y-4">
                {cartItems.map((item,index)=>(
                  <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-300">
                   <img
                      className="w-16 h-24 object-cover rounded-md"
                      src={item?.resim}
                      alt={item?.isim}
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.isim}</h2>
                      <p className="text-gray-700">{item.yazar}</p>
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <div className="text-gray-500"> Sepetinizde ürün yok.</div>
            )
          }

          </div>
        </div>
      )
      }
    </header>
  );
};

export default Header;

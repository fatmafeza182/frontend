"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";

const BookDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/api/kitaplar/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setBook(data))
      .catch((error) => console.error("Fetch error:", error));
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (book) {
      //   console.log(book);
    }
  }, [book]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/register");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newItem = {
      id: book.id,
      isim: book.isim,
      yazar: book.yazar,
      resim: book.resim,
      yayin_tarihi: book.yayin_tarihi,
    };
    cart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert("Ürün sepete eklendi");
    router.push("/cart");
  };
  const handleToggleFavorites = () => {
    let updatedFavorites = [...favorites];
    const existingIndex = updatedFavorites.findIndex(
      (item) => item.id === book.id
    );
    if (existingIndex !== -1) {
      updatedFavorites.splice(existingIndex, 1);
    } else {
      updatedFavorites.push({
        id: book.id,
        isim: book.isim,
        yazar: book.yazar,
        resim: book.resim,
        yayin_tarihi: book.yayin_tarihi,
      });
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event("storage"));
  };
  const isFavorite = favorites.some((item) => item.id === book?.id);

  if (!book) return <p>Yükleniyor...</p>;
  return (
    <div className="flex gap-3 mt-20 p-5 ">
      <img
        className="w-[500px] object-fill"
        src={book?.resim}
        alt={book?.isim}
      />
      <div className="ml-10">
        <h1 className="text-purple-950 font-bold text-5xl ml-48 mt-10">
          {book?.isim}
        </h1>
        <p className="text-purple-950 text-2xl mt-5">Yazar: <span className="text-black">{book?.yazar} </span></p>
        <p className="text-purple-950 text-2xl mt-2">
          Yayinlanma Tarihi:<span className="text-black">{book?.yayin_tarihi} </span> 
        </p>
        <div className="flex items-center gap-5 mt-5">
          <button
            onClick={handleAddToCart}
            className="p-3 rounded-md bg-purple-600 text-black hover:bg-purple-200 "
          >
            Sepete Ekle
          </button>
          <FaHeart
            className={`cursor-pointer text-3xl ${
              isFavorite ? "text-red-500" : "text-black"
            }`}
            onClick={handleToggleFavorites}
            size={30}
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

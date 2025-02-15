"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const KeywordPage = () => {
    const { keyword } = useParams();
    const decodedKeyword = decodeURIComponent(keyword);
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
      const fetchBook = async () => {
        if (!keyword || keyword.length < 3) {
            setBooks([]);
            setLoading(false);
            return;
        }
    
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/api/kitaplar?search=${decodedKeyword}`);
            // console.log("API'ye gönderilen arama terimi:", decodedKeyword);
            // console.log(`İstek yapilan URL: http://localhost:8000/api/kitaplar?search=${decodedKeyword}`);

            
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            const data = await res.json();
            console.log("API'den gelen veri:", data); 

            
            // const filteredBooks = data.results.filter(book => 
            //     (book.isim && book.isim.toLowerCase().includes(decodedKeyword.toLowerCase())) ||
            //     (book.yazar && book.yazar.toLowerCase().includes(decodedKeyword.toLowerCase()))
            // );
            

            setBooks(data.results);
        } catch (error) {
            console.error("Veri gelirken hata oluştu", error);
        } finally {
            setLoading(false);
        }
    };
    
        fetchBook();
    }, [keyword]);

    return (
        <div className="mt-28 p-5">
            <h1 className="text-2xl font-bold text-purple-950 mb-5">
            "{decodedKeyword}" için arama sonuçlari
            </h1>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : books.length > 0 ? (
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {books.map((book) => (
                        <li key={book.id} className="border p-4 rounded-lg shadow">
                            <img src={book.resim} alt={book.isim} className="w-full h-40 object-cover mb-2" />
                            <h2 className="font-semibold">{book.isim}</h2>
                            <p className="text-gray-600">{book.yazar}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Sonuç bulunamadi.</p>
            )}
        </div>
    );
};

export default KeywordPage;

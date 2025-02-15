
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Books = ({ dt }) => {
  const imageUrl = dt?.resim?.startsWith("http") ? dt.resim : `http://localhost:8000/${dt?.resim}`;

  return (
    <Link href={`/book/${dt?.id}`} className="cursor-pointer mt-24">
  <div className="relative w-[250px] h-[350px] flex flex-col items-center">
    <div className="relative w-full h-[300px] transition-transform hover:scale-105">
      <Image 
        src={imageUrl} 
        alt={dt.aciklama} 
        fill 
        className="rounded-lg object-cover"
      />
    </div>
    <h2 className="text-lg font-semibold mt-2 text-purple-950">{dt.yazar}</h2>
  </div>
</Link>

  
  );
};

export default Books;

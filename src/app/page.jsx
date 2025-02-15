"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Books from "./components/Books";

const page = () => {
  const [data, setdata] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/kitaplar/");
        setdata(response.data);
      } catch (err) {
        setError("veri çekme hatasi" + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return <div className="flex flex-wrap items-center gap-2 p-2">
    {
      data?.results.map((dt,i)=>(
        <Books dt={dt} key={i}/>
      ))
    }
  </div>;
};

export default page;

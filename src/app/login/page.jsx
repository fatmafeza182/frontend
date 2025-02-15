
"use client"
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import { UserContext } from "../Context/context";

const page = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();
  const {setUser} = useContext(UserContext)

  const onSubmit = async (data) => {
    const storedUser = localStorage.getItem("user"); 
  
    if (!storedUser) {
      console.log("Kullanici bulunamadi");
      return;
    }
  
    const parsedUser = JSON.parse(storedUser); 
  
    if (
      parsedUser.email === data.email && 
      String(parsedUser.password) === String(data.password)
    ) {
      console.log("Giriş başarili");
      setUser(parsedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(parsedUser));
      localStorage.setItem("auth_token", "true"); 
      router.push("/cart");
    } else {
      console.log("Email veya şifre hatali");
      router.push("/register");
    }
  };
  
  
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-bold text-2xl text-purple-950">Giriş yapmak için doldurunuz</h1>
      <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)} >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            E-postaniz
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            {...register("email", { required: "E-posta gerekli" })}
            required=""
            className="bg-gray-50 border border-gray-300 p-2 w-[500px] rounded-lg hover:bg-gray-600"
          ></input> {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Şifre giriniz
          </label>
          <input
            type="password"
            name="password"
            placeholder="..."
            {...register("password", { required: "Şifre gerekli" })}
            required=""
            className="bg-gray-50 border border-gray-300 p-2 w-[500px] rounded-lg hover:bg-gray-600"
          ></input>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <button className="text-white hover:bg-purple-600 p-3 rounded-md w-full bg-purple-950" type="submit">Giriş Yap</button>
        </div>
      </form>
    </div>
  )
}

export default page

"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter();

    const onSubmit = async(data) =>{
      localStorage.setItem("user", JSON.stringify(data));
        console.log("Form Submitted:", data);
        reset();
        router.push('/login')
    }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-bold text-2xl text-purple-950">Formu Doldurunuz</h1>
      <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
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
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Şifre tekrar
          </label>
          <input
            type="confirm-password"
            name="confirm-password"
            placeholder="..."
            {...register("confirmPassword", { required: "Şifre tekrar gerekli" })}
            required=""
            className="bg-gray-50 border border-gray-300 p-2 w-[500px] rounded-lg hover:bg-gray-600"
          ></input> {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              className='"w-4 h-4 border border-gray-300 rounded bg-gray-50'
              {...register("terms", { required: "Şartları kabul etmeniz gerekiyor" })}
            ></input>
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-light text-gray-500 dark:text-gray-300"
            >
              Tüm{" "}
              <a className="font-medium text-primary-600 hover:underline " href="#">
                şart ve koşullari kabul ediyorum
              </a>
            </label>
          </div>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">Şartlarİ kabul etmeniz gerekiyor</p>
        )}
        <button
          type="submit"
          className="w-full text-white bg-purple-950 hover:bg-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Bir hesap oluşturun
        </button>
        <p className="text-sm font-light text-gray-500 ">
          Zaten hesabiniz var mi? {" "}
          <a href="#" className="font-medium text-primary-600 hover:underline">
            Burdan giriş yapabilirsiniz
          </a>
        </p>
      </form>
    </div>
  );
};

export default page;

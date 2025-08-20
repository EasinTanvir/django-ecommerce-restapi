"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "@/components/shared/InputField";
import api from "@/api/api";
import toast from "react-hot-toast";

const Registers = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
    },
    mode: "onTouched",
  });
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const onSubmitHandler = async (data) => {
    setLoader(true);
    try {
      const sendData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const { data: res } = await api.post("/user/register", sendData);
      toast.success(res.message);
      reset();

      router.push("/login");
    } catch (err) {
      console.log("get err", err);

      if (err.response.data.email) {
        setError("email", { message: err.response.data.email });
      } else if (err.response.data.phone) {
        setError("phone", { message: err.response.data.phone });
      } else {
        toast.error("User create failed");
      }
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="sm:w-[450px] w-[360px]  shadow-2xl border py-6 sm:px-8 px-4 rounded-xl"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Register Here
          </h1>
          <p className="text-slate-600 text-center">
            Enter your credentials to create new account
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <InputField
            label="User Name"
            required
            id="username"
            type="text"
            message="UserName is required"
            placeholder="type your username"
            register={register}
            errors={errors}
          />
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="Email is required"
            placeholder="type your email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="Password is required"
            placeholder="type your password"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          className="bg-brandColor font-semibold flex justify-center text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
          type="text"
        >
          {loader ? "Loading..." : "Register"}
        </button>

        <p className="text-center text-sm text-slate-700 mt-2">
          Already an account?{" "}
          <Link
            className="font-semibold underline  text-brandColor"
            href="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registers;

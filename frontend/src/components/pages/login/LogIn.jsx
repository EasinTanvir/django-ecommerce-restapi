"use client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import InputField from "@/components/shared/InputField";

const Login = () => {
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
    },
    mode: "onTouched",
  });

  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const onSubmitHandler = async (data) => {
    setLoader(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((cb) => {
      if (cb?.ok) {
        toast.success("Login Successful");
        setLoader(false);
        router.push("/user");
      }
      if (cb?.error) {
        setLoader(false);
        toast.error(cb.error);
      }
    });
  };

  const onLogInHandler = () => {
    signIn("google", { callbackUrl: "/en/me" });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="sm:w-[450px] w-[360px] shadow-2xl border py-6 sm:px-8 px-4 rounded-xl"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            LogIn Here
          </h1>
          <p className="text-slate-600 text-center">
            Enter your credentials to Login
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-3">
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
          type="submit"
        >
          {loader ? "Loading..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-700 mt-2">
          Don't have an account?{" "}
          <Link
            className="font-semibold underline text-brandColor"
            href="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

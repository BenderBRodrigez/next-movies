"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { Button } from "./button";
import { AuthContext } from "./auth/auth.context";
import { QueryContext } from "./query/query.context";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { LoginDto } from "../dto/login.dto";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const { mutationFn, onError } = useContext(QueryContext);
  const { mutate, data } = useMutation({
    mutationFn,
    onError,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({ resolver: classValidatorResolver(LoginDto) });

  useEffect(() => {
    if (!isEmpty(errors)) {
      Object.values(errors).forEach((value) => {
        toast.error(value.message);
      });
    }
  }, [errors]);

  useEffect(() => {
    if (data?.token) {
      login(data.token, watch("rememberMe"));
      router.push("/");
    }
  }, [data, login, router, watch]);

  const onSubmit = async ({ email, password }: LoginFormData) => {
    mutate({ path: "login", method: "POST", body: { email, password } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"flex flex-col gap-4"}>
        <input
          className={"bg-input w-full h-12 p-4 rounded-lg"}
          placeholder={"email"}
          {...register("email")}
        />
        <input
          className={"bg-input w-full h-12 p-4 rounded-lg"}
          type={"password"}
          placeholder={"password"}
          {...register("password")}
        />
        <div className={"flex justify-center gap-2"}>
          <input
            id={"rememberMe"}
            type={"checkbox"}
            {...register("rememberMe")}
          />
          <label htmlFor={"rememberMe"}>Remember me</label>
        </div>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}

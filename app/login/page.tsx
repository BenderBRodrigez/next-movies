"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../components/auth/auth.context";
import LoginForm from "../../components/login-form";

export default function LoginPage() {
  const router = useRouter();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [router, token]);

  return <LoginForm />;
}

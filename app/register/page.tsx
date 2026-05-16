"use client";

import { register } from "@/lib/auth/fetch";
import { setAccessToken } from "@/lib/common/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // ログイン済みの場合はホームページにリダイレクト
    if (localStorage.getItem("access_token")) {
      router.push("/home");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await register(email, password);
      if (!response) return;
      setAccessToken(response.access_token);
      router.push("/home");
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        setError((error as { message: string }).message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <p>{error}</p>
      </form>
    </div>
  );
}

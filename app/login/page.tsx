"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // ログイン済みの場合はホームページにリダイレクト
    if (localStorage.getItem("token")) {
      router.push("/home");
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form>
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
        <button type="button">Login</button>
        <p>{error}</p>
      </form>
    </div>
  );
}

"use client";
import supabase from "../supabase";
import { useState } from "react";
import "./login.module.css";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const signIn = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (error) {
        alert("wrong email or password!");
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={signIn}>
        <div className={styles.header}>
          <h1>Expense App</h1>
        </div>
        <div className={styles.bargroup}>
          <input
            type="email"
            className={styles.bar}
            placeholder="Email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <input
            type="password"
            className={styles.bar}
            placeholder="Password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className={styles.loginbtn}>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </div>
      </form>
      <div className={styles.signupLink}>
        don't have an account? <Link href={"/signup"}> signup </Link>
      </div>
    </div>
  );
};

export default Login;

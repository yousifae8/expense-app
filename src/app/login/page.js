"use client";
import supabase from "../supabase";
import { useState } from "react";
import "./login.module.css";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AccountBalanceWallet } from "@mui/icons-material";
import { EmailOutlined } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";





const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [wrong, setWrong] = useState("none")
const [loading, setLoading] = useState("none")
  const signIn = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (error) {
        setTimeout(() => {
          setWrong("block");
          setLoading("none");
        },1000)
        
        
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <form onSubmit={signIn}>
          <div className={styles.wallet}>
            <AccountBalanceWallet
              sx={{
                background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                height: 50,
                width: 50,
                marginTop: 1,
                borderRadius: 3,
                padding: 1,
              }}
            />
          </div>
          <div className={styles.header}>
            <h1>Expense Tracker</h1>
            <p className={styles.paragraph}>
              Welcome back! Please login to your account
            </p><br />
            <p className={styles.error} style={{ display: wrong }}>Wrong Email or Password!</p>
            <p style={{ display: loading }}>Loading...
            </p>
          </div>
          <div className={styles.bargroup}>
            <label
              htmlFor="email"
              className={styles.label}
              style={{ marginBottom: 5 }}>
              Email
            </label>
            <div style={{ position: "relative" }}>
              <EmailOutlined
                sx={{
                  position: "absolute",
                  left: 10,
                  bottom: 12,
                  color: "grey",
                  width: "20px",
                }}
              />
              <input
                style={{ width: "100%", paddingLeft: "35px" }}
                type="email"
                className={styles.bar}
                placeholder="Email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <LockOutlinedIcon
                sx={{
                  position: "absolute",
                  left: 10,
                  bottom: 13,
                  color: "grey",
                  width: "20px",
                }}
              />
              <input
                style={{ width: "100%", paddingLeft: "35px" }}
                type="password"
                className={styles.bar}
                placeholder="Password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles.loginbtn}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "100%",
                background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              }}
            onClick={()=> {
setWrong("none")
setLoading("block");
            }  
          }
            >
              Login
            </Button>
          </div>
        </form>
        <div className={styles.signupLink}>
          don't have an account? <Link href={"/signup"}className={styles.signup}> signup </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

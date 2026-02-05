"use client";
import supabase from "../supabase";
import { useEffect, useState } from "react";
import "./login.module.css";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [wrong, setWrong] = useState("none")
const [loading, setLoading] = useState("none")
const [alertmsg, setAlertmsg] = useState("none")




  const signIn = async (event) => {
    event.preventDefault();

    try { 
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      }); 
      if (error || !data.user) {


        setTimeout(() => {

          setWrong("block");
          setLoading("none");
        },1000)

        
        return;
      }
      router.push("/dashboard");

    } catch (error) {


        setAlertmsg("block")
        setLoading("none")
        return;   }
          
  };

  return (
    <div className={styles.login}>
      <form onSubmit={signIn}>
         <div className={styles.wallet}>
            <AccountBalanceWalletIcon
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
          <h1>Expense App</h1>
        </div>
        <div className={styles.alert} style={{display: wrong}}>
          <p>Wrong email or password</p>
        </div>
         <div className={styles.loading} style={{display: loading}}>
          <p>Loading...</p>
        </div>
         <div className={styles.alert} style={{display: alertmsg}}>
          <p>Something went wrong. Please try again later.</p>
        </div>  
        <div className={styles.bargroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <div style={{ position: "relative" }} className={styles.iconContainer}>
              <EmailOutlinedIcon
                sx={{
                  position: "absolute",
                  left: 10,
                  color: "grey",
                  width: "20px",
                }}
              />
          <input
            type="email"
            className={styles.bar}
            placeholder="Email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          </div>
        </div>
        <div className={styles.bargroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
            <div style={{ position: "relative" }} className={styles.iconContainer}>
              <LockOutlinedIcon
                sx={{
                  position: "absolute",
                  left: 10,
                  color: "grey",
                  width: "20px",
                }}
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
        </div>
        <div className={styles.loginbtn}>
          <Button variant="contained" type="submit"  sx={{
                width: "100%",
                background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              }}
              onClick={()=>{
                setLoading("block");
                setWrong("none");
                setAlertmsg("none");  
              }}
              
              >
            Login
          </Button>
        </div>
      </form>
      <div className={styles.signupLink}>
        {`don't have an account?` }<Link href={"/signup"}> sign up </Link>
      </div>
    </div>
  );
};

export default Login;

'use client'
import { Button } from "@mui/material";
import styles from "./signup.module.css";
import supabase from "../supabase";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";



export const Signup = () => {
  
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  })
  const router = useRouter()
  
  const addNewUser = async (event) => {
    event.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              name: userData.name,
              age: userData.age
            }
          }
        }
      )

 

      
      setUserData({
        email: "",
        password: "",
        name: "",
        age: ""
      })
      if (error) {
        alert("Error signing up: " + error.message);
        return
      }
      router.push("/login")
  
      
    } catch (error) {
      alert("Error signing up: ", error.message)
    }
  }

    return (
      <div className={styles.container}>
        <div className={styles.signup}>
          <form onSubmit={addNewUser} className={styles.form}>
            <h1 className={styles.header}> Sign Up </h1>

            <div className={styles.bargroup}>
              <label htmlFor="name" className="label">
                Name
              </label>
              <br />
              <input
                required
                value={userData.name}
                onChange={(e) => setUserData({ ...userData,name: e.target.value })}
                type="text"
                placeholder="Name"
                name="name"
                className={styles.bar}
              />
              <br />
              <label htmlFor="age" className="label">
                Age
              </label>
              <br />
              <input
                required
                value={userData.age}
                onChange={(e) => setUserData({...userData, age: e.target.value })}
                type="number"
                placeholder="Age"
                name="age"
                className={styles.bar}
              />
              <br />
              <label htmlFor="email" className="label">
                Email
              </label>
              <br />
              <input
                required
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value })}
                name="email"
                type="email"
                placeholder="you@exampl.com"
                className={styles.bar}
              />
              <br />
              <label htmlFor="password" className="label">
                Password
              </label>
              <br />
              <input
                value={userData.password}
                onChange={(e) => setUserData({...userData, password: e.target.value })}
                name="password"
                type="password"
                placeholder="Password"
                className={styles.bar}
              />
              <br />

              <br />
            </div>
            <div className={styles.signupbtn}>
              <Button variant="contained" type="submit" >
                signup
              </Button>
            </div>
            <div className={styles.loginLink}>
              already have an account? <Link href={"/login"}>log in</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }


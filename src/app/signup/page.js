'use client'
import { Button } from "@mui/material";
import styles from "./signup.module.css";
import supabase from "../supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as yup from "yup"
import {useFormik} from "formik"

const Signup = () => {


  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .matches(/^[A-Za-z]+$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    age: yup
      .number()
      .min(13, "You must be at least 13")
      .max(120, "Age must be realistic")
      .required("Age is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[a-z]/, "Must contain a lowercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .matches(/[@$!%*?&]/, "Must contain a special character")
      .required("Password is required"),
  });
  

    const addNewUser = async (values) => {
      
    
      try {
        const { data, error } = await supabase.auth.signUp(
          {
            email: values.email,
            password: values.password,
            options: {
              data: {
                name: values.name,
                age: values.age
              }
            }
          }
        )

    
    
      
        
        if (error) {
          alert("Error signing up: " + error.message);
          return
        }
        router.push("/login")
    
        
      } catch (error) {
        alert("Error signing up: ", error.message)
      }
  }
  

  const formik = useFormik({
    initialValues: {
      name: "", 
      email: "",
      password: "",
      age : ""
    },
    validationSchema,
    onSubmit: addNewUser
})


  const router = useRouter()
  

  return (
    <div className={styles.outer}>
      <div className={styles.signup}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
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
            <h1> Create Account </h1>
            <p className={styles.paragraph}>
              join us and start tracking your expenses
            </p>
          </div>

          <div className={styles.bargroup}>
            <label
              htmlFor="name"
              className={styles.label}
              style={{ marginBottom: 5 }}>
              Name
            </label>

            <div style={{ position: "relative" }} className={styles.iconContainer} >
              <PersonOutlineIcon
                sx={{
                  position: "absolute",
                  left: 10,
                  color: "grey",
                  width: "20px",
                }}
              />
              <input
                style={{ width: "90%", paddingLeft: "35px" }}
                required
                value={formik.values.name}
                onChange={formik.handleChange}
               
                type="text"
                placeholder="Your name"
                name="name"
                className={styles.bar}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className={styles.error}>{formik.errors.name}</p>
            )}

            <label htmlFor="age" className={styles.label}>
              Age
            </label>
            <div style={{ position: "relative" }} className={styles.iconContainer}>
              <CalendarTodayOutlinedIcon
                sx={{
                  position: "absolute",
                  left: 10,
                  color: "grey",
                  width: "20px",
                }}
              />
              <input
                style={{ width: "90%", paddingLeft: "35px" }}
                required
               
                value={formik.values.age}
                onChange={formik.handleChange}
                type="number"
                placeholder="Your age"
                name="age"
                className={styles.bar}
              />
            </div>
            {formik.touched.age && formik.errors.age && (
              <p className={styles.error}>{formik.errors.age}</p>
            )}
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
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
                style={{ width: "90%", paddingLeft: "35px" }}
                required
           
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                type="email"
                placeholder="you@example.com"
                className={styles.bar}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className={styles.error}>{formik.errors.email}</p>
            )}
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
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
                style={{ width: "90%", paddingLeft: "35px" }}
             
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type="password"
                placeholder="Password"
                className={styles.bar}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className={styles.error}>{formik.errors.password}</p>
            )}
          </div>
          <div className={styles.signupbtn}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "100%",
                background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              }}>
              signup
            </Button>
          </div>
          <div className={styles.loginLink}>
            already have an account?{" "}
            <Link href={"/login"} className={styles.login}>
              log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
  }

export default Signup
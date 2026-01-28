'use client'

import styles from "./add.module.css"
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import supabase from "../supabase";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup"
import {useFormik} from "formik"


const Add = () => {
const router = useRouter()
const [select, setSelect] = useState("none")

const validationSchema = yup.object().shape({
  category: yup
    .string()
    .oneOf(["Food", "Transport", "Other"], "Invalid category!")
    .required("Category is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  date: yup
    .date()
    .required("Date is required")
});

  

  const insertData = async (values) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert("not logged in");
      return
    }
  
        const { data, error } = await supabase.from("expenses").insert({
        amount: values.amount,
        category: values.category,
        date: values.date,
        user_id: user.id
      }).select()
      if (error) {
        alert("error adding data");
        return
        
    }
    router.push("/dashboard")
 
    }
  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      date: ""
    },
    validationSchema, 
    onSubmit: insertData
})


  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>

        <CloseIcon onClick={()=> router.push("/dashboard")} className={ styles.close } />
        <h1 className={styles.header}>ADD EXPENSES</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            required
            min={1}
            step={0.01}
            type="number"
            placeholder="Amount"
            className={styles.input}
            {...formik.getFieldProps("amount")}
              />
           {formik.touched.amount && formik.errors.amount && (
                        <p className={styles.error}>{formik.errors.amount}</p>
                      )}
          <br />

          <select
            required
            name="category"
           
           {...formik.getFieldProps("category")}
            
            form="categories"
            className={styles.input}>
<option value="" >Select category...</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
            {formik.touched.category && formik.errors.category && (
                        <p className={styles.error}>{formik.errors.category}</p>
                      )}
          <br />

          <input
            required
            type="date"
            placeholder=""
            className={styles.input}
            {...formik.getFieldProps("date")}

          />
          {formik.touched.date && formik.errors.date && (
          <p className={styles.error}>{formik.errors.date}</p>)}
          <br />

          <div className={styles.btn}>
            <Button
              variant="contained"
              sx={{
                width: 350,
                margin: "10px",
              }}
              type="submit">
              save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Add
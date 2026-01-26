'use client'

import styles from "./add.module.css"
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import supabase from "../supabase";

const Add = () => {
const router = useRouter()

  const [values, setValues] = useState({})



  const insertData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.log("not logged in");
      return
    }
      const { data, error } = await supabase.from("expenses").insert({
      
        amount: values.amount,
        category: values.category,
        date: values.date,
        user_id: user.id
      }).select()
      if (error) {
        console.error("error fetching");
        return
        
      }
      
      
  
      
      
    }








  const handleSubmit = (event) => {
    event.preventDefault()
    insertData()
    
    
    
    router.push("/dashboard")
  }
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        
        <h1 className={styles.header}>ADD EXPENSES</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            required
            type="number"
            placeholder="Amount"
            className={styles.input}
            onChange={(e) => {
              setValues({ ...values, amount: e.target.value });
            
            }}
          />
          <br />

          <select
            required
            name="categories"
            id=""
            onChange={(e) => {
              setValues({ ...values, category: e.target.value });
              
            }}
            
            form="categories"
            className={styles.input}>
<option value="" placeholder="..."></option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
          <br />

          <input
            required
            type="date"
            placeholder=""
            className={styles.input}
            onChange={(e) => {
              setValues({ ...values, date: e.target.value });
             
            }}
          />
          <br />

          <div className={styles.btn}>
            <Button
              variant="contained"
              sx={{
                width: 400,
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
// 'use client'

// import styles from "./add.module.css"
// import { Button } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import supabase from "../supabase";

// const Add = () => {
// const router = useRouter()

//   const [values, setValues] = useState({})



//   const insertData = async () => {
//     const { data: { user } } = await supabase.auth.getUser()
//     if (!user) {
//       console.log("not logged in");
//       return
//     }
//       const { data, error } = await supabase.from("expenses").insert({
      
//         amount: values.amount,
//         category: values.category,
//         date: values.date,
//         user_id: user.id
//       }).select()
//       if (error) {
//         console.error("error fetching");
//         return
        
//       }
      
      
  
      
      
//     }








//   const handleSubmit = (event) => {
//     event.preventDefault()
//     insertData()
    
    
    
//     router.push("/dashboard")
//   }
//   return (
//     <div className={styles.container}>
//       <div className={styles.innerContainer}>
        
//         <h1 className={styles.header}>ADD EXPENSES</h1>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <input
//             required
//             type="number"
//             placeholder="Amount"
//             className={styles.input}
//             onChange={(e) => {
//               setValues({ ...values, amount: e.target.value });
            
//             }}
//           />
//           <br />

//           <select
//             required
//             name="categories"
//             id=""
//             onChange={(e) => {
//               setValues({ ...values, category: e.target.value });
              
//             }}
            
//             form="categories"
//             className={styles.input}>
// <option value="" placeholder="..."></option>
//             <option value="Food">Food</option>
//             <option value="Transport">Transport</option>
//             <option value="Other">Other</option>
//           </select>
//           <br />

//           <input
//             required
//             type="date"
//             placeholder=""
//             className={styles.input}
//             onChange={(e) => {
//               setValues({ ...values, date: e.target.value });
             
//             }}
//           />
//           <br />

//           <div className={styles.btn}>
//             <Button
//               variant="contained"
//               sx={{
//                 width: 400,
//                 margin: "10px",
//               }}
//               type="submit">
//               save
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default Add



'use client'

import styles from "./add.module.css"
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import supabase from "../supabase";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup"
import {useFormik} from "formik"
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Add = () => {
const router = useRouter()

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

        <CloseIcon  onClick={()=> router.push("/dashboard")} className={ styles.close } />
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
{/* 
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
          <br /> */}
      

          <input
            required
            type="date"
            placeholder=""
            className={styles.input}
            {...formik.getFieldProps("date")}

          />
          {formik.touched.date && formik.errors.date && (
          <p className={styles.error}>{formik.errors.date}</p>)}
              <Box sx={{ minWidth: 120,backgroundColor: "#f5f5f5" , padding:0}} className={styles.input}>
      <Select
      style={{ width: "100%", height: "100%" ,border: " none"}}
        value={formik.values.category}
        onChange={(e)=>{
          formik.setFieldValue("category", e.target.value)
        }}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="" disabled>
          Select category...
        </MenuItem>
        <MenuItem value={"Food"}>Food</MenuItem>
        <MenuItem value={"Transport"}>Transport</MenuItem>
        <MenuItem value={"Other"}>Other</MenuItem>
      </Select>
    </Box>
    {formik.touched.category && formik.errors.category && (
                        <p className={styles.error}>{formik.errors.category}</p>
                      )}

          <div className={styles.btn}>
            <Button
              variant="contained"
              sx={{
                width: 350,
                margin: "10px",
                height: 40 ,
                              fontWeight:"bold",

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
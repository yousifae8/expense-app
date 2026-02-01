'use client'
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RestaurantIcon from "@mui/icons-material/Restaurant"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import LocalMallIcon from "@mui/icons-material/LocalMall";
import styles from "./dashboard.module.css";
import supabase from "../supabase";
import { useEffect, useState } from "react";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";



  

const Dashboard = () => {
  const router = useRouter();
  const [amount, setAmount] = useState()
  const [categories, setCategories] = useState({
    food: null,
    transport: null,
    other: null
  })


  const redirect = (event) => {
    event.preventDefault()
    router.push("/add")
}
  const foodCategory = async () => {
    
    const { data, error } = await supabase.from("expenses").select("amount").eq("category", "Food")
    if (error) {
      console.log("error fetching");
    }

    const total = data.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    setCategories((prev) => {
      return { ...prev, food: total };
    });
  }
  const transportCategory = async () => {
   const { data, error } = await supabase
     .from("expenses")
     .select("amount")
     .eq("category", "Transport");
   if (error) {
     console.log("error fetching");
    }
    const total = data.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    setCategories((prev) => {
      return { ...prev, transport: total };
    });
   
    
  }
  const otherCategory = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select("amount")
      .eq("category", "Other");
    if (error) {
      console.log("error fetching");
    }
    const total = data.reduce((acc, item) => {
      return acc + item.amount
    }, 0)
    setCategories((prev) => {
     return {...prev, other: total}
    })
  }
    
   
    
  
  useEffect(() => {
    foodCategory()
    transportCategory()
    otherCategory()
  },[])



  const totalSpent = async () => {
    const { data: { user }} = await supabase.auth.getUser()
    if (!user) {
      console.log("not logged in");
      return
      
    }
    const { data, error } = await supabase.from("expenses").select("amount")
    if (error) {
      console.log("error fetching");
      return
      
    }
  
    const total = data.reduce((acc, item) => {
      return acc + item.amount
    }, 0)
    
   setAmount(total)
    
  }

  totalSpent()
const insertData = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    console.log("not logged in");
    return
  }
    const { data, error } = await supabase.from("expenses").insert({
      
      amount: 20,
      category: "Other",
      user_id: user.id
    }).select()
    if (error) {
      console.error("error fetching");
      return
      
    }
    
    

    
    
  }



  return (
    <div className={styles.container}>
      <div className={styles.header}>
<h1>Expense Tracker</h1>

      </div>
      <div className={styles.totalSpent}>
        <h1>Total Spent</h1>
        <h1>${amount}</h1>
      </div>
      <div className={styles.calender}>
       
        
        <EditCalendarIcon onClick={()=> router.push("/expenses")} />
        

      </div>
      <div className={styles.categories}>
        <span className={styles.span}>
          <RestaurantIcon /> <br />
          Food <p>${categories.food}</p>
        </span>
        <span className={`${styles.span} ${styles.midSpan}`}>
          <DirectionsCarIcon /> <br />
          Transport
          <p>${categories.transport}</p>
        </span>
        <span className={styles.span}>
         <LocalMallIcon /> <br />
          Other<p>${categories.other}</p>
        </span>
      </div>
      <Button
        variant="contained"
        onClick={redirect}
        sx={{ fontSize: 20, margin: 1, width: 300 }}>
        <AddIcon sx={{ fontSize: 25 }} />
        add expense
      </Button>
    </div>
  );
};

export default Dashboard;

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
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

  

const Dashboard = () => {
  const router = useRouter();
  const [amount, setAmount] = useState()
  const [categories, setCategories] = useState({
    food: null,
    transport: null,
    other: null
  })
const [open, setOpen] = useState(false)

  const getTotalPerCurrentMonth = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select("amount, date")
      .filter("date", "gte", `2026-${currentMonth}-01`)
      .filter("date", "lte", `2026-${currentMonth}-31`);
    const total = data.reduce((acc, current) => {
     return acc + current.amount
    },0)
    
setAmount(total)


    
   
  };





  const logUser = async () => {

     const {
       data: { user },
     } = await supabase.auth.getUser();
     if (!user) {
   
       return;
     }
  const { data, error } = await supabase.auth.getUser();
  const name = await data.user.user_metadata.name
    setUserName(name.charAt(0).toUpperCase() + name.slice(1))
    setIsLoggedIn(true)
    
}

  useEffect(() => {
  logUser()
},[])




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
        <AccountBalanceWallet
          className={styles.wallet}
          sx={{
            background: "linear-gradient(45deg, #6a11cb, #2575fc)",
            height: 50,
            width: 50,
            marginTop: 1,
            borderRadius: 3,
            padding: 1,
          }}
        />
        <div className={styles.innerContainer}>
          <div>
            <h1 className={styles.title}>Expense Tracker</h1>
          </div>
          <div>
            <p>Welcome back, {userName}</p>
          </div>
        </div>
        
        <button onClick={()=> setOpen(!open)} className={styles.toggle}>
              {open ? "✕" : "☰"}
        </button>

          <div className={`${styles.headerButtons} ${open? styles.active : ""}`}>


              <Button
                sx={{
                  width: 120,
                  height: 50,
                }}
                onClick={totalSpent}
                variant="contained">
                total
              </Button>
          <Button
            sx={{
              width: 120,
              height: 50,
            }}
            onClick={getTotalPerCurrentMonth}
            variant="contained">
            this month
          </Button>
          <Button
            sx={{
              width: 120,
              height: 50,
            }}
            onClick={() => {
              router.push("/expenses")
            }}
            variant="contained">
            expenses
          </Button>
          <Button
            sx={{
              width: 120,
              height: 50,
              background: "white",
              color: "black",
       
            }}
            variant="contained"
            onClick={logout}
         >
            {isLoggedIn ? "Logout" : "login"} { isLoggedIn? <LogoutIcon sx={{
              marginLeft: 1,
              
              
            }} />: <LoginIcon sx={{
              marginLeft: 1,
              
              
            }} /> }
          </Button>
        </div>
      </div>

      <div className={styles.totalSpent}>
        <h1>Total Spent</h1>
        <h1>${amount}</h1>
      </div>
      <div className={styles.calender}>

        <EditCalendarIcon />

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
        onClick={()=> router.push("/add")}
        sx={{ fontSize: 20, marginBottom: 20, width: 250 }}>
        <AddIcon sx={{ fontSize: 25 }} />
        add expense
      </Button>
    </div>
  );
};

export default Dashboard;

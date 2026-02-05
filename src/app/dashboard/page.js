// 'use client'
// import { useRouter } from "next/navigation";
// import { Button } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RestaurantIcon from "@mui/icons-material/Restaurant"
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
// import LocalMallIcon from "@mui/icons-material/LocalMall";
// import styles from "./dashboard.module.css";
// import supabase from "../supabase";
// import { useEffect, useState } from "react";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";



  

// const Dashboard = () => {
//   const router = useRouter();
//   const [amount, setAmount] = useState()
//   const [categories, setCategories] = useState({
//     food: null,
//     transport: null,
//     other: null
//   })


//   const redirect = (event) => {
//     event.preventDefault()
//     router.push("/add")
// }
//   const foodCategory = async () => {
    
//     const { data, error } = await supabase.from("expenses").select("amount").eq("category", "Food")
//     if (error) {
//       console.log("error fetching");
//     }

//     const total = data.reduce((acc, item) => {
//       return acc + item.amount;
//     }, 0);
//     setCategories((prev) => {
//       return { ...prev, food: total };
//     });
//   }
//   const transportCategory = async () => {
//    const { data, error } = await supabase
//      .from("expenses")
//      .select("amount")
//      .eq("category", "Transport");
//    if (error) {
//      console.log("error fetching");
//     }
//     const total = data.reduce((acc, item) => {
//       return acc + item.amount;
//     }, 0);
//     setCategories((prev) => {
//       return { ...prev, transport: total };
//     });
   
    
//   }
//   const otherCategory = async () => {
//     const { data, error } = await supabase
//       .from("expenses")
//       .select("amount")
//       .eq("category", "Other");
//     if (error) {
//       console.log("error fetching");
//     }
//     const total = data.reduce((acc, item) => {
//       return acc + item.amount
//     }, 0)
//     setCategories((prev) => {
//      return {...prev, other: total}
//     })
//   }
    
   
    
  
//   useEffect(() => {
//     foodCategory()
//     transportCategory()
//     otherCategory()
//   },[])



//   const totalSpent = async () => {
//     const { data: { user }} = await supabase.auth.getUser()
//     if (!user) {
//       console.log("not logged in");
//       return
      
//     }
//     const { data, error } = await supabase.from("expenses").select("amount")
//     if (error) {
//       console.log("error fetching");
//       return
      
//     }
  
//     const total = data.reduce((acc, item) => {
//       return acc + item.amount
//     }, 0)
    
//    setAmount(total)
    
//   }

//   totalSpent()
// const insertData = async () => {
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) {
//     console.log("not logged in");
//     return
//   }
//     const { data, error } = await supabase.from("expenses").insert({
      
//       amount: 20,
//       category: "Other",
//       user_id: user.id
//     }).select()
//     if (error) {
//       console.error("error fetching");
//       return
      
//     }
    
    

    
    
//   }



//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
// <h1>Expense Tracker</h1>

//       </div>
//       <div className={styles.totalSpent}>
//         <h1>Total Spent</h1>
//         <h1>${amount}</h1>
//       </div>
//       <div className={styles.calender}>
       
        
//         <EditCalendarIcon onClick={()=> router.push("/expenses")} />
        

//       </div>
//       <div className={styles.categories}>
//         <span className={styles.span}>
//           <RestaurantIcon /> <br />
//           Food <p>${categories.food}</p>
//         </span>
//         <span className={`${styles.span} ${styles.midSpan}`}>
//           <DirectionsCarIcon /> <br />
//           Transport
//           <p>${categories.transport}</p>
//         </span>
//         <span className={styles.span}>
//          <LocalMallIcon /> <br />
//           Other<p>${categories.other}</p>
//         </span>
//       </div>
//       <Button
//         variant="contained"
//         onClick={redirect}
//         sx={{ fontSize: 20, margin: 1, width: 300 }}>
//         <AddIcon sx={{ fontSize: 25 }} />
//         add expense
//       </Button>
//     </div>
//   );
// };

// export default Dashboard;


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
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountBalanceWallet } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
  

const Dashboard = () => {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const [isLoggedIn , setIsLoggedIn] = useState()
  const [userName, setUserName] = useState("")
  const router = useRouter();
  const [amount, setAmount] = useState()
  const [categories, setCategories] = useState({
    food: 0,
    transport: 0,
    other: 0
  })
const [open, setOpen] = useState(false)




  const getTotalPerCurrentMonth = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select("amount, date")
      .filter("date", "gte", `2026-${currentMonth < 10 ? `0${currentMonth}` : currentMonth}-01`)
      .filter("date", "lte", `2026-${currentMonth < 10 ? `0${currentMonth}` :  currentMonth}-28`) // assuming 28 days in a month for simplicity
    const total = data?.reduce((acc, current) => {
     return acc + current.amount
    },0)
    if(error){
      console.log("error fetching", error);
      return
    } 
   
setAmount(total) 



    
   
  };





  const logUser = async () => {

     const {
       data: { user },
     } = await supabase.auth.getUser();
     if (!user) {
   setIsLoggedIn(false)
       return;
     }
  const { data, error } = await supabase.auth.getUser();
  const name = await data.user.user_metadata.name
    setUserName(name.charAt(0).toUpperCase() + name.slice(1))
    setIsLoggedIn(true)
    
}

  useEffect(() => {
    setTimeout(() => {
      logUser()
      
    }, 300);
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
    
   
    
  
  
  
  const totalSpent = async () => {
    const { data: { user }} = await supabase.auth.getUser()
    if (!user) {
      
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
  
  
  
  useEffect(() => {
      setTimeout(() => {
      foodCategory()
      transportCategory()
      otherCategory()
      totalSpent()
    }, 1000)
  
  },[])
  
  const logout = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
     router.push("/login");
      return;
    }
    const { error } = await supabase.auth.signOut({ scope: "local" });
    router.push("/login")
}


  return (
    <div className={styles.container}>
      <div className={styles.header}>
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
            <p className={styles.welcomeBack}>
              {isLoggedIn ? `Welcome back, ${userName}` : "Please login first!" }
              
              
              </p>
          </div>
        </div>
      <div className={styles.mobileMenu}>
        <button style={{color:"blue"}} onClick={()=> setOpen(!open)} className={styles.toggle}>
              {open ? "✕" : "☰"}
        </button>
</div>
          <div className={`${styles.headerButtons} ${open? styles.active : ""}`}>


              <Button
                sx={{
                  width: 120,
                  height: 50,
                                fontWeight:"bold",

                }}
                onClick={totalSpent}
                variant="contained">
                total
              </Button>
          <Button
            sx={{
              width: 120,
              height: 50,
                            fontWeight:"bold",

            }}
            onClick={getTotalPerCurrentMonth}
            variant="contained">
            this month
          </Button>
          <Button
            sx={{
              width: 120,
              height: 50,
                            fontWeight:"bold",

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
              fontWeight:"bold",
       
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
        <h3 className={styles.headerText}>Total Spent</h3>
        <p className={styles.p}>${amount ? amount.toLocaleString(): 0}</p>
      </div>

      <div className={styles.categories}>
        <span className={styles.span}>
          <div>
            <RestaurantIcon
              sx={{
                width: "50px",
                height: "50px",
                color: "orangered",

              }}
            />
            <br />
          </div>
          <div className={styles.spanContent}>
            <p className={styles.spanHeader}>Food</p>
            <p className={styles.spanPrice}>${categories.food.toLocaleString()}</p>
          </div>
        </span>
        <span className={`${styles.span} ${styles.midSpan}`}>
          <div>
            <DirectionsCarIcon
              sx={{
                width: "50px",
                height: "50px",
                color: "blue",
              }}
            />
            <br />
          </div>
          <div className={styles.spanContent}>
            <p className={styles.spanHeader}>Transport</p>
            <p className={styles.spanPrice}>${categories.transport.toLocaleString()}</p>
          </div>
        </span>
        <span className={styles.span}>
          <div>
            <LocalMallIcon
              sx={{
                width: "50px",
                height: "50px",
                color: "#60b9fc",
              }}
            />
            <br />
          </div>
          <div className={styles.spanContent}>
            <p className={styles.spanHeader}> Other </p>
            <p className={styles.spanPrice}>${categories.other.toLocaleString()}</p>
          </div>
        </span>
      </div>
      <Button
        variant="contained"
        onClick={()=> router.push("/add")}
        sx={{ fontSize: 20, marginBottom: 20, width: 250, marginTop: 3,              fontWeight:"bold",
}}>
        <AddIcon sx={{ fontSize: 25 }} />
        add expense
      </Button>
    </div>
  );
};

export default Dashboard;

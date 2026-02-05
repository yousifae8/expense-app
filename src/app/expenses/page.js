// 'use client'

// import styles from "./expenses.module.css"
// import supabase from "../supabase";
// import { useEffect, useState } from "react";
// import { Button } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useRouter } from "next/navigation";
// import CloseIcon from "@mui/icons-material/Close";


// const Expenses = () => {
//   const router = useRouter()
//   const [items, setItems] = useState([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [deleteItem, setDeleteItem] = useState()
//   const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false)
//   const [data, setData] = useState({
//     amount: "",
//     date: "",
//     category: "",
//     id: ""
//   });





//   const handleSave = async () => {


    
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) {
//       console.log("not logged in");
//       return;
//     }
//     const { data: expenses, error } = await supabase
//       .from("expenses")
//       .update({
//         amount: data.amount,
//         category: data.category,
//         date: data.date,
//       })
//       .eq("id", data.id)
//       .select();
//     if (error) {
//       console.error("update error", error);
      
//     } else {
//       await readAll()
//       setIsModalOpen(!isModalOpen)
//       setData({ amount: "", date: "", category: "", id: "" })
      
//     }

//   }



  
//   const readAll = async() =>  {
//     const { data: expenses, error } = await supabase
//       .from("expenses")
//       .select("*");
//     if (error) {
//     console.log("error fetching");
    
//     }
//     setItems(expenses || []
//     )

//   }
//   useEffect(() => {
  
//     readAll()
    
//   }, [])



//   return (
//     <div>
//       <div
//         style={{
//           display: isModalOpen ? "block" : "none",
//         }}
//         className={`${styles.modal}  `}>
//         <div className={styles.modalContainer}>
//           <div className={styles.innerContent}>
//             <input
//               type="text"
//               value={data.amount}
//               onChange={(e) => {
//                 setData({ ...data, amount: e.target.value });
//               }}
//               placeholder="Amount"
//               className={styles.input}
//             />
//             <input
//               type="date"
//               value={data.date}
//               onChange={(e) => {
//                 setData({ ...data, date: e.target.value });
//               }}
//               className={styles.input}
//             />
//             <select
//               name=""
//               id=""
//               className={styles.input}
//               value={data.category}
//               onChange={(e) => {
//                 setData({ ...data, category: e.target.value });
//               }}>
//               <option value="Food">Food</option>
//               <option value="Transport">Transport</option>
//               <option value="Other">Other</option>
//             </select>
//             <Button
//               variant="contained"
//               sx={{
//                 width: "400px",
//                 margin: "10px",
//               }}
//               onClick={handleSave}>
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div
//         style={{
//           display: isDeletionModalOpen ? "block" : "none",
//         }}
//         className={`${styles.modal} `}
      
//       >

//         <div className={styles.iconscontainer}>
//           <div className={styles.icons}>
//             <div className={styles.cancel}>
              
//               <CloseIcon
//                 sx={{
//                   cursor: "pointer",
//                   color: "white"
//                 }}
//               onClick={() => setIsDeletionModalOpen(false)}
//               className={styles.crossicon}
//           />
//             </div>
//             <div className={styles.paragraph}>
//               <p>
//                 are you sure you want to delete
//               </p>
//             </div>
//             <div>
              
//               <Button variant="contained" sx={{
//                 marginRight: 3
//               }}
//                 onClick={async () => {
//                   const { error } = await supabase
//                     .from("expenses")
//                     .delete()
//                     .eq("id", deleteItem);
//                   if (error) {
//                     console.error("delete error", error);
//                   } else {
//                     await readAll();
//                     setIsDeletionModalOpen(false)
//                   }
//                 }}
//               >
//             Yes
//           </Button>
//           <Button variant="contained" onClick={()=> setIsDeletionModalOpen(false)} >
//             No
//           </Button>
//           </div>
//           </div>
//         </div>


//         </div>


//       <div>
//         <ArrowBackIcon
//           sx={{
//             margin: 3,
//             color: "blue",
//             cursor: "pointer",
//           }}
//           onClick={() => {
//             router.push("/dashboard");
//           }}></ArrowBackIcon>
//       </div>
//       <div className={styles.container}>
//         <div className={styles.innerContainer}>
//           <div className={styles.header}>
//             <h1>Edit Or Remove Expenses</h1>
//           </div>
//           <div className={styles.dashboard}>
//             {items.map((item) => {
//               return (
//                 <div key={item.id} className={styles.item}>
//                   <p>{`${item.category}`}</p> <p> {`${item.amount}`}</p>
//                   <button
//                     onClick={
//                       () => {
//                         setIsDeletionModalOpen(true);
//                         setDeleteItem(item.id)
//                       }

                   
//                     }
//                     className={styles.btnOne}>
//                     delete
//                   </button>
//                   <button
//                     className={styles.btnTwo}
//                     onClick={() => {
//                       setIsModalOpen(!isModalOpen);
//                       {
//                         setData({
//                           amount: item.amount,
//                           date: item.date,
//                           category: item.category,
//                           id: item.id,
//                         });
//                       }
//                     }}>
//                     edit
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Expenses


'use client'

import styles from "./expenses.module.css"
import supabase from "../supabase";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function Expenses() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState()
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false)
  const [data, setData] = useState({
    amount: "",
    date: "",
    category: "",
    id: ""
  });

  const iconsStyles = {
    width: 30,
    height: 30,
  };



  const handleSave = async () => {


    
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
alert("Please login first!")
      return;
    }
    const { data: expenses, error } = await supabase
      .from("expenses")
      .update({
        amount: data.amount,
        category: data.category,
        date: data.date,
      })
      .eq("id", data.id)
      .select();
    if (error) {
      console.error("update error", error);
      
    } else {
      await readAll()
      setIsModalOpen(!isModalOpen)
      setData({ amount: "", date: "", category: "", id: "" })
      
    }

  }



  
  const readAll = async() =>  {
    const { data: expenses, error } = await supabase
      .from("expenses")
      .select("*");
    if (error) {
    console.log("error fetching");
    
    }
    setItems(expenses || []
    )

  }
  useEffect(() => {
  
    readAll()
    
  }, [])



  return (
    <div>
      <div
        style={{
          display: isModalOpen ? "block" : "none",
        }}
        className={`${styles.modal}  `}>
        <div className={styles.modalContainer}>
          <CloseIcon
            onClick={() => setIsModalOpen(false)}
            sx={{
              cursor: "pointer",
              position: "absolute",
              right: 5,
              top: 5,
              color: "white",
            }}
          />
          <div className={styles.innerContent}>
            <input
              type="text"
              value={data.amount}
              onChange={(e) => {
                setData({ ...data, amount: e.target.value });
              }}
              placeholder="Amount"
              className={styles.input}
            />
            <input
              type="date"
              value={data.date}
              onChange={(e) => {
                setData({ ...data, date: e.target.value });
              }}
              className={styles.input}
            />
              <Box sx={{ minWidth: 120,backgroundColor: "#f5f5f5" , padding:0}} className={styles.input}>
                  <Select
                  style={{ border: " none", margin:0, width: "100%"}}
                 
                    displayEmpty
                                  value={data.category}
                                                className={styles.input}

 onChange={(e) => {
                setData({ ...data, category: e.target.value });
              }}
                  >
                    <MenuItem value="" disabled>
                      Select category...
                    </MenuItem>
                    <MenuItem value={"Food"}>Food</MenuItem>
                    <MenuItem value={"Transport"}>Transport</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </Box>
            {/* <select
              name=""
              id=""
              className={styles.input}
              value={data.category}
              onChange={(e) => {
                setData({ ...data, category: e.target.value });
              }}>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select> */}
            <Button
              variant="contained"
              sx={{
                width: "250px",
                margin: "10px",
              }}
              onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
          display: isDeletionModalOpen ? "block" : "none",
        }}
        className={`${styles.modal} `}>
        <div className={styles.iconscontainer}>
          <div className={styles.icons}>
            <div className={styles.cancel}>
              <CloseIcon
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  right: 5,
                  top: 5,
                  color: "white",
                }}
                onClick={() => setIsDeletionModalOpen(false)}
                className={styles.crossicon}
              />
            </div>
            <div className={styles.paragraph}>
              <p>Are you sure you want to delete?</p>
            </div>
            <div>
              <Button
                variant="contained"
                sx={{
                  marginRight: 3,
                }}
                onClick={async () => {
                  const { error } = await supabase
                    .from("expenses")
                    .delete()
                    .eq("id", deleteItem);
                  if (error) {
                    console.error("delete error", error);
                  } else {
                    await readAll();
                    setIsDeletionModalOpen(false);
                  }
                }}>
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsDeletionModalOpen(false)}>
                No
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ArrowBackIcon
          sx={{
            margin: 3,
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/dashboard");
          }}></ArrowBackIcon>
      </div>
      <div className={styles.header}>
        <h1>Expenses</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.tableHead}>
            <div>Date</div>
            <div>Category</div>
            <div>Amount</div>
          </div>
          <div className={styles.dashboard}>
            {items.map((item) => {
              return (
                <div key={item.id} className={styles.item}>
                  {item.date}
                  <div className={styles.category}>
                    <div className={styles.icon}>
                      {item.category == "Food" ? (
                        <RestaurantIcon
                          style={iconsStyles}
                          sx={{ color: "orangered" }}
                        />
                      ) : (
                        ""
                      )}
                      {item.category == "Transport" ? (
                        <DirectionsCarIcon
                          style={iconsStyles}
                          sx={{ color: "blue" }}
                        />
                      ) : (
                        ""
                      )}
                      {item.category == "Other" ? (
                        <LocalMallIcon
                          sx={{ color: "#60b9fc" }}
                          style={iconsStyles}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {`${item.category}`}
                  </div>{" "}
                  <div className={styles.amountContainer}>
                    <p className={styles.amount}> {item.amount.toLocaleString()}</p>
                  </div>
                  <div className={styles.btn}>
                  <Button
                    // className={styles.btnTwo}
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                      {
                        setData({
                          amount: item.amount,
                          date: item.date,
                          category: item.category,
                          id: item.id,
                        });
                      }
                    }}
sx={{                      fontWeight: "bold"
}}
                    
                    >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setIsDeletionModalOpen(true);
                      setDeleteItem(item.id);
                    }}
                    // className={styles.btnOne}
                    
                    sx={{color: "red",
                      fontWeight: "bold"
                    }}
                    >
                    Delete
                  </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// export default Expenses
import { TextField, Button, Grid, Box, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import CowDataTable from "./CowDataTable";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const CowDetailForm = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    cowPrice: "",
    cowWeight: "",
    cowName: "",
    cowNumber: "",
    extraExpense: "",
    weightPerPerson: "",
    totalExpense: "",
    hissaCost: 17000,
    purchasedDate: "",
    persons: [],
  });

  const usersCollectionRef = collection(db, "cows");

  const createData = async () => {
    toast.success("Data Created")
    await setDoc(doc(db, "cows" , form.cowNumber) , {
      cowPrice: parseInt(form.cowPrice),
      cowWeight: form.cowWeight,
      cowName: form.cowName,
      cowNumber: form.cowNumber,
      extraExpense: parseInt(form.extraExpense),
      weightPerPerson: parseInt(Math.floor(form.cowWeight / 7)),
      totalExpense: parseInt(Math.floor(parseInt(form.cowPrice) + parseInt(form.extraExpense))),
      hissaCost: 17000,
      purchasedDate: form.purchasedDate,
      persons: [],
    })
    // await addDoc(usersCollectionRef, {
    //   cowPrice: parseInt(form.cowPrice),
    //   cowWeight: form.cowWeight,
    //   cowName: form.cowName,
    //   cowNumber: form.cowNumber,
    //   extraExpense: parseInt(form.extraExpense),
    //   weightPerPerson: parseInt(Math.floor(form.cowWeight / 7)),
    //   totalExpense: parseInt(Math.floor(parseInt(form.cowPrice) + parseInt(form.extraExpense))),
    //   hissaCost: 17000,
    //   purchasedDate: form.purchasedDate,
    //   persons: [],
    // });

   
// navigate("/cowDetailTable")

    setForm({
      cowPrice: "",
      cowWeight: "",
      purchasedDate: "",
      cowName: "",
      cowNumber: "",
      extraExpence: "",
      weightPerPerson: "",
    totalExpense: "",
    });
    window.location.reload(true);
  };

  const handleChange = (e, key) => {
    const value = e.target.value;

    setForm((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  

  return (
    <>
      <h1>تفصیلات گائے</h1>
      <Grid container spacing={3}>
        <Grid container item spacing={3}>
          <Grid item md={4}>
            <InputLabel
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "10px 0",
                textAlign: "left",
              }}
            >
              قیمت گائے
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              onChange={(e) => handleChange(e, "cowPrice")}
              value={form.cowPrice}
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <InputLabel
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "10px 0",
                textAlign: "left",
              }}
            >
              گائے کا کل وزن
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              onChange={(e) => handleChange(e, "cowWeight")}
              value={form.cowWeight}
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <InputLabel
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "10px 0",
                textAlign: "left",
              }}
            >
              تاریخ
            </InputLabel>
            <TextField
              variant="outlined"
              type="date"
              onChange={(e) => handleChange(e, "purchasedDate")}
              value={form.purchasedDate}
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <InputLabel
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "10px 0",
                textAlign: "left",
              }}
            >
              نام گائے
            </InputLabel>
            <TextField
              variant="outlined"
              type="text"
              onChange={(e) => handleChange(e, "cowName")}
              value={form.cowName}
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <InputLabel
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "10px 0",
                textAlign: "left",
              }}
            >
              گائے نمبر
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              onChange={(e) => handleChange(e, "cowNumber")}
              value={form.cowNumber}
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <InputLabel
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "10px 0",
                textAlign: "left",
              }}
            >
             اضافی اخراجات 
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              onChange={(e) => handleChange(e, "extraExpense")}
              value={form.extraExpense}
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <InputLabel sx={{fontSize: "20px", fontWeight: "600" , margin:"10px 0" , textAlign: "left"}}>
            وزن فی کس
            </InputLabel>
            <TextField variant="outlined" type="number" value={Math.floor(form.cowWeight / 7)} disabled fullWidth />
          </Grid>
          <Grid item md={4}>
            <InputLabel sx={{fontSize: "20px" , fontWeight: "600" , margin: "10px 0" , textAlign: "left"}}>
            کل خرچہ
              </InputLabel>
              <TextField variant="outlined" type="number" value={Math.floor(parseInt(form.cowPrice) + parseInt(form.extraExpense))} disabled fullWidth />
          </Grid>
        </Grid>

        <Grid container item spacing={3}>
          <Grid item md={3}>
            <Button onClick={createData} variant="contained" fullWidth>
              Add Cow
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* <Box sx={{margin:"50px 0"}}>
        <CowDataTable />
      </Box> */}
    </>
  );
};

export default CowDetailForm;

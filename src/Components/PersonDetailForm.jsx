import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PersonDataTable from "./PersonDataTable";

const PersonDetailForm = () => {
  const navigate = useNavigate();
  const [cows, setCows] = useState([]);
  const [select, setSelect] = useState("");
  const personsCollectionRef = collection(db, "persons");
  const cowsCollectionRef = collection(db, "cows");
  const [cow, setCow] = useState("");
  const [form, setForm] = useState({
    personName: "",
    phoneNumber: "",
    cowNumber: "",
    advancePaid: "",
    remainingPayment: "",
    noOfHissa: "1",
  });

  const handleChange = (e, key) => {
    const value = e.target.value;

    setForm((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const createData = async () => {
    await addDoc(personsCollectionRef, {
      personName: form.personName,
      phoneNumber: form.phoneNumber,
      cowNumber: form.cowNumber,
      advancePaid: form.advancePaid,
      remainingPayment: Math.floor(
        17000 * form.noOfHissa -
          form.advancePaid +
          (cow.extraExpense / 7)),
      noOfHissa: form.noOfHissa,
    });

    const cowDoc = doc(db, "cows", form.cowNumber);
    await updateDoc(cowDoc, {
      persons: arrayUnion(form.personName),
    });

    // navigate(`/cowDetails/${form.cowNumber}`)

    console.log({form})

    setForm({
      personName: "",
      phoneNumber: "",
      cowNumber: "",
      advancePaid: "",
      remainingPayment: "",
      noOfHissa: "",
    });
  };

  const getCow = async () => {
    const cowDoc = doc(db, "cows", form.cowNumber);
    const cowDetail = await getDoc(cowDoc);
    setCow(cowDetail.data());
  };

  const getCows = async () => {
    const data = await getDocs(cowsCollectionRef);
    setCows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getCow();
    getCows();
  }, [form.cowNumber]);

  return (
    <>
      <h1>تفصیلات فی کس</h1>
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
              نام
            </InputLabel>
            <TextField
              variant="outlined"
              type="text"
              onChange={(e) => handleChange(e, "personName")}
              fullWidth
              value={form.personName}
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
              فون نمبر
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              onChange={(e) => handleChange(e, "phoneNumber")}
              value={form.phoneNumber}
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
            <Select
              value={form.cowNumber}
              onChange={(e) => handleChange(e, "cowNumber")}
              fullWidth
            >
              {cows.map((cow, idx) => {
                return (
                  <MenuItem value={cow.id} key={cow.id}>
                    {" "}
                      ( {cow.cowNumber} )
                  </MenuItem>
                );
              })}
            </Select>
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
              بقايا جات واجب الوصول
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              value={form.advancePaid}
              onChange={(e) => handleChange(e, "advancePaid")}
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
              بقایا جات واجب الاداء
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              value={Math.floor(
                17000 * form.noOfHissa -
                  form.advancePaid +
                  (cow.extraExpense / 7)
              )}
              disabled
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
              حصہ
            </InputLabel>
            <Select
              value={form.noOfHissa}
              onChange={(e) => handleChange(e, "noOfHissa")}
              fullWidth
            >
              <MenuItem value={1}> 1 </MenuItem>
              <MenuItem value={2}> 2 </MenuItem>
              <MenuItem value={3}> 3 </MenuItem>
              <MenuItem value={4}> 4 </MenuItem>
              <MenuItem value={5}> 5 </MenuItem>
              <MenuItem value={6}> 6 </MenuItem>
              <MenuItem value={7}> 7 </MenuItem>
            </Select>
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
              معرفت
            </InputLabel>
            <TextField
              variant="outlined"
              type="text"
              onChange={(e) => handleChange(e, "refPersonName")}
              value={form.refPersonName}
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
              فون نمبر
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              onChange={(e) => handleChange(e, "refPhoneNo")}
              value={form.refPhoneNo}
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
              اضافی اخراجات فی کس
            </InputLabel>
            <TextField
              variant="outlined"
              type="number"
              value={Math.floor(cow.extraExpense / 7) }
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container item spacing={3}>
          <Grid item md={3}>
            <Button variant="contained" onClick={createData} fullWidth>
              {" "}
              Add Person{" "}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ margin: "50px 0" }}>
        <PersonDataTable />
      </Box>
    </>
  );
};

export default PersonDetailForm;

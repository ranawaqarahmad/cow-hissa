import { TextField, Button, Grid, Box , InputLabel} from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import CowDataTable from "./CowDataTable";
import { useParams } from "react-router-dom";

const CowDetailForm = () => {
  // const [personName, setPersonName] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataArray, setDataArray] = useState([]);

  const [form, setForm] = useState({
    cowPrice: "",
    cowWeight: "",
    hissaCost: 17000,
    purchasedDate: "",
    persons: []
  });

  const usersCollectionRef = collection(db, "cows");
  const personsCollectionRef = collection(db, "persons");

  const createData = async () => {
    setLoading(true);

    await addDoc(usersCollectionRef, {
      cowPrice: form.cowPrice,
      cowWeight: form.cowWeight,
      hissaCost: 17000,
      purchasedDate: form.purchasedDate,
      persons: []
    });

    // await addDoc(personsCollectionRef , {

    // })

    setForm({
      cowPrice: "",
      cowWeight: "",
      purchasedDate: "",
    });
    
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

  let { cowId } = useParams();

  const [singleCow, setSingleCow] = useState("");

  useEffect(() => {
    // const getCow = async () => {
    //   const cowDoc = doc(db, "cows", cowId);
    //   const cowDetail = await getDoc(cowDoc);
    //   setSingleCow(cowDetail.data());
    // };
    // getCow();
  }, []);
  // console.log(singleCow.cowPrice);
  return (
    <>
      <h1>Cow Detail {cowId} </h1>
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
              Cow Price
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
            Cow Weight
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
            Purchased Date
            </InputLabel>
            <TextField
              variant="outlined"
              type="date"
              onChange={(e) => handleChange(e, "purchasedDate")}
              value={form.purchasedDate}
              fullWidth
            />
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

      <Box>
        <CowDataTable />
      </Box>
    </>
  );
};

export default CowDetailForm;

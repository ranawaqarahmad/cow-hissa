import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CowDataTable = () => {
  const navigate = useNavigate();
  const [dataArray, setDataArray] = useState([]);
  const [persons, setPersons] = useState([]);

  const getData = async () => {
    const cowsCollectionRef = collection(db, "cows");
    const data = await getDocs(cowsCollectionRef);

    setDataArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // const getCow = async () => {
  //   const personsCollectionRef = collection(db, "persons");
  //   const data = await getDocs(personsCollectionRef);
  //   setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>تفصیلات گائے</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Cow Price</TableCell>
              <TableCell>Cow Weight</TableCell>
              <TableCell>Cow Number</TableCell>
              <TableCell>Extra Expenses</TableCell>
              <TableCell>Weight Per Person</TableCell>
              <TableCell>Purchased Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataArray.map((data, idx) => {
              return (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell> {idx + 1} </TableCell>
                  <TableCell> RS {data.cowPrice} </TableCell>
                  <TableCell> {data.cowWeight} KG </TableCell>
                  <TableCell> {data.cowNumber} </TableCell>
                  <TableCell> RS {data.extraExpense} </TableCell>
                  <TableCell> {data.weightPerPerson} KG </TableCell>
                  <TableCell> {data.purchasedDate} </TableCell>
                  <TableCell>
                    {" "}
                    <IconButton
                      onClick={async () => {
                        toast.error("Deleted");
                        await deleteDoc(doc(db, "cows", data.id));
                        const newData = dataArray.filter(
                          (cow) => cow.id !== data.id
                        );
                        setDataArray(newData);
                        // navigate("/")
                      }}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>{" "}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CowDataTable;

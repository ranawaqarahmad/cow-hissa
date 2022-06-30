import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, 
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";

const CowDataTable = () => {
  const [dataArray, setDataArray] = useState([]);
  const [persons, setPersons] = useState([]);

  const getData = async () => {
    const cowsCollectionRef = collection(db, "cows");
    const data = await getDocs(cowsCollectionRef);

    setDataArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getCow = async () => {
    const personsCollectionRef = collection(db, "persons");
    const data = await getDocs(personsCollectionRef);
    setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getCow();
    getData();
  }, [dataArray]);
 
  return (
    <>
      <h1>Cow Data Table</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Cow Price</TableCell>
              <TableCell>Cow Weight</TableCell>
              <TableCell>Purchased Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataArray.map((data , idx) => {
              return (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell> {idx + 1} </TableCell>
                  <TableCell> RS {data.cowPrice} </TableCell>
                  <TableCell> {data.cowWeight} KG </TableCell>

                  <TableCell> {data.purchasedDate} </TableCell>
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

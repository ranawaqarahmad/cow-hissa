import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { Delete as DeleteIcon } from "@mui/icons-material";

const PersonDataTable = () => {
  const [persons, setPersons] = useState([]);

  const getData = async () => {
    const personsCollectionRef = collection(db, "persons");
    const data = await getDocs(personsCollectionRef);
    setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "persons", id));
  };

  useEffect(() => {
    getData();
  }, [persons]);

  return (
    <>
      <h1>تفصیلات فی کس</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Person Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Cow Number</TableCell>
              <TableCell>Advance Paid</TableCell>
              <TableCell>Remaining Payment</TableCell>
              <TableCell>No. of Hissa's</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person, idx) => {
              return (
                <TableRow
                  key={person.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell> {idx + 1} </TableCell>
                  <TableCell> {person.personName} </TableCell>
                  <TableCell> {person.phoneNumber} </TableCell>
                  <TableCell> {person.cowNumber} </TableCell>
                  <TableCell> RS {person.advancePaid} </TableCell>
                  <TableCell> RS {person.remainingPayment} </TableCell>
                  <TableCell> {person.noOfHissa} </TableCell>
                  <TableCell>
                    {" "}
                    <IconButton
                      onClick={async () => {
                        await deleteDoc(doc(db, "persons", person.id));
                      }}
                    >
                      <DeleteIcon sx={{color: 'red'}} />
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

export default PersonDataTable;

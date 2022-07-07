import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableCell: {
    fontSize: "15px !important",
    fontWeight: "600 !important",
    margin: "10px 0 !important",
    textAlign: "right !important",
    border: "1px solid black !important",
    borderBottom: "1px solid black !important"
  },
  border:{
    border:"1px solid black"
  }
});

const PrintDetails = () => {
  const { personId } = useParams();
  const classes = useStyles();
  const [person, setPerson] = useState("");
  const [cow, setCow] = useState("");
  const getPerson = async () => {
    const personDoc = doc(db, "persons", personId);
    const personDetail = await getDoc(personDoc);
    setPerson(personDetail.data());
    const cowDoc = doc(db, "cows", person.cowNumber);
    const cowDetail = await getDoc(cowDoc);
    setCow(cowDetail.data());
  };

  const getCow = async () => {
    const cowDoc = doc(db, "cows", person.cowNumber);
    const cowDetail = await getDoc(cowDoc);
    setCow(cowDetail.data());
  };

  function printTable(divID) {
    //Get the HTML of div
    var divElements = document.getElementById(divID).innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;
    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
      "<html><head><title></title></head><body>" + divElements + "</body>";
    //Print Page
    window.print();
    //Restore orignal HTML
    document.body.innerHTML = oldPage;
  }

  useEffect(() => {
    getPerson();
    // getCow();
  }, [person.cowNumber]);
  console.log("person id", person);
  console.log("cow", cow);
  return (
    <>
      <div id="printableTable">
        <img src="../src/assets/images/upper-img.jpg" alt="img" />
        <TableContainer sx={{ width: "80%", margin: "10px auto" }} className={classes.border}>
          <Table >
            <TableRow >
              <TableCell className={classes.tableCell}>
                {" "}
                :ایڈوانس فی کس
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {cow.cowPrice} :کل قیمت گائے
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor(cow.extraExpense / 7)} :اضافی اخراجات فی کس{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>
                {" "}
                {person.advancePaid} :بقايا جات واجب الوصول
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor(cow.cowPrice / 7)} :قیمت گائے فی کس
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor(cow.totalExpense / 7)} :کل خرچہ فی کس
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>
                {" "}
                {person.remainingPayment} :بقایا جات واجب الاداء
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {cow.cowWeight} :گائے کا کل وزن
              </TableCell>
              <TableCell className={classes.tableCell}> :کیفیت</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>
                {" "}
                {cow.cowNumber} :گائے نمبر
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor(cow.cowWeight / 7)} :وزن فی کس
              </TableCell>
              <TableCell className={classes.tableCell}> :دستخط</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <img src="../src/assets/images/bottom-img.jpg" alt="img" />
      </div>
      <Button variant="contained" onClick={() => printTable("printableTable")} sx={{margin:"50px"}}>
        Print
      </Button>
    </>
  );
};

export default PrintDetails;

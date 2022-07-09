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
import UpperImg from "../../src/assets/images/image.png";
import BottomImg from "../../src/assets/images/bottom-img.jpg";

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
    var divElements = document.getElementById(divID).innerHTML;
    var oldPage = document.body.innerHTML;
    document.body.innerHTML =
      "<html><head><title></title></head><body>" + divElements + "</body>";

    window.print();
 
    document.body.innerHTML = oldPage;
  }

  useEffect(() => {
    getPerson();
    // getCow();
  }, [person.cowNumber]);

  return (
    <>
      <div id="printableTable">
        <div className="img-hcn" style={{position: "relative"}}>
        <img src={UpperImg} alt="img" />
       <div className="overlay" style={{position: "absolute",
    top: "46%",
    left: "46%",
    fontSize: "25px",
    fontWeight: "700"}}>{person.personName}</div>
        </div>
        <TableContainer sx={{ width: "80%", margin: "10px auto" }} className={classes.border}>
          <Table >
            <TableRow >
              <TableCell className={classes.tableCell}>
                {" "}
               {person.advancePaid} :ایڈوانس فی کس
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {cow.cowPrice} :کل قیمت گائے
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor(cow.extraExpense)} :اضافی اخراجات فی کس{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor(
                ((cow.cowPrice / 7 + cow.extraExpense) * person.noOfHissa) - person.advancePaid
              ) < 0 ? 0 : Math.floor(
                ((cow.cowPrice / 7 + cow.extraExpense ) * person.noOfHissa)- person.advancePaid
              ) } :بقايا جات واجب الوصول
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor(cow.cowPrice / 7)} :قیمت گائے فی کس
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor((cow.cowPrice / 7) + cow.extraExpense )} :کل خرچہ فی کس
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell}>
                {" "}
                {Math.floor(
                person.advancePaid - ((cow.cowPrice / 7 + cow.extraExpense) * person.noOfHissa)
              ) < 0 ? 0 : Math.floor(
                person.advancePaid - ((cow.cowPrice / 7 + cow.extraExpense) * person.noOfHissa)
              )} :بقایا جات واجب الاداء
              </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                {cow.cowWeight} :گائے کا کل وزن
              </TableCell>
              <TableCell className={classes.tableCell}>  کیفیت : {cow.cowName} </TableCell>
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
        <img src={BottomImg} alt="img" />
      </div>
      <Button variant="contained" onClick={() => printTable("printableTable")} sx={{margin:"50px"}}>
        Print
      </Button>
    </>
  );
};

export default PrintDetails;

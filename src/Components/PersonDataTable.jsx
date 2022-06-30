import { Table , TableBody , TableHead, TableContainer, TableCell , TableRow} from '@mui/material';
import {collection , getDocs} from 'firebase/firestore';
import {useState, useEffect } from 'react';
import {db} from '../utils/firebase';

const PersonDataTable = () => {
    const [persons , setPersons] = useState([]);

    const getData = async () => {
        const personsCollectionRef = collection(db , 'persons');
        const data = await getDocs(personsCollectionRef);
        setPersons(data.docs.map((doc) => ({...doc.data() , id: doc.id})))
    }

    useEffect(() => {
        getData()
    } , [persons])

    return(
        <>
            <h1>Persons Data Table</h1>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            persons.map((person , idx) => {
                                return(
                                    <TableRow key={person.id}
                                    sx={{"&:last-child td, &:last-child th" : {border: 0}}}>
                                        <TableCell> {idx + 1} </TableCell>
                                        <TableCell> {person.personName} </TableCell>
                                        <TableCell> {person.phoneNumber} </TableCell>
                                        <TableCell> {person.cowNumber} </TableCell>
                                        <TableCell> RS {person.advancePaid} </TableCell>
                                        <TableCell> RS {person.remainingPayment} </TableCell>
                                        <TableCell> {person.noOfHissa} </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default PersonDataTable;
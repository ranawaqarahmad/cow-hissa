import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CowDetailForm from "./Components/CowDetailForm";
import {Container, Box} from '@mui/material'
import PersonDetailForm from "./Components/PersonDetailForm";
import PrintDetails from "./Components/PrintDetails";
import PersonDataTable from "./Components/PersonDataTable";
import CowDataTable from "./Components/CowDataTable";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
    <div className="App">
      <Box sx={{padding:'30px 50px' , backgroundColor: '#e8e8e8' , display: 'flex' , width: '80%' , margin: 'auto' , justifyContent: 'space-evenly' }}>
      <Link to="/" style={{color: '#000' , textDecoration: 'none' , fontWeight: '600' , cursor: 'pointer' , fontSize: '20px'  , borderRight: "2px solid black"  , paddingRight: "20px"}}>Cow Detail</Link>
      <Link to="/cowDetailTable" style={{color: '#000' , textDecoration: 'none' , fontWeight: '600' , cursor: 'pointer' , fontSize: '20px' , borderRight: "2px solid black" ,paddingRight: "20px" }}>Cow Detail Table</Link>
        <Link to="personDetail" style={{color: '#000' , textDecoration: 'none' , fontWeight: '600' , cursor: 'pointer' , fontSize: '20px'  , borderRight: "2px solid black" , paddingRight: "20px"}} >Person Detail</Link>
        <Link to="personDetailTable" style={{color: '#000' , textDecoration: 'none' , fontWeight: '600' , cursor: 'pointer' , fontSize: '20px'  }} >Person Detail Table</Link>
        
      </Box>
      <Routes>
        <Route path="/" element={<CowDetailForm />} />
        <Route path="/personDetail" exact element={<PersonDetailForm />} />
        <Route path="/print-details/:personId" element={<PrintDetails />} />
        <Route path="/personDetailTable" exact element={<PersonDataTable />} />
        <Route path="/cowDetailTable" exact element={<CowDataTable />} />
      </Routes>
    </div>
    </Container>
  );
}

export default App;

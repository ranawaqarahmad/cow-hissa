import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CowDetailForm from "./Components/CowDetailForm";
import {Container, Box} from '@mui/material'
import PersonDetailForm from "./Components/PersonDetailForm";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
    <div className="App">
      <Box sx={{padding:'30px 50px' , backgroundColor: '#e8e8e8' , display: 'flex' , width: '50%' , margin: 'auto' , justifyContent: 'space-evenly' }}>
       
        <Link to="personDetail" style={{color: '#000' , textDecoration: 'none' , fontWeight: '600' , cursor: 'pointer' , fontSize: '20px'  }} >Person Detail</Link>
        <Link to="/" style={{color: '#000' , textDecoration: 'none' , fontWeight: '600' , cursor: 'pointer' , fontSize: '20px'  }}>Cow Detail</Link>
      </Box>
      <Routes>
        <Route path="/" element={<CowDetailForm />} />
        <Route path="/personDetail" exact element={<PersonDetailForm />} />
        {/* <Route path="/cowDetails/:cowId" element={<CowDetailForm />} /> */}
      </Routes>
    </div>
    </Container>
  );
}

export default App;

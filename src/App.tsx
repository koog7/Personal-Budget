import './App.css'
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import CategoryBlock from "./containers/CategoryBlock.tsx";
import AddBlock from "./containers/AddBlock.tsx";

const App = () => {

    return(
        <>
            <div style={{
                backgroundColor: '#404040',
                width: '1000px',
                minHeight: '50px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
            }}>
                <h2 style={{marginLeft: '10px'}}><NavLink className="nav-link" to="/" style={{
                    textDecoration: 'none',
                    color: 'white'
                }}>Finance Tracker</NavLink></h2>
                <NavLink to={'/category'} style={{marginLeft:'auto'}}>Categories</NavLink>
                <NavLink to={'/add'} style={{marginRight:'10px',marginLeft:'20px'}}>Add</NavLink>
            </div>
            <hr/>

            <Routes>
                <Route path="/" element={(
                    <Home/>
                )}/>
                <Route path="/category" element={(
                    <CategoryBlock/>
                )}/>
                <Route path="/add" element={(
                    <AddBlock/>
                )}/>
            </Routes>
        </>
    )

};

export default App

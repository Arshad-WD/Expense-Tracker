import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar/SideBar.jsx';
import Home from './pages/Home/Home.jsx';
import Transactions from './pages/Transaction/Transaction.jsx';
import Settings from './pages/Setting/Setting.jsx';

function App() {
    return (
        <Router>
            <Sidebar />
            <div className='content'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
            </div>
        </Router>
    );
}

export default App;

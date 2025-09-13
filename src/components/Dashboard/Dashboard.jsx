// Updated src/components/Dashboard.js to import CSS
import { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Accueil from './Accueil';
import Orders from './Orders';
import History from './History';
import Logo from '../../assets/images/Logo1.JPG'
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('accueil');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top" className="dashboard-navbar">
        <Container>
          <Navbar.Brand>
            <img src={Logo} alt="Logo" style={{ height: '40px' }} /> {/* Assume logo in public/static */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link active={activeTab === 'accueil'} onClick={() => setActiveTab('accueil')}>Accueil</Nav.Link>
              <Nav.Link active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Orders</Nav.Link>
              <Nav.Link active={activeTab === 'history'} onClick={() => setActiveTab('history')}>Order History</Nav.Link>
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout} className="logout-btn">Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4 dashboard-content">
        {activeTab === 'accueil' && <Accueil />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'history' && <History />}
      </Container>
    </div>
  );
}

export default Dashboard;
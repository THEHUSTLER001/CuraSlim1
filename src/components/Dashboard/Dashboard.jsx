// Updated src/components/Dashboard.js to use logout icon and add language switcher
import { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas, Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaHistory, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
import Accueil from './Accueil';
import Orders from './Orders';
import History from './History';
import Logo from '../../assets/images/Logo1.JPG';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [showSidebar, setShowSidebar] = useState(false);
  const [language, setLanguage] = useState('fr'); // Default to French
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowSidebar(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navTexts = {
    fr: {
      accueil: 'Accueil',
      orders: 'Commandes',
      history: 'Historique des commandes',
      menu: 'Menu',
      logout: 'Déconnexion'
    },
    en: {
      accueil: 'Accueil',
      orders: 'Orders',
      history: 'Order History',
      menu: 'Menu',
      logout: 'Logout'
    }
  };

  const currentTexts = navTexts[language];

  return (
    <div>
      {/* Top Header/Navbar */}
      <Navbar bg="light" expand="lg" sticky="top" className="dashboard-navbar">
        <Container>
          <Navbar.Brand>
            <img src={Logo} alt="Logo" style={{ height: '40px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" onClick={() => setShowSidebar(true)} />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="d-none d-lg-flex me-3">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="lang-dropdown">
                  <FaGlobe className="me-1" /> {language.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setLanguage('fr')}>Français</Dropdown.Item>
                  <Dropdown.Item onClick={() => setLanguage('en')}>English</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Sidebar (Offcanvas) */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start" className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{currentTexts.menu}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column sidebar-nav">
            <Nav.Link className={activeTab === 'accueil' ? 'active' : ''} onClick={() => handleTabChange('accueil')}>
              <FaHome className="me-2" /> {currentTexts.accueil}
            </Nav.Link>
            <Nav.Link className={activeTab === 'orders' ? 'active' : ''} onClick={() => handleTabChange('orders')}>
              <FaList className="me-2" /> {currentTexts.orders}
            </Nav.Link>
            <Nav.Link className={activeTab === 'history' ? 'active' : ''} onClick={() => handleTabChange('history')}>
              <FaHistory className="me-2" /> {currentTexts.history}
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <Button variant="outline-danger" className="w-100">
                <FaSignOutAlt className="me-1" /> {currentTexts.logout}
              </Button>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content Layout */}
      <Container fluid className="dashboard-container">
        <Row>
          {/* Desktop Sidebar */}
          <Col md={3} className="d-none d-lg-block sidebar-col">
            <Nav className="flex-column sidebar-nav">
              <Nav.Link className={activeTab === 'accueil' ? 'active' : ''} onClick={() => handleTabChange('accueil')}>
                <FaHome className="me-2" /> {currentTexts.accueil}
              </Nav.Link>
              <Nav.Link className={activeTab === 'orders' ? 'active' : ''} onClick={() => handleTabChange('orders')}>
                <FaList className="me-2" /> {currentTexts.orders}
              </Nav.Link>
              <Nav.Link className={activeTab === 'history' ? 'active' : ''} onClick={() => handleTabChange('history')}>
                <FaHistory className="me-2" /> {currentTexts.history}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={9} className="dashboard-content">
            {activeTab === 'accueil' && <Accueil language={language} />}
            {activeTab === 'orders' && <Orders language={language} />}
            {activeTab === 'history' && <History language={language} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
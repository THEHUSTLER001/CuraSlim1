// Updated src/components/Accueil.js with French translations and language prop support
import { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaShoppingCart, FaHourglassHalf, FaCheckCircle, FaDollarSign } from 'react-icons/fa';
import axios from 'axios';
import './Accueil.css';

function Accueil({ language = 'fr' }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/orders', { params: { limit: 10000 } }).then((res) => setOrders(res.data.data));
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.status === 'pending').length;
  const completed = orders.filter((o) => o.status === 'completed').length;

  const locale = language === 'fr' ? 'fr-FR' : 'en-US';

  const texts = {
    fr: {
      title: 'Aperçu du tableau de bord',
      totalOrders: 'Total des commandes',
      pendingOrders: 'Commandes en attente',
      completedOrders: 'Commandes terminées',
      totalSales: 'Chiffre d\'affaires total',
      dailySales: 'Ventes quotidiennes (Derniers 12 jours)',
      totalSalesLine: 'Ventes totales',
      orderCountLine: 'Nombre de commandes',
      dailyPending: 'Commandes en attente quotidiennes (Derniers 12 jours)',
      pendingOrdersLine: 'Commandes en attente',
      recentOrders: 'Commandes récentes',
      orderId: 'ID de commande',
      date: 'Date',
      status: 'Statut',
      total: 'Total',
      pendingBadge: 'En attente',
      completedBadge: 'Terminée'
    },
    en: {
      title: 'Dashboard Overview',
      totalOrders: 'Total Orders',
      pendingOrders: 'Pending Orders',
      completedOrders: 'Completed Orders',
      totalSales: 'Total Sales',
      dailySales: 'Daily Sales (Last 12 Days)',
      totalSalesLine: 'Total Sales',
      orderCountLine: 'Order Count',
      dailyPending: 'Daily Pending Orders (Last 12 Days)',
      pendingOrdersLine: 'Pending Orders',
      recentOrders: 'Recent Orders',
      orderId: 'Order ID',
      date: 'Date',
      status: 'Status',
      total: 'Total',
      pendingBadge: 'pending',
      completedBadge: 'completed'
    }
  };

  const currentTexts = texts[language];

  const statusBadge = (status) => {
    const bg = status === 'pending' ? 'warning' : 'success';
    const label = status === 'pending' ? currentTexts.pendingBadge : currentTexts.completedBadge;
    return <Badge bg={bg}>{label}</Badge>;
  };

  const dailySalesData = useMemo(() => {
    if (!orders.length) return [];
    const now = new Date();
    const data = [];
    for (let i = 11; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      const dayOrders = orders.filter((o) => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= day && orderDate < nextDay;
      });
      const total = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const count = dayOrders.length;
      const label = day.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
      data.push({ day: label, total, count });
    }
    return data;
  }, [orders, locale]);

  const dailyPendingData = useMemo(() => {
    if (!orders.length) return [];
    const now = new Date();
    const data = [];
    for (let i = 11; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      const dayOrders = orders.filter((o) => {
        const orderDate = new Date(o.createdAt);
        return o.status === 'pending' && orderDate >= day && orderDate < nextDay;
      });
      const count = dayOrders.length;
      const label = day.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
      data.push({ day: label, count });
    }
    return data;
  }, [orders, locale]);

  const recentOrders = useMemo(() => {
    return orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }, [orders]);

  return (
    <div>
      <h2 className="dashboard-title">{currentTexts.title}</h2>
      <Row className="mb-4 dashboard-cards">
        <Col xs={12} md={3} className="mb-3 dashboard-card">
          <Card className="stat-card total-orders">
            <Card.Body>
              <Card.Title>
                <FaShoppingCart className="me-2 stat-icon" /> {currentTexts.totalOrders}
              </Card.Title>
              <Card.Text className="stat-value">{totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3} className="mb-3 dashboard-card">
          <Card className="stat-card pending-orders">
            <Card.Body>
              <Card.Title>
                <FaHourglassHalf className="me-2 stat-icon" /> {currentTexts.pendingOrders}
              </Card.Title>
              <Card.Text className="stat-value">{pending}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3} className="mb-3 dashboard-card">
          <Card className="stat-card completed-orders">
            <Card.Body>
              <Card.Title>
                <FaCheckCircle className="me-2 stat-icon" /> {currentTexts.completedOrders}
              </Card.Title>
              <Card.Text className="stat-value">{completed}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3} className="mb-3 dashboard-card">
          <Card className="stat-card total-sales">
            <Card.Body>
              <Card.Title>
                <FaDollarSign className="me-2 stat-icon" /> {currentTexts.totalSales}
              </Card.Title>
              <Card.Text className="stat-value">${totalSales.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h3 className="chart-title">{currentTexts.dailySales}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px' }} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line type="monotone" dataKey="total" stroke="#007bff" strokeWidth={2} name={currentTexts.totalSalesLine} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="count" stroke="#28a745" strokeWidth={2} name={currentTexts.orderCountLine} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <h3 className="chart-title">{currentTexts.dailyPending}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailyPendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px' }} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line type="monotone" dataKey="count" stroke="#ffc107" strokeWidth={2} name={currentTexts.pendingOrdersLine} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <h3 className="chart-title">{currentTexts.recentOrders}</h3>
      <div className="chart-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>{currentTexts.orderId}</th>
              <th>{currentTexts.date}</th>
              <th>{currentTexts.status}</th>
              <th>{currentTexts.total}</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(o.createdAt).toLocaleDateString(locale)}</td>
                <td>{statusBadge(o.status)}</td>
                <td>${(o.total || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Accueil;
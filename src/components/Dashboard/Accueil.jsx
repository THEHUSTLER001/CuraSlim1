// Updated src/components/Accueil.js to import CSS
import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './Accueil.css';

function Accueil() {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/stats').then((res) => setStats(res.data));
    axios.get('/api/admin/orders', { params: { limit: 10000 } }).then((res) => setOrders(res.data.data));
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.status === 'pending').length;
  const completed = orders.filter((o) => o.status === 'completed').length;

  return (
    <div>
      <h2>Dashboard</h2>
      <Row className="mb-4 dashboard-cards">
        <Col xs={12} md={3} className="mb-3 dashboard-card">
          <Card>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>{totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3} className="mb-3 dashboard-card">
          <Card>
            <Card.Body>
              <Card.Title>Pending Orders</Card.Title>
              <Card.Text>{pending}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3} className="mb-3 dashboard-card">
          <Card>
            <Card.Body>
              <Card.Title>Completed Orders</Card.Title>
              <Card.Text>{completed}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3} className="mb-3 dashboard-card">
          <Card>
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text>${totalSales}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h3>Monthly Sales (Last 12 Months)</h3>
      <div className="chart-container">
        <ResponsiveContainer>
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Sales" />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" name="Order Count" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Accueil;
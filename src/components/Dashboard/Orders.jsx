// Updated src/components/Orders.js to import CSS
import { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders('');
  }, []);

  const fetchOrders = (q) => {
    axios
      .get('/api/admin/orders', { params: { q, limit: 10000, status: 'pending' } })
      .then((res) => setOrders(res.data.data));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchOrders(value);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sort === 'asc') return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  const toggleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };

  const removeOrder = (id) => {
    if (window.confirm('Move to history?')) {
      axios.put(`/api/admin/orders/${id}`, { status: 'completed' }).then(() => fetchOrders(search));
    }
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Orders</h2>
      <Form.Group className="mb-3 search-form">
        <Form.Control type="text" placeholder="Search by name, phone, or note" value={search} onChange={handleSearch} />
      </Form.Group>
      <Button variant="secondary" onClick={toggleSort} className="mb-3">
        Sort by Name ({sort.toUpperCase()})
      </Button>
      <div className="orders-table">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.phone}</td>
                <td>{o.quantity}</td>
                <td>${o.total}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td className="action-buttons">
                  <Button variant="info" size="sm" onClick={() => viewOrder(o)}>
                    Show
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => removeOrder(o.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p><strong>ID:</strong> {selectedOrder.id}</p>
              <p><strong>Name:</strong> {selectedOrder.name}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Note:</strong> {selectedOrder.note || 'N/A'}</p>
              <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Total:</strong> ${selectedOrder.total}</p>
              <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Orders;
// Updated src/components/Orders.js with French translations and language prop support
import { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Pagination } from 'react-bootstrap';
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaEye, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import './Orders.css';

function Orders({ language = 'fr' }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const pageSize = 10;

  const locale = language === 'fr' ? 'fr-FR' : 'en-US';

  const texts = {
    fr: {
      title: 'Commandes en attente',
      placeholder: 'Rechercher par nom, téléphone ou note',
      sortBtn: (s) => `Trier par nom (${s.toUpperCase()})`,
      name: 'Nom',
      phone: 'Téléphone',
      quantity: 'Quantité',
      total: 'Total',
      createdAt: 'Créé le',
      actions: 'Actions',
      view: 'Voir',
      complete: 'Compléter',
      confirm: 'Marquer comme terminé et déplacer vers l\'historique ?',
      modalTitle: 'Détails de la commande',
      id: 'ID :',
      nameLabel: 'Nom :',
      phoneLabel: 'Téléphone :',
      address: 'Adresse :',
      note: 'Note :',
      quantityLabel: 'Quantité :',
      totalLabel: 'Total :',
      createdAtLabel: 'Créé le :',
      status: 'Statut :',
      na: 'N/A',
      showing: (start, end, total) => `Affichage de ${start} à ${end} sur ${total} commandes`
    },
    en: {
      title: 'Pending Orders',
      placeholder: 'Search by name, phone, or note',
      sortBtn: (s) => `Sort by Name (${s.toUpperCase()})`,
      name: 'Name',
      phone: 'Phone',
      quantity: 'Quantity',
      total: 'Total',
      createdAt: 'Created At',
      actions: 'Actions',
      view: 'View',
      complete: 'Complete',
      confirm: 'Mark as completed and move to history?',
      modalTitle: 'Order Details',
      id: 'ID:',
      nameLabel: 'Name:',
      phoneLabel: 'Phone:',
      address: 'Address:',
      note: 'Note:',
      quantityLabel: 'Quantity:',
      totalLabel: 'Total:',
      createdAtLabel: 'Created At:',
      status: 'Status:',
      na: 'N/A',
      showing: (start, end, total) => `Showing ${start} to ${end} of ${total} orders`
    }
  };

  const currentTexts = texts[language];

  useEffect(() => {
    fetchOrders('', 1, 'asc');
  }, []);

  const fetchOrders = (q, page, sortOrder) => {
    axios
      .get('/api/admin/orders', { 
        params: { 
          q, 
          page, 
          limit: pageSize, 
          status: 'pending',
          sort: sortOrder === 'asc' ? 'name' : '-name'
        } 
      })
      .then((res) => {
        setOrders(res.data.data);
        setTotalItems(res.data.total || 0);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);
    fetchOrders(value, 1, sort);
  };

  const toggleSort = () => {
    const newSort = sort === 'asc' ? 'desc' : 'asc';
    setSort(newSort);
    fetchOrders(search, currentPage, newSort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchOrders(search, page, sort);
  };

  const completeOrder = (id) => {
    if (window.confirm(currentTexts.confirm)) {
      axios.put(`/api/admin/orders/${id}`, { status: 'completed' }).then(() => fetchOrders(search, currentPage, sort));
    }
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div>
      <h2 className="section-title">{currentTexts.title}</h2>
      <Form.Group className="mb-3 search-form">
        <div className="input-group">
          <span className="input-group-text"><FaSearch /></span>
          <Form.Control 
            type="text" 
            placeholder={currentTexts.placeholder} 
            value={search} 
            onChange={handleSearch} 
          />
        </div>
      </Form.Group>
      <Button 
        variant="secondary" 
        onClick={toggleSort} 
        className="mb-3 sort-btn"
      >
        {sort === 'asc' ? <FaSortAlphaDown className="me-1" /> : <FaSortAlphaUp className="me-1" />}
        {currentTexts.sortBtn(sort)}
      </Button>
      <div className="orders-table">
        <Table striped bordered hover responsive className="professional-table">
          <thead>
            <tr>
              <th>{currentTexts.name}</th>
              <th>{currentTexts.phone}</th>
              <th>{currentTexts.quantity}</th>
              <th>{currentTexts.total}</th>
              <th>{currentTexts.createdAt}</th>
              <th>{currentTexts.actions}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.phone}</td>
                <td>{o.quantity}</td>
                <td>${o.total.toFixed(2)}</td>
                <td>{new Date(o.createdAt).toLocaleString(locale)}</td>
                <td className="action-buttons">
                  <Button variant="info" size="sm" onClick={() => viewOrder(o)} className="me-2">
                    <FaEye className="me-1" /> {currentTexts.view}
                  </Button>
                  <Button variant="success" size="sm" onClick={() => completeOrder(o.id)}>
                    <FaCheck className="me-1" /> {currentTexts.complete}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>{currentTexts.showing(startItem, endItem, totalItems)}</div>
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
              disabled={currentPage === 1}
            />
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === currentPage}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              onClick={() => {
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentTexts.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="order-details">
              <p><strong>{currentTexts.id}</strong> {selectedOrder.id}</p>
              <p><strong>{currentTexts.nameLabel}</strong> {selectedOrder.name}</p>
              <p><strong>{currentTexts.phoneLabel}</strong> {selectedOrder.phone}</p>
              <p><strong>{currentTexts.address}</strong> {selectedOrder.address}</p>
              <p><strong>{currentTexts.note}</strong> {selectedOrder.note || currentTexts.na}</p>
              <p><strong>{currentTexts.quantityLabel}</strong> {selectedOrder.quantity}</p>
              <p><strong>{currentTexts.totalLabel}</strong> ${selectedOrder.total.toFixed(2)}</p>
              <p><strong>{currentTexts.createdAtLabel}</strong> {new Date(selectedOrder.createdAt).toLocaleString(locale)}</p>
              <p><strong>{currentTexts.status}</strong> {selectedOrder.status}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Orders;
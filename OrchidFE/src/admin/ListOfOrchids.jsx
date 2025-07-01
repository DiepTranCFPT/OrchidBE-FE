import React, { useEffect, useState } from 'react'
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  FormGroup, 
  Image, 
  Modal, 
  Badge,
  Alert,
  Spinner
} from 'react-bootstrap'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa'
export default function ListOfOrchids() {
    const baseUrl = import.meta.env.VITE_API_URL
    const [api, setAPI] = useState([])
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(baseUrl); 
          const sortedData = response.data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          setAPI(sortedData);
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Failed to load orchids');
        } finally {
          setLoading(false);
        }
      };
      const handleDelete = async (id) => {
        try {
           
          const response = await axios.delete(`${baseUrl}/${id}`);
          fetchData();
          toast.success("Orchid deleted successfully!");
        } catch (error) {
          console.log(error.message);
          toast.error("Orchid deleted failed!");
        }
      };

      const onSubmit = async (data) => {
        try {
          const response = await axios.post(baseUrl, data, { 
            headers: { 'Content-Type': 'application/json' }
          });
          setShow(false);
          fetchData();
          reset();
          toast.success("Orchid added successfully!");
        } catch (error) {
          console.log(error.message);
          toast.error("Orchid added fail!");
        }
      };

      // Filter and search functions
      const filteredOrchids = api.filter(orchid => {
        const matchesSearch = orchid.orchidName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || 
          (filterType === 'natural' && orchid.isNatural) || 
          (filterType === 'industry' && !orchid.isNatural);
        return matchesSearch && matchesFilter;
      });
  return (
    <Container fluid className="admin-dashboard">
      <Toaster/>
      
      {/* Header Section */}
      <div className="admin-header mb-4">
        <Row className="align-items-center">
          <Col>
            <h1 className="admin-title">
              <span className="gradient-text">Orchid</span> Management
            </h1>
            <p className="admin-subtitle">Quản lý danh sách hoa lan</p>
          </Col>
          <Col xs="auto">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleShow}
              className="add-button"
            >
              <FaPlus className="me-2" />
              Thêm Lan Mới
            </Button>
          </Col>
        </Row>
      </div>

      {/* Search and Filter Section */}
      <Card className="search-filter-card mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="search-box">
                <FaSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên lan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">Tất cả</option>
                <option value="natural">Tự nhiên</option>
                <option value="industry">Công nghiệp</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <div className="stats-info">
                <span className="stats-text">
                  Tổng cộng: <strong>{filteredOrchids.length}</strong> lan
                </span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Orchid Grid */}
      {!loading && (
        <Row>
          {filteredOrchids.length === 0 ? (
            <Col>
              <Alert variant="info" className="text-center">
                <Alert.Heading>Không tìm thấy lan nào</Alert.Heading>
                <p>
                  {searchTerm || filterType !== 'all' 
                    ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                    : 'Chưa có lan nào trong hệ thống'
                  }
                </p>
              </Alert>
            </Col>
          ) : (
            filteredOrchids.map((orchid) => (
              <Col lg={4} md={6} key={orchid.id} className="mb-4">
                <Card className="orchid-card h-100">
                  <div className="card-image-container">
                    <Card.Img 
                      variant="top" 
                      src={orchid.image} 
                      className="orchid-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                    <Badge 
                      bg={orchid.isNatural ? 'success' : 'warning'}
                      className="type-badge"
                    >
                      {orchid.isNatural ? 'Tự nhiên' : 'Công nghiệp'}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="orchid-title">{orchid.orchidName}</Card.Title>
                    <div className="mt-auto">
                      <div className="action-buttons">
                        <Link to={`/edit/${orchid.id}`}>
                          <Button variant="outline-primary" size="sm" className="action-btn">
                            <FaEdit className="me-1" />
                            Sửa
                          </Button>
                        </Link>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          className="action-btn"
                          onClick={() => {
                            if(confirm("Bạn có chắc chắn muốn xóa lan này?")) {
                              handleDelete(orchid.id);
                            }
                          }}
                        >
                          <FaTrash className="me-1" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>
            <FaPlus className="me-2" />
            Thêm Lan Mới
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Tên Lan *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên lan..."
                    autoFocus
                    {...register("orchidName", { required: true })}
                    className={errors.orchidName ? "is-invalid" : ""}
                  />
                  {errors.orchidName && (
                    <div className="invalid-feedback">Tên lan là bắt buộc</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Loại Lan</Form.Label>
                  <FormGroup>
                    <Form.Check
                      type="switch"
                      id="natural-switch"
                      label="Lan tự nhiên"
                      {...register("isNatural")}
                    />
                  </FormGroup>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">URL Hình Ảnh *</Form.Label>
              <Form.Control 
                type="url" 
                placeholder="https://example.com/image.jpg"
                {...register("image", { 
                  required: true, 
                  pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi 
                })}
                className={errors.image ? "is-invalid" : ""}
              />
              {errors.image && (
                <div className="invalid-feedback">
                  {errors.image.type === "required" ? "URL hình ảnh là bắt buộc" : "URL không hợp lệ"}
                </div>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                Thêm Lan
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .admin-dashboard {
          padding: 2rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .admin-header {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .admin-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .gradient-text {
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .admin-subtitle {
          color: #666;
          font-size: 1.1rem;
          margin: 0;
        }

        .add-button {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .search-filter-card {
          background: white;
          border: none;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .search-box {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          z-index: 10;
        }

        .search-input {
          padding-left: 40px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }

        .filter-select {
          border-radius: 10px;
          border: 1px solid #ddd;
        }

        .stats-info {
          text-align: right;
        }

        .stats-text {
          color: #666;
          font-size: 0.9rem;
        }

        .loading-container {
          text-align: center;
          padding: 3rem;
          color: #666;
        }

        .orchid-card {
          transition: all 0.3s ease;
          border: none;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .orchid-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .card-image-container {
          position: relative;
        }

        .orchid-image {
          height: 200px;
          object-fit: cover;
        }

        .type-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 0.8rem;
        }

        .orchid-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          flex: 1;
          border-radius: 8px;
          font-size: 0.8rem;
        }

        .modal-header {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
        }

        .form-label {
          font-weight: 600;
          color: #333;
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 1rem;
          }

          .admin-title {
            font-size: 2rem;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </Container>
  )
}

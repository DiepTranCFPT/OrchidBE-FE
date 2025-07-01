import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeScreen from './components/HomeScreen';
import Cart from './components/Cart';
import ListOfOrchids from './admin/ListOfOrchids';
import EditOrchid from './admin/EditOrchid';
import ListOfEmployees from './admin/ListOfEmployees';
import DetailOrchid from './components/DetailOrchid';
import LoginPage from './authen/LoginPage';
import RegisterPage from './authen/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your custom CSS
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Public routes */}
        <Route path="/" element={
          <Layout>
            <HomeScreen />
          </Layout>
        } />
        <Route path="/home" element={
          <Layout>
            <HomeScreen />
          </Layout>
        } />
        <Route path="/detail/:id" element={
          <Layout>
            <DetailOrchid />
          </Layout>
        } />
        
        {/* Protected routes - Customer */}
        <Route path="/cart" element={
          <ProtectedRoute>
            <Layout>
              <Cart />
            </Layout>
          </ProtectedRoute>
        } />

      
        {/* Protected routes - Admin */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="ADMIN">
            <Layout>
              <ListOfOrchids />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/orchids" element={
          <ProtectedRoute requiredRole="ADMIN">
            <Layout>
              <ListOfEmployees />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute requiredRole="ADMIN">
            <Layout>
              <EditOrchid />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
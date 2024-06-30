import { useContext } from 'react';
import { AuthContext } from './context/AuthProvider';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import ProtectedAllPets from './protected/ProtectedAllPets';
import ProtectedOnePet from './protected/ProtectedOnePet';
import ProtectedNewPet from './protected/ProtectedNewPet';
import ProtectedEditPet from './protected/ProtectedEditPet';
import RegisterForm from './components/RegisterForm';
import UserBar from './components/UserBar';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      {isAuthenticated && <UserBar />}
      <main className="container py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/pets" element={<ProtectedAllPets />} />
          <Route path="/pets/:id" element={<ProtectedOnePet />} />
          <Route path="/pets/new" element={<ProtectedNewPet />} />
          <Route path="/pets/:id/edit" element={<ProtectedEditPet />} />
        </Routes>
      </main>
    </>
  );
}
export default App;

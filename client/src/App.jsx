import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import AllPets from './components/AllPets';
import OnePet from './components/OnePet';
import NewPet from './components/NewPet';
import EditPet from './components/EditPet';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <>
      <Navbar />
      <main className="container py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/pets" element={<AllPets />} />
          <Route path="/pets/:id" element={<OnePet />} />
          <Route path="/pets/new" element={<NewPet />} />
          <Route path="/pets/:id/edit" element={<EditPet />} />
        </Routes>
      </main>
    </>
  );
}
export default App;

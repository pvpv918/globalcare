import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Compare from './pages/Compare';
import HospitalDetail from './pages/HospitalDetail';
import Booking from './pages/Booking';
import Records from './pages/Vault';
import Aftercare from './pages/Aftercare';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="search/compare" element={<Compare />} />
        <Route path="hospital/:id" element={<HospitalDetail />} />
        <Route path="booking/:hospitalId" element={<Booking />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="records" element={<Records />} />
        <Route path="vault" element={<Navigate to="/records" replace />} />
        <Route path="aftercare" element={<Aftercare />} />
      </Route>
    </Routes>
  );
}

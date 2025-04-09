import './App.css'

import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import MainRoute from './components/Router/MainRoute';
import Footer from './components/layout/Footer';



function App() {

  return (
    <div className="min-h-screen bg-[#ebebeb]">
      <Navbar/>
      <MainRoute/>
      <Footer/>
    </div>
  );

}

export default App

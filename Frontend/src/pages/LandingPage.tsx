import {GridSmallBackgroundDemo} from '../components/ui/GridSmallBackgroundDemo'
import bg from '../assets/bg.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!(localStorage.getItem('token') === "" || !localStorage.getItem("token"))){
      navigate('/home');
    }
  },[])
  return (
    <div className="h-full overflow-hidden font-inter">
      <img src={bg} alt="" className="absolute"/>
      <GridSmallBackgroundDemo />
    </div>
  )
}

export default LandingPage

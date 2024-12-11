import { useNavigate } from "react-router-dom"
import Button from "../components/Button";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-3 pt-4">
      Landing Pages
      <span onClick={()=>{navigate('/login')}}><Button text='login'/></span>
      <span onClick={()=>{navigate('login/signup')}}><Button text="signup" type="secondary"/>
      </span>
    </div>
  )
}

export default LandingPage

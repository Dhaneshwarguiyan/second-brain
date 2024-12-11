import { Outlet } from "react-router-dom"

const LoginLayout = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <Outlet />
    </div>
  )
}

export default LoginLayout

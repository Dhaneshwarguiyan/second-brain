import Button from "./Button"

const Footer = () => {
  return (
    <div className="w-screen h-[50vh] bg-black-900 z-20 flex flex-col justify-center items-center">
        <textarea name="feedback" id="" className=""/>
        <Button text="submit" type="secondary" size="lg"/>
    </div>
  )
}

export default Footer

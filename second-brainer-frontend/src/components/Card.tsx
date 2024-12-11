import Url from "../icons/Url"
import Options from "../icons/Options"

const Card = () => {

  return (
    <div className="bg-black-700 w-fit p-4 font-inter">
      <div className="flex justify-between items-center mb-2">
        <div className="text-black-300 font-semibold text-2xl font-inter">
        This is heading given
        </div>
        <div className="text-black-500 text-3xl flex gap-5">
        <span className="cursor-pointer"><Url /></span>
        <span className="cursor-pointer"><Options /></span>
        </div>
      </div>
      <img src="https://i.pinimg.com/736x/4c/dc/8d/4cdc8d94f33f8185717fd53fe4b9f33a.jpg" alt="" className="w-[400px] rounded-xl"/>
      <div>
        <div className="text-black-300 text-2xl font-semibold mt-2">
            This is Heading
        </div>
        <div className="text-black-300 font-extralight">
            This is desription........
        </div>
      </div>
    </div>
  )
}

export default Card

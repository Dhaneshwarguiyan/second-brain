import axios from "axios";
import Options from "../icons/Options";
import Url from "../icons/Url";
import { useQuery } from "@tanstack/react-query";

const ContentCard = ({
  link,
  title,
  description,
}: {
  link: string;
  title: string;
  description: string;
}) => {
  const fetchMetaData = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/content/metadata",
      {
        url: "https://www.youtube.com/watch?v=38fhj9tFfAQ",
      },
    );
    console.log(response.data);
    return response.data
  };

  const {data,isLoading} = useQuery({
    queryKey:['metaData'],
    queryFn:fetchMetaData
  })
  if(isLoading){
    return <div className="w-full h-full flex items-center justify-center"><div>Loading....</div></div>
  }
  return (
    <div className="font-inter p-4 border border-black-700 w-[350px] rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg">{title}</div>
          <div className="text-sm font-light text-black-500">{description}</div>
        </div>
        <div className="flex gap-3">
          <span className="cursor-pointer">
            <Options />
          </span>
          <span className="cursor-pointer">
            <a href={`//${link}`} target="_blank"><Url /></a>
          </span>
        </div>
      </div>
      <img
        src={data.ogImage[0]?.url}
        alt=""
        className="rounded-sm my-4"
      />
      <div>
        <div className="text-lg text-wrap">
          {data.ogTitle}
        </div>
        {/* <div className="text-sm font-light text-black-500">
          This will be the content Description
        </div> */}
      </div>
    </div>
  );
};

export default ContentCard;

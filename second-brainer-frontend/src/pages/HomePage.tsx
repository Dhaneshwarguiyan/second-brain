import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ContentCard from "../components/ContentCard";

interface Content {
  description:string,
  link:string,
  title:string,
  //types and tags not yet implemented
  type?:string
  tag:string[],
}

const HomePage = () => {
  const token = localStorage.getItem("token");
  const fetchContent = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/content`, {
      headers: {
        Authorization: token as string,
      },
    });
    return response.data.contents;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: fetchContent,
  });
  if (isLoading) return <p>Loading.......</p>;
  return <div className="w-full h-full p-4">
    <div className="flex gap-4 flex-wrap">
    {
      data.map((item:Content,i:string)=>{
        return <ContentCard link={item.link} title={item.title} description={item.description} key={i}/>
      })
    }
  </div>
  </div>;
};

export default HomePage;

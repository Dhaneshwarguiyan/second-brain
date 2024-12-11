import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "../utils/fetchData";
import ContentCard from "../components/ContentCard";
import Loader from "../components/Loader";

interface Content {
  _id: string;
  description: string;
  link: string;
  title: string;
  //types and tags not yet implemented
  type?: string;
  tag?: string[];
}

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: fetchContent,
  });
  if (isLoading) return <Loader />;
  return (
    <div className="w-full h-full overflow-scroll p-8 mb-10">
      <div className="flex gap-4 flex-wrap mb-10">
        {data.map((item: Content, i: string) => {
          return (
            <ContentCard
              share={false}
              id={item._id}
              link={item.link}
              title={item.title}
              description={item.description}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;

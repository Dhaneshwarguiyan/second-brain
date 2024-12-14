import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "../utils/fetchData";
import ContentCard from "../components/ContentCard";
import Loader from "../components/Loader";

interface Content {
  _id: string;
  description: string;
  link: string;
  title: string;
  linkTitle: string;
  image: string;
  //types and tags not yet implemented
  type?: string;
  tags: string[];
}

const HomePage = ({activeTab}:{activeTab:string}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: fetchContent,
  });
  if (isLoading) return <Loader />;
  return (
    <div className="w-full h-full overflow-scroll lg:p-8 p-2 mb-10 scrollbar">
      <div className="flex gap-4 flex-wrap mb-10">
        {data && 
          data.map((item: Content, i: string) => {
            if(activeTab === "All"){
              return (
                <ContentCard
                linkTitle={item.linkTitle}
                image={item.image}
                share={false}
                id={item._id}
                link={item.link}
                title={item.title}
                description={item.description}
                key={i}
                tags={item.tags}
                />
              );
            }else{
              if(item.tags.includes(activeTab)){
                return (
                  <ContentCard
                  linkTitle={item.linkTitle}
                  image={item.image}
                  share={false}
                  id={item._id}
                  link={item.link}
                  title={item.title}
                  description={item.description}
                  key={i}
                  tags={item.tags}
                  />
                );
              }
            }
          })}
      </div>
    </div>
  );
};

export default HomePage;

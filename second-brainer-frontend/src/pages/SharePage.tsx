import { getSharableContent } from "../utils/fetchData";
import ContentCard from "../components/ContentCard";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Content {
  _id: string;
  description: string;
  link: string;
  title: string;
  //types and tags not yet implemented
  type?: string;
  tag?: string[];
}

const SharePage = () => {
  const params = useParams();
  const link = params.link as string;
  const [data, setData] = useState<Content[] | null>(null);
  const [isShareable, setShareable] = useState(true);
  //add users data also
  useEffect(() => {
    getSharableContent(link).then((response) => {
      if (response.user) {
        setData(response.content);
        setShareable(true);
      } else {
        setShareable(false);
      }
    });
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll p-8 mb-10">
      {isShareable ? (
        <div className="flex gap-4 flex-wrap mb-10">
          {data ? (
            data.map((item: Content) => {
              return (
                <ContentCard
                  share={true}
                  id={item._id}
                  link={item.link}
                  title={item.title}
                  description={item.description}
                  key={item._id}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <div className="text-black-300 text-4xl flex justify-center items-center"><span>Link is no more shareable</span></div>
      )}
    </div>
  );
};

export default SharePage;

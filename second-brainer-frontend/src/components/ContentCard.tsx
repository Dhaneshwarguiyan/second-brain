import { fetchMetaData } from "../utils/fetchData";
import { deleteContent } from "../utils/fetchData";
import Options from "../icons/Options";
import Url from "../icons/Url";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useState } from "react";
import { setForm } from "../slices/formData";
import { toggleDialog } from "../slices/dialogTriggers";
import { useDispatch } from "react-redux";
import { setId } from "../slices/contentId";
import Loader from "./Loader";

const ContentCard = ({
  share,
  id,
  link,
  title,
  description,
}: {
  share:boolean,
  id:string,
  link: string;
  title: string;
  description: string;
}) => {
  const [edit,setEdit] = useState(false);
  const dispatch = useDispatch();
  const arr = link.split("/");
  const tweetid = arr[arr.length - 1];

  const clickHandler = ()=>{
    setEdit(!edit);
    //turning on the dialog done
    dispatch(toggleDialog());
    dispatch(setForm({title,description,link}))
    dispatch(setId({id}));
  }


  const { data, isLoading } = useQuery({
    queryKey: ["metaData", link],
    queryFn: ()=>fetchMetaData(link),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn:deleteContent,
    onSuccess:()=>{
      queryClient.invalidateQueries();
    }
  });
  if (isLoading) {
    return (
      <Loader />
    );
  }
  return (
    <div className="font-inter p-4 border border-black-700 w-[383px] rounded-lg text-black-300">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg text-black-300">{title}</div>
          <div className="text-sm font-light text-black-500">{description}</div>
        </div>
        <div className="flex gap-3">
            {!share && <span className="cursor-pointer">
             <span onClick={()=>setEdit(!edit)}><Options /></span>
            {edit && (
              <div className="border border-black-700 p-2 mt-2 absolute bg-black-900 rounded-lg flex flex-col">
                <span className="border-b border-black-700 cursor-pointer" onClick={clickHandler}>
                  Edit
                </span>
                <span className="cursor-pointer" onClick={()=>{setEdit(!edit);mutation.mutate(id)}}>delete</span>
              </div>
            )}
          </span>}
          <span className="cursor-pointer">
            <a href={`${link}`} target="_blank">
              <Url />
            </a>
          </span>
        </div>
      </div>
      {!link.includes("x.com") ? (
        <img
          src={data.ogImage[0]?.url}
          alt="Img"
          className="rounded-sm my-4 h-[250px] object-cover"
        />
      ) : (
        <TwitterTweetEmbed tweetId={tweetid} />
      )}
      <div>
        {!link.includes("x.com") && (
          <div className="text-lg text-wrap">
            {data?.ogTitle?.length > 70
              ? `${data?.ogTitle.substr(0, 70)}....`
              : data.ogTitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;

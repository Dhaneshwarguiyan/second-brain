import { deleteContent } from "../utils/fetchData";
import Options from "../icons/Options";
import Url from "../icons/Url";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useEffect, useRef, useState } from "react";
import { setForm } from "../slices/formData";
import { toggleDialog } from "../slices/dialogTriggers";
import { useDispatch } from "react-redux";
import { setId } from "../slices/contentId";
import Tags from "./Tags";

const ContentCard = ({
  linkTitle,
  image,
  share,
  id,
  link,
  title,
  description,
  tags
}: {
  linkTitle:string,
  image:string,
  share:boolean,
  id:string,
  link: string;
  title: string;
  description: string;
  tags:string[];
}) => {
  const editOptionRef = useRef<HTMLDivElement>(null);
  const [edit,setEdit] = useState<boolean>(false);
  const dispatch = useDispatch();
  const arr = link.split("/");
  const tweetid = arr[arr.length - 1];

  //UseEffects
  useEffect(()=>{
    window.addEventListener('mousedown',closeEditOptionHandler);
    return ()=>{
      window.removeEventListener('mousedown',closeEditOptionHandler);
    }
  },[edit])

  //Handlers
  const clickHandler = ()=>{
    //toggling the edit options
    setEdit(!edit);
    //turning on the dialog box
    dispatch(toggleDialog());
    dispatch(setForm({title,description,link,tags}))
    //I forgot why I did this
    //I did this So that I can globally access the Id of the content
    //and find and replace the content in backend
    dispatch(setId({id}));
  }

  const closeEditOptionHandler = (e:MouseEvent)=>{
    if(e.target instanceof Node && !editOptionRef.current?.contains(e.target)){
      setEdit(false);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:deleteContent,
    onSuccess:()=>{
      queryClient.invalidateQueries();
    }
  });
  return (
    <div className="font-inter p-4 border border-black-700 w-[383px] rounded-lg text-black-300">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg text-black-300">{title}</div>
          <div className="text-sm font-light text-black-500">{description}</div>
        </div>
        <div className="flex gap-3 relative" ref={editOptionRef}>
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
      {link && !link.includes("x.com") ? (
        <img
          src={image}
          alt="Img"
          className="rounded-sm my-4 h-[210px] w-[350px] object-cover"
        />
      ) : (
        <TwitterTweetEmbed tweetId={tweetid} />
      )}
      <div>
        {!link.includes("x.com") && (
          <div className="text-lg text-wrap">
            {linkTitle && linkTitle.length > 70
              ? `${linkTitle.substr(0, 70)}....`
              : linkTitle}
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        {
          tags.map(tag=>{
            return <Tags text={tag} key={tag}/>
          })
        }
      </div>
    </div>
  );
};

export default ContentCard;

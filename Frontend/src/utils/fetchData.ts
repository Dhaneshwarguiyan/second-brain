import axios from "axios";
import toast from "react-hot-toast";

interface formDataType {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const token = localStorage.getItem("token");
export const fetchContent = async () => {
  const response = await axios.get(`http://localhost:8000/api/v1/content`, {
    headers: {
      Authorization: token as string,
    },
  });
  return response.data.contents;
};

//adding content
export const addData = async (formData: formDataType) => {
  toast.loading('Adding content')
  const {ogImage,ogTitle} = await fetchMetaData(formData.link);
  console.log(ogImage,ogTitle);
  toast.dismiss();

  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/content",
      {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        tags:formData.tags,
        image:ogImage[0]?.url,
        linkTitle:ogTitle
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    toast.success('Successfully added');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Editing the content

export const editContent = async ({
  id,
  formData,
}: {
  id: string;
  formData: formDataType;
}) => {
  toast.loading("Editing Content..")
  const {ogImage,ogTitle} = await fetchMetaData(formData.link);
  toast.dismiss();
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/content/update/${id}`,
      {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        tags:formData.tags,
        image:ogImage[0].url,
        linkTitle:ogTitle
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    toast.success("Successfully edited")
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


//deleting the content
export const deleteContent = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/content/delete/${id}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    toast.success('successfully deleted');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


//for fetching the meta data of the link
export const fetchMetaData = async (link: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/content/metadata",
      {
        url: link,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//fetch shareable link

export const shareLink = async (share:boolean) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/link/share`,{
        share:share
      },{
        headers:{
          Authorization:token
        }
      }
    )
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

//fetch all shareable content
export const getSharableContent = async (link:string)=>{
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/link/${link}`);
    return response.data;
  } catch {
    const response = {
      user:null,
      content:["No content available"]
    }
    return response;
  }
}


//Post Tags
export const addTags = async(tagText:string) => {
  try {
    await axios.post('http://localhost:8000/api/v1/tag',{
      text:tagText
    })
  } catch (error) {
    console.log(error);
  }
}
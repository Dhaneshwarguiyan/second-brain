import axios from "axios";

const token = localStorage.getItem("token");
export const fetchContent = async () => {
  const response = await axios.get(`http://localhost:8000/api/v1/content`, {
    headers: {
      Authorization: token as string,
    },
  });
  return response.data.contents;
};

//fetching content
export const addData = async (formData: Record<string, string>) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/content",
      {
        title: formData.title,
        description: formData.description,
        link: formData.link,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
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
  formData: Record<string, string>;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/content/update/${id}`,
      {
        title: formData.title,
        description: formData.description,
        link: formData.link,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
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
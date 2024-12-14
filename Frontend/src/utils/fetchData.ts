import axios from "axios";
import toast from "react-hot-toast";

interface formDataType {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

// const token = localStorage.getItem("token");

export const fetchContent = async (token: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API}/api/v1/content`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.contents;
};

//adding content
export const addData = async ({formData,token}: {formData:formDataType,token:string}) => {
  toast.loading("Adding content");
  const { ogImage, ogTitle } = await fetchMetaData(formData.link);
  console.log(ogImage, ogTitle);
  toast.dismiss();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/v1/content`,
      {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        tags: formData.tags,
        image: ogImage[0]?.url,
        linkTitle: ogTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    toast.success("Successfully added");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Editing the content

export const editContent = async ({
  id,
  formData,
  token
}: {
  id: string;
  formData: formDataType;
  token:string;
}) => {
  toast.loading("Editing Content..");
  const { ogImage, ogTitle } = await fetchMetaData(formData.link);
  toast.dismiss();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/v1/content/update/${id}`,
      {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        tags: formData.tags,
        image: ogImage[0].url,
        linkTitle: ogTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    toast.success("Successfully edited");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//deleting the content
export const deleteContent = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API}/api/v1/content/delete/${id}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    toast.success("successfully deleted");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//for fetching the meta data of the link
export const fetchMetaData = async (link: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/v1/content/metadata`,
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

export const shareLink = async (share: boolean,token:string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/v1/link/share`,
      {
        share: share,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//fetch all shareable content
export const getSharableContent = async (link: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/api/v1/link/${link}`,
    );
    return response.data;
  } catch {
    const response = {
      user: null,
      content: ["No content available"],
    };
    return response;
  }
};

//Post Tags
export const addTags = async (tagText: string) => {
  try {
    await axios.post(`${import.meta.env.VITE_API}/api/v1/tag`, {
      text: tagText,
    });
  } catch (error) {
    console.log(error);
  }
};

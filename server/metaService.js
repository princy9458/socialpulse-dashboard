import axios from "axios";

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || "v20.0";
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

const getMetaCredentials = () => {
  const { META_PAGE_ID, META_IG_USER_ID, META_ACCESS_TOKEN } = process.env;

  if (!META_PAGE_ID || !META_IG_USER_ID || !META_ACCESS_TOKEN) {
    throw new Error("Missing Meta Graph API credentials.");
  }

  return { META_PAGE_ID, META_IG_USER_ID, META_ACCESS_TOKEN };
};

const getErrorMessage = (error) => {
  if (error?.response?.data?.error?.message) return error.response.data.error.message;
  if (error?.response?.data?.error?.error_user_msg) return error.response.data.error.error_user_msg;
  if (error?.message) return error.message;
  return "Meta Graph API request failed.";
};

export const publishInstagramPhoto = async ({ caption, imageUrl }) => {
  try {
    const { META_IG_USER_ID, META_ACCESS_TOKEN } = getMetaCredentials();

    const mediaResponse = await axios.post(`${GRAPH_BASE}/${META_IG_USER_ID}/media`, {
      image_url: imageUrl,
      caption,
      access_token: META_ACCESS_TOKEN,
    });

    const creationId = mediaResponse?.data?.id;
    if (!creationId) {
      throw new Error("Instagram media creation failed.");
    }

    const publishResponse = await axios.post(
      `${GRAPH_BASE}/${META_IG_USER_ID}/media_publish`,
      {
        creation_id: creationId,
        access_token: META_ACCESS_TOKEN,
      }
    );

    return publishResponse.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const publishFacebookPost = async ({ message, imageUrl }) => {
  try {
    const { META_PAGE_ID, META_ACCESS_TOKEN } = getMetaCredentials();

    if (imageUrl) {
      const response = await axios.post(`${GRAPH_BASE}/${META_PAGE_ID}/photos`, {
        url: imageUrl,
        caption: message,
        published: true,
        access_token: META_ACCESS_TOKEN,
      });

      return response.data;
    }

    const response = await axios.post(`${GRAPH_BASE}/${META_PAGE_ID}/feed`, {
      message,
      access_token: META_ACCESS_TOKEN,
    });

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

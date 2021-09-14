import { createContext, useEffect, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import * as Enum from "../constant";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // state
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);

  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

  const [toast, setToast] = useState({
    type: "",
    show: false,
    message: null,
  });

  const getPosts = async () => {
    try {
      const response = await axios.get(`${Enum.API_URL}/post`);

      if (response.data.success) {
        dispatch({ type: Enum.GET_POST_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: Enum.GET_POST_FAIL });
    }
  };

  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${Enum.API_URL}/post`, newPost);

      if (response.data.success) {
        dispatch({ type: Enum.ADD_POST, payload: response.data.post });

        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { sucess: false, message: "server Error" };
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${Enum.API_URL}/post/${postId}`);
      if (response.data.success) {
        dispatch({ type: Enum.DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   find post click user update post
  const assignPostUpdate = (postId) => {
    const postUpdated = postState.posts.find((post) => post._id === postId);
    if (postUpdated) {
      dispatch({ type: Enum.ASSIGN_POST_UPDATE, payload: postUpdated });
    }
  };

  // update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${Enum.API_URL}/post/${updatedPost._id}`,
        updatedPost
      );
      console.log(response);
      if (response.data.success) {
        dispatch({ type: Enum.UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { sucess: false, message: "server Error" };
    }
  };

  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    toast,
    setToast,
    deletePost,
    updatePost,
    assignPostUpdate,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;

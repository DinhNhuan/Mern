import * as Enum from "../constant";
export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case Enum.GET_POST_SUCCESS:
      return { ...state, posts: payload, postsLoading: false };
    case Enum.GET_POST_FAIL:
      return { ...state, posts: [] };
    case Enum.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        postsLoading: false,
      };
    case Enum.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case Enum.ASSIGN_POST_UPDATE:
      return { ...state, post: payload };
    case Enum.UPDATE_POST:
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );

      return {
        ...state,
        posts: newPosts,
      };

    default:
      return state;
  }
};

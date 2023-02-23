import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  postList: [
    {
      id: "0x01",
      userProfileImg: "/images/user02.png",
      userNickname: "규니규니",
      userId: "ygh424",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      comments: [
        {
        id: "0x0101",
        commentUserProfileImg: "/images/user03.png",
        commentsUserNickname : "모니모니",
        commentsUserId : "ttsss556",
        comment: "라떼가 맛있습니다."
        }
      ],
      like: 100
    }
  ]
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      
    },
    increment: (state, action) => { 
      const targetPost = state.postList.find((post) => {
        return post.id === action.payload;       
      });
      targetPost.like++;
    },
    addComment: (state, { payload : { id, comment } }) => {
      const targetPost = state.postList.find((post) => {
        return post.id === id;       
      });
      targetPost.comments.push(comment);
    }
  }
});

export const { addPost, increment, addComment } = postSlice.actions;
export const selectPostList = state => state.post.postList;

export default postSlice.reducer;
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  review: [
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
  ],
  notice: [
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
  ],
  free: [
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
    increment: (state, {payload : { listName, id}}) => { 
      // const targetPost = state.review.find((post) => {
      //   return post.id === id;       
      // });
      // targetPost.like++;

      let targetPost;
      switch (listName) {
        case "review":
          targetPost = state.review.find((post) => {
            return post.id === id;          
          });          
          break;
        case "notice":
          targetPost = state.notice.find((post) => {
            return post.id === id;          
          });  
        
          break;
        case "free":
          targetPost = state.free.find((post) => {
            return post.id === id;          
          });          
          break;
      
        default:
          console.error("에러입니다.");
          break;
      }
      targetPost.like++;
    },
    addComment: (state, { payload : { id, comment, listName } }) => {
      // const targetPost = state.review.find((post) => {
      //   return post.id === id;       
      // });
      // targetPost.comments.push(comment);

      let targetPost;
      switch (listName) {
        case "review":
          targetPost = state.review.find((post) => {
            return post.id === id;
          });                    
          break;
        case "notice":
          targetPost = state.notice.find((post) => {
            return post.id === id;
          });                    
          break;
        case "free":
          targetPost = state.free.find((post) => {
            return post.id === id;
          });                    
          break;
          
        default:
          console.error("에러입니다.");
          break;
      }

      targetPost.comments.push(comment);
    },
    editContent: (state, { payload: { id, listName, editedcontent } }) => {
      let targetPost;
      switch (listName) {
        case "review":
          targetPost = state.review.find((post) => {
            return post.id === id;
          });                    
          break;
        case "notice":
          targetPost = state.notice.find((post) => {
            return post.id === id;
          });                    
          break;
        case "free":
          targetPost = state.free.find((post) => {
            return post.id === id;
          });
          break;
          
        default:
          console.error("에러입니다.");
          break;
      }

      targetPost.content = editedcontent;
    }
  }
});

export const { addPost, increment, addComment, editContent } = postSlice.actions;
export const selectReview = state => state.post.review;
export const selectNotice = state => state.post.notice;
export const selectFree = state => state.post.free;


export default postSlice.reducer;
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  review: [
    {
      id: "0x1",
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
      like: 0
    }
  ],
  notice: [
    {
      id: "0x1",
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
      like: 0
    }
  ],
  free: [
    {
      id: "0x1",
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
      like: 0
    }
  ]
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, { payload : { radioValue: listName, postTextObj: { postUserProfileImg, postUserNickname, postUserId, postValue } } }) => {
      let postObj;
      console.log(listName);
      switch (listName) {
        case "review":
          postObj = {
            id: `0x${(state.review.length + 1).toString(16)}`,
            userProfileImg: postUserProfileImg,
            userNickname: postUserNickname,
            userId: postUserId,
            content: postValue,
            comments: [],
            like: 0
          };
          state.review.push(postObj);    
          break;

        case "notice":
          postObj = {
            id: `0x${(state.notice.length + 1).toString(16)}`,
            userProfileImg: postUserProfileImg,
            userNickname: postUserNickname,
            userId: postUserId,
            content: postValue,
            comments: [],
            like: 0
          };
          state.notice.push(postObj);    
          break;

        case "free":
          postObj = {
            id: `0x${(state.free.length + 1).toString(16)}`,
            userProfileImg: postUserProfileImg,
            userNickname: postUserNickname,
            userId: postUserId,
            content: postValue,
            comments: [],
            like: 0
          };
          state.free.push(postObj);    
          break;
      
        default:
          console.error("에러입니다.");
          break;
      }
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
    removePost: (state, {payload : { listName, id}}) => { 
      let targetPost;

      switch (listName) {
        case "review":
          targetPost = state.review.findIndex((post) => post.id === id);
          state.review.splice(targetPost, 1);            
          break;

        case "notice":
          targetPost = state.notice.findIndex((post) => post.id === id);
          state.notice.splice(targetPost, 1);
          break;

        case "free":
          targetPost = state.free.findIndex((post) => post.id === id);
          state.free.splice(targetPost, 1);
          break;
      
        default:
          console.error("에러입니다.");
          break;
      }
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
    removeComment:(state, { payload : id, listName }) => {
      let targetPost;
      switch (listName) {
        case "review":
          targetPost = state.review.findIndex((post) => post.id === id);
          state.review.splice(targetPost, 1);         
          break;
        case "notice":
          targetPost = state.review.findIndex((post) => post.id === id);
          state.review.splice(targetPost, 1);                        
          break;
        case "free":
          targetPost = state.review.findIndex((post) => post.id === id);
          state.review.splice(targetPost, 1);                       
          break;
          
        default:
          console.error("에러입니다.");
          break;
      }
    }
  }
});

export const { addPost, increment, addComment, removePost, removeComment } = postSlice.actions;
export const selectReview = state => state.post.review;
export const selectNotice = state => state.post.notice;
export const selectFree = state => state.post.free;


export default postSlice.reducer;
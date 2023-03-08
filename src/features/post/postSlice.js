import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  review: [
    {
      id: "0x1",
      userProfileImg: "/images/user02.png",
      userNickname: "규니규니",
      userId: "ygh424",
      content: "리뷰 게시글",
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
      content: "공지 게시글",
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
      content: "자유 게시글",
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
    removeComment: (state, { payload : { postId, commentId, listName } }) => {
      console.log(postId, commentId);
      let targetPost;
      let targetCommentIndex;
      switch (listName) {
        case "review":
          targetPost = state.review.find(post => post.id === postId);
          break;
        case "notice":
          targetPost = state.notice.find(post => post.id === postId);
          break;
        case "free":
          targetPost = state.free.find(post => post.id === postId);
          break;
          
        default:
          console.error("에러입니다.");
          break;
      }
      targetCommentIndex = targetPost.comments.findIndex((comment) => comment.id === commentId);
      targetPost.comments.splice(targetCommentIndex, 1);
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
    },

  }
});

export const { addPost, increment, addComment, removePost, removeComment, editContent } = postSlice.actions;
export const selectReview = state => state.post.review;
export const selectNotice = state => state.post.notice;
export const selectFree = state => state.post.free;
export const selectAll = state => state.post;

export default postSlice.reducer;
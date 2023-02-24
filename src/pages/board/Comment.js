import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../features/post/postSlice";
import { selectUser } from "../../features/user/userSlice";
import { RiCloseFill } from "react-icons/ri";



// 댓글 CSS
const CommentWarp = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

.comment-title {
  font-size: 15px; 
  margin-bottom: 10px;
  margin-left: 15px;
 
}
.comment-title span {
  color: #19a0ff;
}
`;
const CommentInput = styled.input`
  border: none;
  outline: none;
  border: 1px solid #efefef;
  border-radius: 50px;
  padding: 15px 20px;
  margin-bottom: 10px;
  height: 50px;
    box-sizing: border-box;
`;
const CommentListItem = styled.li`
  display: flex;
  padding: 10px;

  .comment-item-image {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
  .comment-item-name {
    font-size: 14px;
    font-weight: bold;
    margin: 3px 0 5px;
    display:flex;
  }
  .comment-item-name span{
    color:#adadad;
    font-weight: normal;
    font-size: 12px;
    margin-left: 5px;
}
  .comment-item-text {
    font-size: 13px;
    color:#999;
  }
`;
function Comment(props) {
  const [comment, setComment] = useState('');
  const { data, postId } = props;
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);

  

  const handleSubmit = () => {
    let commentArr;
    if (loggedInUser) {
      commentArr = {
        id: data.length + 1,
        commentUserProfileImg: data.userProfileImg,
        commentsUserNickname : loggedInUser.nickname,
        commentsUserId : loggedInUser.id,
        comment
      }
    } else {
      commentArr = {
        id: data.length + 1,
        commentUserProfileImg: "/images/user05.png",
        commentsUserNickname : "익명",
        commentsUserId : null,
        comment
      }
    }
    dispatch(addComment({ id: postId, comment: commentArr}));
    setComment('');
  };

  return (
    <CommentWarp>
      <p className="comment-title">전체댓글 <span>{data.length}</span></p>  
      <CommentInput type="text" placeholder="댓글을 작성하세요."
        value={comment} onChange={e => setComment(e.target.value)}
        onKeyUp={ e => {if (e.key === 'Enter' && comment) handleSubmit();} }
      />
      <ul>
        {data.map( (comment) => {
          return (
            <CommentListItem key={comment.id}>
              <img src={comment.commentUserProfileImg} className="comment-item-image"/>
              <div>
                <p className="comment-item-name">{comment.commentsUserNickname} <span>{comment.commentsUserId && `@ ${comment.commentsUserId}`}</span></p>
                <p className="comment-item-text">{comment.comment}</p>
              </div>

              <RiCloseFill />
            </CommentListItem>                   
          );
        })}
        
      </ul>
    </CommentWarp>    
  );
}

export default Comment;
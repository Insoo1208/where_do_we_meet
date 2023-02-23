import { useState } from "react";
import styled from "styled-components";
import { AiOutlineComment, AiOutlineDown, AiOutlineUp, AiFillHeart, AiOutlineSearch } from "react-icons/ai";
import user02 from "../../images/user02.png";
import data from "../../data.json";
import { useDispatch } from "react-redux";
import { addComment } from "../../features/post/postSlice";



// 댓글 CSS
const CommentWarp = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

.comment-title {
  font-size: 16px; 
  margin-bottom: 10px;
  margin-left: 15px;
  font-weight:bold;
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

  const handleSubmit = () => {
    dispatch(addComment({ id: postId, comment: {
      id: "0x0102",
      commentUserProfileImg: "src",
      commentsUserNickname : "모니모니",
      commentsUserId : "ttsss556",
      comment: comment
    }}));
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
              <img src={user02} className="comment-item-image"/>
              <div>
                <p className="comment-item-name">{comment.commentsUserNickname} <span>{`@ ${comment.commentsUserId}`}</span></p>
                <p className="comment-item-text">{comment.comment}</p>
              </div>
            </CommentListItem>                   
          );
        })}
        
      </ul>
    </CommentWarp>    
  );
}

export default Comment;
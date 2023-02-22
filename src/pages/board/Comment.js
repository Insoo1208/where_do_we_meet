import { useState } from "react";
import styled from "styled-components";
import { AiOutlineComment, AiOutlineDown, AiOutlineUp, AiFillHeart, AiOutlineSearch } from "react-icons/ai";
import user01 from "../../images/user01.png";
import user02 from "../../images/user02.png";



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
  return (
    <CommentWarp>
      <p className="comment-title">전체댓글 <span>16</span></p>  
      <CommentInput type="text" placeholder="댓글을 작성하세요." />
      <ul>
        <CommentListItem>
          <img src={user02} className="comment-item-image"/>
          <div>
            <p className="comment-item-name">모니모니 <span>@ttsss556</span></p>
            <p className="comment-item-text">라떼가 맛있습니다.</p>
          </div>
        </CommentListItem>
      </ul>
    </CommentWarp>    
  );
}

export default Comment;
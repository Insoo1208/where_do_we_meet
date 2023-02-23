import { useState } from "react";
import styled from "styled-components";
import { AiOutlineComment, AiOutlineDown, AiOutlineUp, AiFillHeart, AiOutlineSearch } from "react-icons/ai";
import user01 from "../../images/user01.png";
import Comment from "./Comment";
import data from "../../data.json";


const PostWarp = styled.li`
  display: flex;  
  border-bottom:1px solid #f3f3f3;
  padding: 50px;

  .post-item-image {
    width: 45px;
    height: 45px;
  }
  .content-area{
    margin: 5px 0 0 10px;
  }
  .post-item-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    display:flex;
  }
  .post-item-name span {
    color:#adadad;
    font-weight: normal;
    font-size: 14px;
    margin-left: 5px;
  }
  .post-item-text {
    font-size: 14px;
    line-height: 1.3;
    margin-bottom: 40px;
    color:#898989;
  }
  .post-item-icon {
    display: flex;
    justify-content: space-between;
    align-items: center;   
  } 
  .post-item-icon li{
    font-size: 13px;
    cursor: pointer;  
    display:flex ;
    justify-content: center;
    align-items: center;

  }  
  .icon-like {
    color: #ff5858;
    font-size: 1.2rem;
  }
  .icon-comment {
    font-size: 1.4rem;
  }
  svg {
    font-size: 35px;
    color: #5a5454;
  }
`;


function PostListItem(props) {

  const [btn, setBtn] = useState(false);

  const handleOpen = ()=> {
    setBtn(true);
  };
  const handleClose = ()=> {
    setBtn(false);
  };

  const {post} = props;

  return (
    <PostWarp>
      <img src={user01} className="post-item-image"/>
      <div className="content-area">
        <p className="post-item-name">{post.userNickname} <span>{`@ ${post.userId}`}</span></p>
        <p className="post-item-text">
          {post.content}
        </p>

        { btn && <Comment data={post.comments} /> }

        <ul className="post-item-icon">                  
          <li><AiFillHeart className="icon-like"/><span> {post.like}</span></li>
          <li><AiOutlineComment className="icon-comment"/><span>{post.comments.length}</span></li>
        </ul>
        
      </div>
      { btn ? <AiOutlineUp onClick={handleClose}/> : <AiOutlineDown onClick={handleOpen}/> }   
    </PostWarp>    
  );
}

export default PostListItem;
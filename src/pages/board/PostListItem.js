import { useState } from "react";
import styled, { css } from "styled-components";
import { AiOutlineDown, AiOutlineUp, AiFillHeart } from "react-icons/ai";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { increment, editContent } from "../../features/post/postSlice";
import { FaRegTrashAlt, FaRegEdit, FaRegCommentDots } from "react-icons/fa";


const PostWarp = styled.div`
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
    ${ props => props.btn
      ? css` `
      : css`
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;   
      `
    }
  }
  .post-item-icon {
    display: flex;
    align-items: center;   
  } 
  .post-item-icon li{
    font-size: 13px;
    cursor: pointer;  
    display:flex ;
    justify-content: center;
    align-items: center;
  }  
  .post-item-icon li span {
    margin-left: 2px;
    font-weight: 500;
  }
  .icon-like {
    color: #ff5858;
    font-size: 1.2rem;
  }
  .icon-comment {
    font-size: 1.2rem;
    margin-left: 10px;
  }
  .icon-edit {
    font-size: 1.2rem;
    margin-right: 5px;
  }
  .icon-trash{
    font-size: 1.1rem;
  }
  .aarrow-icon {
    font-size: 2.5rem;
  }
`;
const StyleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
function PostListItem(props) {
  const { post, listName } = props;
  const [btn, setBtn] = useState(false);
  const [editContents, setEditContents] = useState(false);
  const [contentsValue, setContentsValue] = useState('');

  const dispatch = useDispatch();  

  const handleOpen = ()=> {
    setBtn(true);
    setContentsValue(post.content);
  };
  const handleClose = ()=> {
    setBtn(false);
  };  
  const handleRemove = () => {
    
  };

  const handleEdit = () => {
    setEditContents(true);
  }

  const handleSubmit = () => {
    console.log(listName);
    dispatch(editContent({ id: post.id, listName, editedcontent: contentsValue }));
    setEditContents(false);
  }


  return (
    <PostWarp btn={btn}>
      <img src={post.userProfileImg} className="post-item-image"/>
      <div className="content-area">
        <p className="post-item-name">{post.userNickname} <span>{`@ ${post.userId}`}</span></p>
        <p className="post-item-text" onClick={handleOpen} >
          {/* eidt 상태가 true이면 input창과 확인버튼 / false이면 post.content */}
          {editContents
            ? (
              <>
                <label htmlFor="edit-textarea" />
                <textarea id="edit-textarea" value={contentsValue} onChange={e => setContentsValue(e.target.value)}/>
                <button onClick={handleSubmit}>확인</button>
              </>
            )
            : post.content}
        </p>

        { btn && <Comment data={post.comments} postId={post.id} listName={listName} /> }

        <StyleDiv>
          <ul className="post-item-icon">       
            <li onClick={() => dispatch(increment({id: post.id, listName }))}><AiFillHeart className="icon-like"/><span> {post.like}</span></li>
            <li onClick={handleOpen}><FaRegCommentDots className="icon-comment" /><span>{post.comments.length}</span></li>
          </ul>
          <ul className="post-item-icon">       
            <li onClick={handleEdit}><FaRegEdit className="icon-edit"/></li>
            <li onClick={undefined}><FaRegTrashAlt className="icon-trash" onClick={handleRemove}/></li>
          </ul>
        </StyleDiv>
      </div>      

      { btn ? <AiOutlineUp className="aarrow-icon" onClick={handleClose}/> : <AiOutlineDown className="aarrow-icon" onClick={handleOpen}/> }   

      
    </PostWarp>    
  );
}

export default PostListItem;


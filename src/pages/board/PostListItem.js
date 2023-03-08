import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { AiOutlineDown, AiOutlineUp, AiFillHeart } from "react-icons/ai";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { editContent, increment, removePost } from "../../features/post/postSlice";
import { FaRegTrashAlt, FaRegEdit, FaRegCommentDots } from "react-icons/fa";
import { selectUser } from "../../features/user/userSlice";


const PostWarp = styled.div`
  display: flex;  
  border-bottom:1px solid #f3f3f3;
  padding: 50px;

  .post-item-image {
    width: 45px;
    height: 45px;
  }
  .content-area{
    flex: 1;
    margin: 5px 0 0 10px;
    position: relative;
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
  .arrow-icon {
    /* font-size: 2.5rem; */
    font-size: 1rem;
  }
`;

const StyleTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: 1px solid #e3e3e3;
  outline: none;
  padding: 20px;
  font-size: 15px;
  color: #4e4e4e;
  resize: none;
  background: #fbfbfb;
  font-family: inherit;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const StyleButton = styled.button`
  background: #333;
  padding: 5px 10px;
  color: #fff;
  border: none;
  letter-spacing: -1px;
  border-radius: 5px;
  display: block;
  position: absolute;
  right: 0;
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
  const [authority, setAuthority] = useState('anonymous');

  const dispatch = useDispatch();  
  const loggedinUser = useSelector(selectUser);

  useEffect(() => {
    if (loggedinUser) {
      if (loggedinUser.authority === 'admin') setAuthority('admin');
      else if(loggedinUser.authority === 'user') setAuthority('user');
    } else setAuthority('anonymous');

    console.log(authority);
  }, [loggedinUser]);


  const handleOpen = ()=> {
    setBtn(true);
    setContentsValue(post.content);
  };
  const handleClose = ()=> {
    setBtn(false);
  };  

  const handleEdit = () => {
    setEditContents(true);
  }

  const handleSubmit = () => {
    dispatch(editContent({ id: post.id, listName, editedcontent: contentsValue }));
    setEditContents(false);
  }


  return (
    <PostWarp btn={btn}>
      <img src={post.userProfileImg} className="post-item-image"/>
      <div className="content-area">
        <p className="post-item-name">{post.userNickname} <span>{ post.userId && `@${post.userId}`}</span></p>
        <p className="post-item-text" onClick={handleOpen} >
          {editContents
            ? (
              <>
                <label htmlFor="edit-textarea" />
                <StyleTextarea id="edit-textarea" value={contentsValue} onChange={e => setContentsValue(e.target.value)} spellCheck="false" autoComplete="off" />
                <StyleButton onClick={handleSubmit} className="cursor-pointer">확인</StyleButton>
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
          {
            authority === 'admin'
            ? <ul className="post-item-icon">
                <li onClick={handleEdit}><FaRegEdit className="icon-edit"/></li>
                <li onClick={() => dispatch(removePost({id: post.id, listName }))}><FaRegTrashAlt className="icon-trash" /> </li>
              </ul>
            : (authority === 'user' && post.userId === loggedinUser.id) && (
              <ul className="post-item-icon">
                <li onClick={handleEdit}><FaRegEdit className="icon-edit"/></li>
                <li onClick={() => dispatch(removePost({id: post.id, listName }))}><FaRegTrashAlt className="icon-trash" /> </li>
              </ul>
            )
          }
        </StyleDiv>
      </div>      

      { btn ? <AiOutlineUp className="arrow-icon" onClick={handleClose}/> : <AiOutlineDown className="arrow-icon" onClick={handleOpen}/> }
    </PostWarp>    
  );
}

export default PostListItem;


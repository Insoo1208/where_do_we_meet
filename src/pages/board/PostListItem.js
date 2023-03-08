import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { AiOutlineDown, AiOutlineUp, AiFillHeart } from "react-icons/ai";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { editContent, increment, removePost } from "../../features/post/postSlice";
import { FaRegTrashAlt, FaRegEdit, FaRegCommentDots } from "react-icons/fa";
import { selectUser } from "../../features/user/userSlice";


const PostWarp = styled.div`
  @media ${({ theme }) => theme.device.tablet } {
    padding: 2rem;    
  }
  display: flex;  
  border-bottom:.0625rem solid #f3f3f3;
  padding: 3.125rem;


  .post-item-image {
    width: 2.8125rem;
    height: 2.8125rem;
  }
  .content-area{
    flex: 1;
    margin: .3125rem 0 0 .625rem;
    position: relative;
    
  }
  .post-item-name {
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 1.1rem;   
    }
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: .625rem;
    display:flex;
  }
  .post-item-name span {
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 1rem;   
    }
    color:#adadad;
    font-weight: normal;
    font-size: .875rem;
    margin-left: .3125rem;
  }
  .post-item-text {
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 1rem;
    }
    
    font-size: .875rem;
    line-height: 1.3;
    margin-bottom: 2.5rem;
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
    font-size: .8125rem;
    cursor: pointer;  
    display:flex ;
    justify-content: center;
    align-items: center;
  }  
  .post-item-icon li span {
    margin-left: .125rem;
    font-weight: 500;
  }
  .icon-like {
    color: #ff5858;
    font-size: 1.2rem;
  }
  .icon-comment {
    font-size: 1.2rem;
    margin-left: .625rem;
  }
  .icon-edit {
    font-size: 1.2rem;
    margin-right: .3125rem;
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
  min-height: 6.25rem;
  border: .0625rem solid #e3e3e3;
  outline: none;
  padding: 1.25rem;
  font-size: .9375rem;
  color: #4e4e4e;
  resize: none;
  background: #fbfbfb;
  font-family: inherit;
  border-radius: .3125rem;
  margin-bottom: .625rem;
`;
const StyleButton = styled.button`
  background: #333;
  padding: .3125rem .625rem;
  color: #fff;
  border: none;
  letter-spacing: -0.0625rem;
  border-radius: .3125rem;
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
    console.log(listName);
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


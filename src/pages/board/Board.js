import { useState } from "react";
import styled from "styled-components";
import { AiOutlineComment, AiOutlineDown, AiOutlineUp, AiFillHeart, AiOutlineSearch } from "react-icons/ai";
import user01 from "../../images/user01.png";
import user02 from "../../images/user02.png";
import Comment from "./Comment";



const Wrapper = styled.div`
  display: flex;
  background-color: #f5f5f5;
`;
const MenuWrap = styled.div`
    width: 450px;
    height: 900px;
    background-color: #ddd;
`;
const ContentWrap = styled.div`
  padding: 50px;
`;
const Search = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-radius: 50px;
  background:#fff;
  padding: 20px 30px;
  
  .search-icon {
    font-size: 1.5rem;
    margin-right: 5px;
  }
`;
const SearchInput = styled.input`
  outline: none;
  border:none;
  flex:1;

  &::placeholder {
    color: #dee2e6;
    font-size: 17px;
  }
`;
const PostList = styled.div`
  background-color: #fff;
  border:1px solid #efefef;
`;
const PostListItem = styled.li`
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
`;



function Board () {  
  const [btn, setBtn] = useState(false);

  const handleOpen = ()=> {
    setBtn(true);
  };
  const handleClose = ()=> {
    setBtn(false);
  };

  return (
      <Wrapper>
        <MenuWrap>
        </MenuWrap>
        <ContentWrap>
          <Search>
            <AiOutlineSearch className="search-icon"/>
            <SearchInput type="text" placeholder="게시물 검색" />
          </Search>

          <PostList>
            {/* li 게시물 하나*/}
            <PostListItem>
              <img src={user01} className="post-item-image"/>
              <div className="content-area">
                <p className="post-item-name">규니규니 <span>@ygh424</span></p>
                <p className="post-item-text">
                  ㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ<br />
                  머리너이런이럼닝ㄹㅏ어리ㅏ머리이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹ
                </p>

                { btn && <Comment /> }

                <ul className="post-item-icon">                  
                  <li><AiFillHeart className="icon-like"/><span> 100</span></li>
                  <li><AiOutlineComment className="icon-comment"/><span>12</span></li>
                </ul>
                
              </div>
              { btn ? <AiOutlineUp onClick={handleClose}/> : <AiOutlineDown onClick={handleOpen}/> }   
            </PostListItem>    

            <PostListItem>
              <img src={user02} className="post-item-image"/>
              <div className="content-area">
                <p className="post-item-name">모니모니 <span>@ttsss556</span></p>
                <p className="post-item-text">
                  ㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ<br />
                  머리너이런이럼닝ㄹㅏ어리ㅏ머리이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹㅏ어리ㅏ머리너이런이럼닝ㄹ
                </p>
                <ul className="post-item-icon">                  
                  <li><AiFillHeart className="icon-like"/><span> 100</span></li>
                  <li><AiOutlineComment className="icon-comment"/><span>12</span></li>
                </ul>
                
              </div>
              { btn ? <AiOutlineUp onClick={handleClose}/> : <AiOutlineDown onClick={handleOpen}/> }   
            </PostListItem>    
          </PostList>
        </ContentWrap>
        
      </Wrapper>
  );
}

export default Board;
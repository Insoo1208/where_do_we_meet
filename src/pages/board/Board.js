import { useState } from "react";
import styled from "styled-components";
import { AiOutlineComment, AiOutlineDown, AiOutlineUp, AiFillHeart, AiOutlineSearch } from "react-icons/ai";
import user01 from "../../images/user01.png";
import user02 from "../../images/user02.png";
import Comment from "./Comment";
import PostListItem from "./PostListItem";
import { useSelector } from "react-redux";
import { selectPostList } from "../../features/post/postSlice";

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



function Board () {  
  const data = useSelector(selectPostList);

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
            {data.map((post) => {
              return <PostListItem post={post} key={post.id}/> ;
            })}
          </PostList>
        </ContentWrap>
        
      </Wrapper>
  );
}

export default Board;
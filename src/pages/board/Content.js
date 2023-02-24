import React from 'react';
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import PostListItem from "./PostListItem";
import { AiFillPlusSquare } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { selectPostList } from '../../features/post/postSlice';

const Wrapper = styled.div`
  padding: 50px;
  flex: 1;
`;
const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  .writeIcon{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 64px;
    height: 64px;
    margin-right: 15px;
  }
`;
const Search = styled.div`
  display: flex;
  border-radius: 50px;
  background:#fff;
  padding: 20px 30px;
  flex:1;
  height: 60px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  
  .search-icon {
    font-size: 1.5rem;
    margin-right: 5px;
  }
`;
const SearchInput = styled.input`
  outline: none;
  border:none;
  flex:1;
  font-size: 17px;

  &::placeholder {
    color: #d9d9d9;
    letter-spacing: -1px;
  }
`;
const PostList = styled.div`
  background-color: #fff;
  border:1px solid #efefef;
`;

function Contents(props) {
  const data = useSelector(selectPostList);

  return (
    <Wrapper>
      <StyleDiv>
        <AiFillPlusSquare className="writeIcon cursor-pointer"/>
        <Search>
          <AiOutlineSearch className="search-icon"/>
          <SearchInput type="text" placeholder="게시물 검색" />
        </Search>
      </StyleDiv>

      <PostList>
        {data.map((post) => {
          return <PostListItem post={post} key={post.id}/> ;
        })}
      </PostList>
    </Wrapper>
  );
}

export default Contents;
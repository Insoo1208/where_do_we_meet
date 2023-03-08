import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import PostListItem from "./PostListItem";
import { AiFillPlusSquare } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { selectFree, selectReview } from '../../features/post/postSlice';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  @media ${({ theme }) => theme.device.tablet } {
    padding: 2rem;    
  }
  padding: 3.125rem;
  flex: 1;

  h3 {
    @media ${({ theme }) => theme.device.tablet } {
      margin-bottom: 1.5rem;
    }
    font-size: 1.625rem;
    padding-bottom: .9375rem;
    margin-bottom: 3.125rem;
    font-weight: 600;
    letter-spacing: -0.0625rem;
    color: #333;
    letter-spacing: -0.125rem;
  }
`;

const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.25rem;

  .writeIcon{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .625rem;
    width: 4rem;
    height: 4rem;
    margin-right: .9375rem;
    color:#1f44a0;
  }
`;
const Search = styled.div`
  display: flex;
  border-radius: 3.125rem;
  background:#fff;
  padding: 1.25rem 1.875rem;
  flex:1;
  height: 3.75rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 1px solid #ebebeb;
  
  .search-icon {
    font-size: 1.5rem;
    margin-right: .3125rem;
  }
`;
const SearchInput = styled.input`
  outline: none;
  border:none;
  flex:1;
  font-size: 1.0625rem;

  &::placeholder {
    color: #d9d9d9;
    letter-spacing: -0.0625rem;
  }
`;
const PostList = styled.div`
  background-color: #fff;
  border:1px solid #efefef;
`;

function Free(props) {
  const [searchValue, setSearchValue] = useState('');
  const [postData, setPostData] = useState([]);

  const data = useSelector(selectFree);
  const navigate = useNavigate();
  
  useEffect(() => {
    setPostData(data);
  }, [data]);

  const handleSearch = () => {
    if (searchValue === '') return setPostData([...data]);
    const searchData = data.filter(post => post.content.toLowerCase().includes(searchValue.toLowerCase()));
    if (searchData.length < 1) {
      return alert('검색 결과가 없습니다.');
    } else {
      setPostData(searchData);
    }
  }

  return (
    <Wrapper>
      <h3>자유게시판</h3>

      <StyleDiv>
        <AiFillPlusSquare className="writeIcon cursor-pointer" onClick={() => {navigate("/board/post-write"); }}/>
        <Search>
          <AiOutlineSearch className="search-icon" onClick={handleSearch}/>
          <SearchInput type="text" placeholder="게시물 검색" value={searchValue} onChange={e => setSearchValue(e.target.value)}
            onKeyUp={ e => {if (e.key === "Enter" && searchValue) handleSearch();}}
          />
        </Search>
      </StyleDiv>

      <PostList>
        {postData.map((post) => {
          return <PostListItem post={post} key={post.id} listName={"free"} /> ;
        })}
      </PostList>
    </Wrapper>
  );
}

export default Free;
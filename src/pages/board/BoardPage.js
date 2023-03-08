import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import PostListItem from "./PostListItem";
import { AiFillPlusSquare } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { selectAll } from '../../features/post/postSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 50px;
  flex: 1;

  h3 {
    font-size: 26px;
    padding-bottom: 15px;
    margin-bottom: 50px;
    font-weight: 600;
    letter-spacing: -1px;
    color: #333;
    letter-spacing: -2px;
  }
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
    color:#1f44a0;
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
  border: 1px solid #ebebeb;
  
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

function BoardPage() {
  const [searchValue, setSearchValue] = useState('');
  const [postData, setPostData] = useState([]);
  
  const data = useSelector(selectAll);
  const navigate = useNavigate();
  const titleParams = useParams();

  const titleData = useRef('카페 리뷰');
  let currentPostList;

  useEffect(() => {
    const setTitle = () => {
      switch (titleParams.listName) {
        case 'review':
          titleData.current = '카페 리뷰';
          currentPostList = data.review;
          break;
      
        case 'notice':
          titleData.current = '공지사항';
          currentPostList = data.notice;
          break;
      
        case 'free':
          titleData.current = '자유 게시판';
          currentPostList = data.free;
          break;
      
        default:
          console.error('페이지 에러');
          break;
      }
    };
    setTitle();
    setPostData(currentPostList);
  }, [data, titleParams]);

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
      <h3>{titleData.current}</h3>
      <StyleDiv>
        <AiFillPlusSquare className="writeIcon cursor-pointer" onClick={() => {navigate("/board/post-write"); }}/>
        <Search>
          <AiOutlineSearch className="search-icon" onClick={handleSearch}/>
          <SearchInput type="text" placeholder="게시물 검색" value={searchValue} onChange={e => setSearchValue(e.target.value)}
            onKeyUp={ e => {if (e.key === "Enter") handleSearch();}}
          />
        </Search>
      </StyleDiv>

      <PostList>
        {postData.map((post) => {
          return <PostListItem post={post} key={post.id} listName={titleParams.listName}/> ;
        })}
      </PostList>
    </Wrapper>
  );
}

export default BoardPage;
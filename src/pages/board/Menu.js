import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";


const Wrapper = styled.div`
    width: 250px;
    height: auto;
    background-color: #ddd;
    padding: 50px;

    h3{
      font-size: 30px;
      margin-bottom: 30px;
      font-weight: 600
    }
    ul li {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #333;
      padding: 0 15px;         
    }
`;

function Menu(props) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <h3>게시판</h3>
      <ul>
        <li className="cursor-pointer" onClick={() => {navigate("/board");}}>카페리뷰</li>
        <li className="cursor-pointer" onClick={() => {navigate("/board/notice");}}>공지사항</li>
        <li className="cursor-pointer" onClick={() => {navigate("/board/free-board");}} >자유게시판</li>
      </ul>          
    </Wrapper>
  );
}

export default Menu;
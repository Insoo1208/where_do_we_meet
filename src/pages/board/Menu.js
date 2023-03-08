import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";


const Wrapper = styled.div`
    width: 300px;
    height: auto;
    padding: 50px;

    h3{
      font-size: 30px;
      margin-bottom: 30px;
      font-weight: 600;
      padding-left: 10px;
    }
    ul li {
      font-size: 16px;
    height: 50px;
    line-height: 46px;
    border-bottom: 1px solid #cbcbcb;
    padding: 0 25px;
    background: #fff;
    border-radius: 50px;
    margin-bottom: 5px;
    }
`;

function Menu(props) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <h3>게시판</h3>
      <ul>
        <li className="cursor-pointer" onClick={() => {navigate("/board/review");}}>카페리뷰</li>
        <li className="cursor-pointer" onClick={() => {navigate("/board/free");}} >자유게시판</li>
        <li className="cursor-pointer" onClick={() => {navigate("/board/notice");}}>공지사항</li>
      </ul>          
    </Wrapper>
  );
}

export default Menu;
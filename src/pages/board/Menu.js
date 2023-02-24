import React from 'react';
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
  return (
    <Wrapper>
      <h3>게시판</h3>
      <ul>
        <li className="">카페리뷰</li>
        <li className="">공지사항</li>
        <li className="">자유게시판</li>
      </ul>          
    </Wrapper>
  );
}

export default Menu;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";



const Wrapper = styled.div`
  @media ${({ theme }) => theme.device.tablet } {
    background-color: yellow;
    width: 100%;
    padding: 1.125rem;
    display: flex;
    align-items: center;
  }
    width: 300px;
    height: auto;
    padding: 3.125rem;
    
    
    h3{
      @media ${({ theme }) => theme.device.tablet } {
        
      }
      font-size: 1.875rem;
      margin-bottom: 30px;
      font-weight: 600;
      padding-left: 10px;

    }
    ul {
      @media ${({ theme }) => theme.device.tablet } {
        display: flex;
      }
    }
    ul li {
      font-size: 1rem;
      height: 3.125rem;
      line-height: 2.875rem;
      border-bottom: .0625rem solid #cbcbcb;
      padding: 0 1.5625rem;
      background: #fff;
      border-radius: 50px;
      margin-bottom: .3125rem;
    }

    
`;
// const MediaTest = styled.div`
//   @media ${({ theme }) => theme.device.tablet } {
//     width: 50px;
//     height: 50px;
//     background-color: skyblue;
//   }
//   width: 100px;
//   height: 100px;
//   background-color: pink;
//   color: ${({theme}) => theme.gray100};
// `;


function Menu(props) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {/* <MediaTest>게시판!</MediaTest> */}
      <h3>게시판</h3>
      <ul>
        <li className="cursor-pointer" onClick={() => {navigate("/board");}}>카페리뷰</li>
        <li className="cursor-pointer" onClick={() => {navigate("/board/free");}} >자유게시판</li>
        <li className="cursor-pointer" onClick={() => {navigate("/board/notice");}}>공지사항</li>
      </ul>          
    </Wrapper>
  );
}

export default Menu;
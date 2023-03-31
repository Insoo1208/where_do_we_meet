import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";



const Wrapper = styled.div`
  @media ${({ theme }) => theme.device.tablet } {
    width: 100%;
    padding: 1.125rem;
    display: flex;
    align-items: center;
    overflow-x: auto;
    flex-wrap: nowrap;
    border-bottom: .0625rem solid #cbcbcb;
  }
    width: 300px;
    height: auto;
    padding: 3.125rem;
    
    
    h3{
      @media ${({ theme }) => theme.device.tablet } {
        white-space: nowrap;
        margin-bottom: 0;
        font-size: 1.6rem;
      }
      font-size: 1.875rem;
      margin-bottom: 30px;
      font-weight: 600;
      padding-left: 10px;

    }
    ul {
      @media ${({ theme }) => theme.device.tablet } {
        display: flex;
        white-space: nowrap;
        flex-wrap: nowrap;
      }
    }
    ul li {
      @media ${({ theme }) => theme.device.tablet } {
        margin-bottom: 0;
        margin-left :1rem;
      }
      font-size: 1rem;
      height: 3.125rem;
      line-height: 2.875rem;
      border-bottom: .0625rem solid #cbcbcb;
      padding: 0 1.25rem;
      background: #fff;
      border-radius: 50px;
      margin-bottom: .3125rem;
    }
`;


function Menu(props) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <h3>마이페이지</h3>
      <ul>
        <li className="cursor-pointer" onClick={() => {navigate("/mypages/userinfos");}}>개인정보 수정</li>
        <li className="cursor-pointer" onClick={() => {navigate("/mypages/bookmark");}} >즐겨찾기 등록</li>
        <li className="cursor-pointer" onClick={() => {navigate("/mypages/theme");}}>테마색상 설정</li>
      </ul>          
    </Wrapper>
  );
}

export default Menu;
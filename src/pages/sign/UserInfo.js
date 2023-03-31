import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import styled from "styled-components";
import { changeColor, chooseColor, selectColor } from '../../features/color/colorSlice';

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.gray700};

  h1 {
    font-size: 40px;
    font-weight: 700;
    padding: 1rem 2rem 1.5rem;
    cursor: default;
    color:#333;
    margin-bottom: 30px;
  }
  p {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -1px;
    color: #000;
    display:flex;
  }
  p span {
    margin-left: 10px;
  }
`;
const StyledUl = styled.ul`
  width: 400px;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 20px;
  column-gap: 10px;
  row-gap: 10px;
`;
const StyledLi = styled.li`  
  width: 30px;
  height: 30px;
  background-color: ${props => props.props};
  border-radius: .5rem;
`;

const MyColorDiv = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.myColorprops};
  border: 2px solid #000;
  border-radius: .3rem;
`;

const StyleButton = styled.button`
  font-size: 16px;
  background: #fff;
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  font-weight: bold;
  letter-spacing: -1px;
  margin-top: 2rem;
`;

function UserInfo() {
  const colors = [
    {main: '#e75d5d', light: '#ff9090'},
    {main: '#f78b33', light: '#ffbc85'},
    {main: '#ffb539', light: '#f8c963'},
    {main: '#ffcb16', light: '#ffe073'},
    {main: '#adcd1d', light: '#d3f182'},
    {main: '#74c723', light: '#b1ef74'},
    {main: '#0b9c00', light: '#84d77e'},
    {main: '#42c566', light: '#9ae5af'},
    {main: '#46d698', light: '#7af2be'},
    {main: '#1ed2b6', light: '#92faea'},
    {main: '#13d5e7', light: '#92f1fa'},
    {main: '#4ab9f1', light: '#96dbfe'},
    {main: '#4282da', light: '#96c2fe'},
    {main: '#0056cc', light: '#5298f8'},
    {main: '#4858d5', light: '#96a2fe'},
    {main: '#6345df', light: '#aa96fe'},
    {main: '#a94de3', light: '#d696fe'},
    {main: '#d34ee6', light: '#f196fe'},
    {main: '#e87adf', light: '#fbbdf6'},
    {main: '#ee6394', light: '#fbbdd3'},
    {main: '#2c2c2c', light: '#7a7a7a'},
    {main: '#5c5c5c', light: '#aaaaaa'},
    {main: '#909090', light: '#d4d4d4'},
    {main: '#bdbdbd', light: '#eaeaea'}
  ];
  const myColor = useSelector(selectColor);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApi = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://colormind.io/api/',
        data: {
          model : "default",
        },
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8'
        }
      });
      console.log(response.data.result);
      dispatch(changeColor(response.data.result));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section style={{ padding: '150px 0', flex: 1 }}>
      <Wrapper>
        <h1>테마색상 설정하기</h1>
        
        <StyledUl>
          { colors.map((color, index) => { 
            return <StyledLi className="cursor-pointer" key={index} props={color.main} onClick={() => {dispatch(chooseColor(color))}}></StyledLi>
          })}
        </StyledUl>

        <StyleButton type='button' onClick={handleApi} className="cursor-pointer">랜덤색상받기</StyleButton>

        <div style={{ display: "flex", columnGap: "1rem", marginTop: "5rem" }}>
          <p>현재테마 색상 : </p>
          <MyColorDiv myColorprops={myColor.mainColor}></MyColorDiv>
          <MyColorDiv myColorprops={myColor.mainLight}></MyColorDiv>
        </div>
        
        <StyleButton type="button" onClick={() => { navigate('/'); }} className="cursor-pointer">적용하기</StyleButton>
        
      </Wrapper>
    </section>
    
    
  );
}

export default UserInfo;



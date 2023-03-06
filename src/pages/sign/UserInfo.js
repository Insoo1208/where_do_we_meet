import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import styled from "styled-components";
import { changeColor, selectColor } from '../../features/color/colorSlice';

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
    margin-bottom: 20px;
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
const RandomButton = styled.button`
  margin-bottom: 70px;
`;
const StyledUl = styled.ul`
  width: 190px;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 20px;
  column-gap: 10px;
  row-gap: 10px;
  margin-bottom: 20px;
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

const ApplyButton = styled.button`
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
`;

function UserInfo() {
  const colors = ['#1f44a0', '#f79c35', '#79bf34', '#00c3b6', '#f17676', '#601fa0', '#40bef5', '#3a3c46'];
  const myColor = useSelector(selectColor);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(myColor);

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
      let toHex = '#';
      for (const num of response.data.result[2]) {
        toHex += `${num.toString(16)}`;
      }
      dispatch(changeColor(toHex));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>Change Theme</h1>
        
        <StyledUl>
          { colors.map((color, index) => { 
            return <StyledLi className="cursor-pointer" key={index} props={color} onClick={() => {dispatch(changeColor(color))}}></StyledLi>
          })}
        </StyledUl>
        <RandomButton type='button' onClick={handleApi} className="cursor-pointer">랜덤색상받기</RandomButton>

        <div style={{ display: "flex", columnGap: "1rem" }}>
          <p>현재테마 색상 : </p>
          <MyColorDiv myColorprops={myColor}></MyColorDiv>
        </div>
        
        <ApplyButton type="button" onClick={() => { navigate('/'); }} className="cursor-pointer">적용하기</ApplyButton>
        
      </Wrapper>
    </section>
    
    
  );
}

export default UserInfo;



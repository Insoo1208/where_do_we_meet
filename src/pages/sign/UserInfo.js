import axios from 'axios';
import React, { useState } from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.gray700};

  h1 {
    font-size: 30px;
    font-weight: 700;
    padding: 1rem 2rem 1.5rem;
    cursor: default;
  }
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
`;
const StyledLi = styled.li`  
  width: 30px;
  height: 30px;
  background-color: ${props => props.props};
`;

const MyColorDiv = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.myColorprops};
`;

function UserInfo(props) {
  const colors = ['#111', '#ddd', '#eee', '#555', '#333', '#222', '#111', '#888'];
  const [myColor, setMyColor] = useState('');

  const handleApi = () => {
    try {
      var url = "http://colormind.io/api/";
      var data = {
        model : "default",
        // input : [[44,43,44],[90,83,82],"N","N","N"]
      }

      var http = new XMLHttpRequest();

      http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          var palette = JSON.parse(http.responseText).result;
          console.log(palette);
          // let toHex = '#';
          // for (const num of palette[2]) {
          //   toHex += `${num.toString(16)}`;
          // }
          // console.log(toHex);
          // setMyColor(toHex);
        }
      }

      http.open("POST", url, true);
      http.send(JSON.stringify(data));


      // const colorData = await axios({
      //   method: 'post',
      //   url: 'http://colormind.io/api/',
      //   data: {
      //     model : "default",
      //     // input : [[44,43,44],[90,83,82],"N","N","N"]
      //   }
      // });
      // console.log(colorData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section style={{ padding: '150px 0' }}>
      <Wrapper>
        <h1>theme</h1>
        <button type='button' onClick={handleApi}>랜덤색상받기</button>
        <StyledUl>
          { colors.map((color, index) => { 
            return <StyledLi key={index} props={color}></StyledLi>
          })}
        </StyledUl>
  
        <p>현재테마 색상 <span className="color"></span></p>
        { myColor && <MyColorDiv myColorprops={myColor}></MyColorDiv> }
        <button>적용하기</button>
        
      </Wrapper>
    </section>
    
    
  );
}

export default UserInfo;



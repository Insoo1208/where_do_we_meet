import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { addPost } from '../../features/post/postSlice';
import { selectColor } from '../../features/color/colorSlice';


const Wrapper = styled.div`
  background-color: #f5f5f5;
  padding: 50px;
  flex: 1;
`;
const Write =styled.div`
  width: 100%;
  padding: 50px;
  background: #fff;

  .main-title {
    font-size: 26px;
    border-bottom: 1px solid #dfdfdf;
    padding-bottom: 15px;
    margin-bottom: 50px;
    font-weight: 600;
    letter-spacing: -1px;
    color: #333;
    letter-spacing: -2px;
  }
  .post-title{
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -1px;
    margin-bottom: 10px;
  }
`;
const StyleTextarea = styled.textarea`
  width: 100%;
  min-height: 430px;
  border: 1px solid #e3e3e3;
  outline: none;
  padding: 20px;
  font-size: 15px;
  color: #4e4e4e;
  resize: none;
  background: #fbfbfb;
  font-family: inherit;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const RadioWrap = styled.div`

  label {
    margin-right: 5px;
    letter-spacing: -0.8px;
  }
`;

const BtnWrap = styled.div`
  display:flex;
  justify-content: end;

  .btn-submit {
    background: #6c6c6c;
    color: #fff;
    margin-left: 10px;

    :hover {
      background: ${props => props.myColorHex.mainColor};
    }
  }

  .btn-cancel {    
      border: 1px solid #ddd;
      background: transparent;
    :hover {
      background: #f1f1f1;
    }
  }
`;


const StyleButton = styled.button`
    width: 100px;
    height: 50px;
    border: none;    
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    border-radius: 5px;
    letter-spacing: -1px;
  `;

function PostWrite() {
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState('review');
  const [postValue, setPostValue] = useState('');
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const myColor = useSelector(selectColor);

  const handleSubmit = () => {
    if(!radioValue) {
      alert('게시판 목록을 선택해주세요.');
    } else if (postValue) {
      let postTextObj;
      if (loggedInUser) {
        postTextObj = {
          postUserProfileImg: loggedInUser.userProfileImg,
          postUserNickname : loggedInUser.nickname,
          postUserId : loggedInUser.id,
          postValue        
        }
      } else {
        postTextObj = {
          postUserProfileImg: "/images/user05.png",
          postUserNickname : "익명",
          postUserId : null,
          postValue
        }
      }
      dispatch(addPost({ radioValue, postTextObj }));
      setPostValue('');
      navigate(`/board/${radioValue}`);
    } if (!postValue) alert('게시물 내용을 입력해주세요.');
  };
  
  return (
    <Wrapper>
      <Write>
        <h3 className="main-title">게시물 작성하기</h3>               
        <p className="post-title">내용 입력</p>      
        <StyleTextarea type="text" placeholder="게시물 내용을 작성하세요." value={postValue} onChange={(e) => {setPostValue(e.target.value)} } spellCheck="false" autoComplete="off" />
        <RadioWrap>
          <input type="radio" className="cursor-pointer" id="review" name="postwrite" value="review" onChange={(e) => {setRadioValue(e.target.value);} } checked={radioValue === 'review'} />
          <label className="cursor-pointer" htmlFor="review">카페리뷰</label>
          <input type="radio" className="cursor-pointer" id="free" name="postwrite" value="free" onChange={(e) => {setRadioValue(e.target.value);} } checked={radioValue === 'free'} />
          <label className="cursor-pointer" htmlFor="free">자유게시판</label>
          {(loggedInUser && loggedInUser.authority) === 'admin' &&
            <>
              <input type="radio" id="notice" name="postwrite" value="notice" onChange={(e) => {setRadioValue(e.target.value);} } checked={radioValue === 'notice'} />
              <label htmlFor="notice">공지사항</label>
            </>
          }
        </RadioWrap>
        <BtnWrap myColorHex={myColor}>
          <StyleButton className="btn-cancel cursor-pointer" type="button" onClick={() => {navigate("/board/review");}}>취소</StyleButton>
          <StyleButton className="btn-submit cursor-pointer" type="button" onClick={handleSubmit}>완료</StyleButton>
        </BtnWrap>
      </Write>    
    </Wrapper>    
  );
}

export default PostWrite;
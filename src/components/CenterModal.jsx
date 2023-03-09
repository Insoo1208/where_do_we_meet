import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css, keyframes } from "styled-components";
import Button from "../components/Button";
import { selectColor } from '../features/color/colorSlice';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideUp = keyframes`
  from { transform: translateY(200px); }
  to { transform: translateY(0px); }
`;

const slideDown = keyframes`
  from { transform: translateY(0px); }
  to { transform: translateY(200px); }
`;

const modalSizes = {
  large: {
    width: '31.25rem'
  },
  medium: {
    width: '25rem'
  },
  small: {
    width: '18.75rem'
  },
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${props => props.disappear && css`
    animation-name: ${fadeOut};
  `}
`;

const ModalContainer = styled.div`
  width: ${({ size }) => modalSizes[size].width};
  height: ${({ height }) => height};
  background: #fff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  color: white;
  overflow-y: overlay;

  .header {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background-color: ${props => props.myColorHex.mainColor};
  }

  hr {
    margin: 0;
    border: 0.5px solid #eeeeee;
  }

  .body {
    padding: 1.25rem;
    font-size: 1rem;
    line-height: 1.125rem;
    color: ${props => props.theme.gray800};
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${props => props.disappear && css`
    animation-name: ${slideDown};
  `}
`;


const ButtonGroup = styled.div`
  padding: 1.25rem;
  display: flex;
`;

const ModalButton = styled(Button)`
  border-radius: 20px;


  & + & {
    margin-left: 0.625rem;
  }
`; 

// 모달
function CenterModal({
  visible,
  size, 
  height,
  title,
  children,
  cancelText,
  confirmText,
  onCancel,
  onConfirm 
}) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  const myColor = useSelector(selectColor);

  useEffect(() => {
    disableScroll();
    return () => enableScroll();
  }, []);

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);
  
  

  if (!localVisible && !animate) return null;

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; }
    }));
  } catch(e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  // call this to Disable
  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }


  return (
    <Background disappear={!visible}>
      <ModalContainer myColorHex={myColor} disappear={!visible} size={size} height={height}>
        <div className='header'>
          <span className='modal-title'>{title}</span>
        </div>
        <hr />
        <div className='body'>{children}</div>
        <div className='footer'>
          <ButtonGroup>
            <ModalButton size="medium" outline onClick={onCancel}>{cancelText}</ModalButton>
            <ModalButton color={myColor.mainColor} size="medium" outline onClick={onConfirm}>{confirmText}</ModalButton>
          </ButtonGroup>
        </div>
      </ModalContainer>
    </Background>
  );
}

export default CenterModal;
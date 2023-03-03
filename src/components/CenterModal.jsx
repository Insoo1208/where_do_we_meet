import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from "styled-components";
import Button from "../components/Button";

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
  background: gray;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  color: white;
  overflow-y: overlay;

  .header {
    display: flex;
    align-items: center;
    padding: 0.75rem;
  }

  hr {
    margin: 0;
    border: 0.5px solid #eeeeee;
  }

  .body {
    padding: 1.25rem;
    font-size: 1rem;
    line-height: 1.125rem;
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

  return (
    <Background disappear={!visible}>
      <ModalContainer disappear={!visible} size={size} height={height}>
        <div className='header'>
          <span className='modal-title'>{title}</span>
        </div>
        <hr />
        <div className='body'>{children}</div>
        <div className='footer'>
          <ButtonGroup>
            <ModalButton color="#ff0000" size="medium" outline onClick={onCancel}>{cancelText}</ModalButton>
            <ModalButton size="medium" outline onClick={onConfirm}>{confirmText}</ModalButton>
          </ButtonGroup>
        </div>
      </ModalContainer>
    </Background>
  );
}

export default CenterModal;
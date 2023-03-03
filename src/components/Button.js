import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const buttonSizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem'
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem'
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem'
  }
};

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }

  /* 색상 */
  ${({ color: buttonColor, outline }) => {
    return css`
      background: ${buttonColor};
      &:hover {
        background: ${lighten(0.1, buttonColor)};
      }
      &:active {
        background: ${darken(0.1, buttonColor)};
      }

      ${outline &&
        css`
          color: ${buttonColor};
          background: none;
          border: 1px solid ${buttonColor};
          &:hover {
            background: ${buttonColor};
            color: white;
          }
          &:active {
            background: ${darken(0.1, buttonColor)};
            color: white;
          }
        `}
    `;
  }}

  /* 크기 */
  ${({ size }) => css`
    height: ${buttonSizes[size].height};
    font-size: ${buttonSizes[size].fontSize};
  `}
`;

const Button = ({
  color,
  size,
  outline,
  ...rest
}) => {
  // console.log(rest);
  return <StyledButton color={color} size={size} outline={outline} {...rest} />;
};

Button.defaultProps = {
  color: '#1f1f1f',
  size: 'medium'
};

export default Button;
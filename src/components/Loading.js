import { useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import styled from "styled-components";
import { selectColor } from "../features/color/colorSlice";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .container {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border: 2px solid ${props => props.myColorHex.mainColor};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function Loading() {
  const myColor = useSelector(selectColor);

  return (
    <Wrapper myColorHex={myColor}>
      <div className="container">
        <MoonLoader color={myColor.mainColor} />
      </div>
    </Wrapper>
  );
}

export default Loading;
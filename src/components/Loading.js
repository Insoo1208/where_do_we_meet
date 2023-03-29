import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";
import { selectColor } from "../features/color/colorSlice";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Loading() {
  const myColor = useSelector(selectColor);

  return (
    <Wrapper>
      <SyncLoader
        color={myColor.mainColor}
      />
    </Wrapper>
  );
}

export default Loading;
import styled, { keyframes } from "styled-components"

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export default styled.img`
    animation: ${rotate360} infinite 120s linear;
    height: 80px;
    &:hover {
        animation: ${rotate360} infinite 1.5s linear;
    }
    margin-left: 12px;
    margin-top: 12px;
`

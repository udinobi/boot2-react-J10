import styled from "styled-components"

export const CommonStyle = styled.div`
    color: #878787;
    font-weight: lighter;
`

export const MediumText = styled(CommonStyle)`
    font-size: larger;
`

export const SmallerText = styled(MediumText)`
    @media (max-width: 1240px) {
        font-size: smaller;
    }
`

export const LargeText = styled(CommonStyle)`
    font-size: 42px;
`

import styled, { css } from 'styled-components'

const LoadingBar = styled.div`
    position: absolute;
    width: 0vw;
    left: 0;
    bottom: 0px;
    height: 7px;
    background-color: #f8f8f8;
    
    ${ props => !props.theme.dark && css`
        background-color: #080808;
    `}
`

export default LoadingBar 
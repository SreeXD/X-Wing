import styled, { css } from 'styled-components'

const Canvas = styled.canvas`
    position: fixed;
    z-index: -1;
    max-width: 100vw;
    max-height: 100vh;
    transition: filter 400ms ease-out;

    ${props => props.theme.dark && css`
        filter: invert(100%);
    `}
`

export default Canvas
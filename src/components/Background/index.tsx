import styled from 'styled-components';

const Background = styled.main`
    background-color: ${({ theme }) => theme.colors.background};
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default Background;
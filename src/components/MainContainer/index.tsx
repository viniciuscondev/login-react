import styled from 'styled-components';

const MainContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.black};
    border-radius: 10px;
    padding: 26px;    
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, .7));
`;

export default MainContainer;
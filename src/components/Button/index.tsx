import styled from 'styled-components';

const ButtonMain = styled.button`
    width: 360px;
    height: 49px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 5px;    
    transition: .2s;

    &:hover {
        filter: brightness(170%);
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        padding: 15px;
        color: ${({ theme }) => theme.colors.white};
        background: rgba(0, 0, 0, 0.2);      
    }
    strong {
        font-size: 20px;
        color: ${({ theme }) => theme.colors.white};
        text-align: center;
        flex: 1;
    }
`;

interface ButtonProps {
    title: string;
    icon: JSX.Element;
    onClick?: React.MouseEventHandler,
    width?: string,
    margin?: string,
    color?: string
}

function Button({ title, icon, onClick, width, margin, color}: ButtonProps) {
    return (
        <ButtonMain onClick={onClick} style={{width, margin, background: color}}>
            <span>{ icon }</span>
            <strong>{ title }</strong>
        </ButtonMain>
    );
}

export default Button;
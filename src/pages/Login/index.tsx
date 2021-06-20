import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import styled from 'styled-components';

import Background from '../../components/Background';
import MainContainer from '../../components/MainContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.black};
    font-size: 32px;
    margin-bottom: 18px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    a {
        text-decoration: none;
        font-size: 18px;
        color: ${({ theme }) => theme.colors.background};
    }
`;

function Login() {
    return (
        <Background>
            <MainContainer>
                <Title>Login</Title>
                <Form>
                    <Input type="email" name="email" placeholder="Email" />
                    <Input type="password" name="password" placeholder="Password" />                    
                    <Button title="Entrar" icon={<FiLogIn/>} />                    
                    <Link to='/register' >Criar nova conta</Link>
                </Form>
            </MainContainer>
        </Background>
    );
}

export default Login;
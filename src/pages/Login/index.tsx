import { useState } from 'react';
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
    const [inputs, setInputs] = useState({
        email: "",
        password: ""        
    });

    const { email, password } = inputs;

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputs({ ...inputs, [event.target.name] : event.target.value });
    }

    return (
        <Background>
            <MainContainer>
                <Title>Login</Title>
                <Form>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleInputChange={handleInputChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Senha"
                        handleInputChange={handleInputChange}
                    />                    
                    <Button title="Entrar" icon={<FiLogIn/>} />                    
                    <Link to='/register' >Criar nova conta</Link>
                </Form>
            </MainContainer>
        </Background>
    );
}

export default Login;
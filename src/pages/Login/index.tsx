import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';

import Background from '../../components/Background';
import MainContainer from '../../components/MainContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';

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

function Login({ setAuth }: any) {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""        
    });

    const { email, password } = inputs;

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputs({ ...inputs, [event.target.name] : event.target.value });
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            
            const data = { email, password };

            const response = await api.post('users/login', data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setAuth(true);
                toast.info("Login realizado com sucesso!", {position: toast.POSITION.TOP_CENTER});            
            } else {
                setAuth(false);
                toast.error(response.data.error, {position: toast.POSITION.TOP_CENTER});                
            }
            
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Background>
            <MainContainer>
                <Title>Login</Title>
                <Form onSubmit={handleSubmit}>
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
                    <Button margin="20px 0" title="Entrar" icon={<FiLogIn/>} />                    
                    <Link to='/register' >Criar nova conta</Link>
                </Form>
            </MainContainer>
        <ToastContainer />
        </Background>
    );
}

export default Login;
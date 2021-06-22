import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import styled from 'styled-components';

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

function Register() {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const { name, email, password, passwordConfirmation } = inputs;

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputs({ ...inputs, [event.target.name] : event.target.value });
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            const data = { name, email, password, passwordConfirmation };

            const response = await api.post('users/register', data);

            console.log(response);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Background>
            <MainContainer>
                <Title>Crie uma nova conta</Title>
                <Form onSubmit={handleSubmit}>
                    <Input 
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Nome"
                        handleInputChange={handleInputChange}
                    />
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
                    <Input
                        type="password"
                        name="passwordConfirmation"
                        value={passwordConfirmation}
                        placeholder="Confirmação da senha"
                        handleInputChange={handleInputChange}
                    />
                    <Button title="Criar conta" icon={<FiLogIn/>} />                    
                    <Link to='/' >Já está cadastrado? Faça o login</Link>
                </Form>
            </MainContainer>
        </Background>
    );
}

export default Register;
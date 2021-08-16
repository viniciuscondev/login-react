import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserCheck } from 'react-icons/fi';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';

import Background from '../../components/Background';
import MainContainer from '../../components/MainContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.min.css';

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
    const [loading, setLoading] = useState(false);

    const history = useHistory();

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

            setLoading(true);

            const response = await api.post('users/register', data, {
                validateStatus: function (status) {
                    return status < 500;
                  }
            });

            setLoading(false);

            if (response.data.status === "success") {
                toast.info("Conta criada com sucesso!", {position: toast.POSITION.TOP_CENTER});
                setTimeout(() => { history.push('/'); }, 6000);                
            } else {
                console.log(response.data);
                toast.error(response.data.error, {position: toast.POSITION.TOP_CENTER});
                toast.error(response.data[0].error, {position: toast.POSITION.TOP_CENTER});
            }
            
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Background>
            <MainContainer>
                <Title>Crie uma nova conta {loading ? <CircularProgress size={28} /> : ""}</Title>
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
                    <Button margin="20px 0" title="Criar conta" icon={<FiUserCheck/>} />
                    <Link to='/' >Já está cadastrado? Faça o login</Link>
                </Form>                
            </MainContainer>
        <ToastContainer />
        </Background>
    );
}

export default Register;
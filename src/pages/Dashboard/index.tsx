import React, { useState, useEffect } from 'react';
import { FiLogOut, FiEdit3, FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';

import Button from '../../components/Button';
import Background from '../../components/Background';
import MainContainer from '../../components/MainContainer';
import Input from '../../components/Input';
import api from '../../services/api';

const Header = styled.header`
    background-color: #0a1035;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 2%;
    height: 10vh;

    h1 {
        color: ${({ theme }) => theme.colors.white};
    }
    
`;

const DashboardBackground = styled(Background)`
    & {
        height: 90vh;
    }
`;

const Container = styled(MainContainer)`
    & {
        width: 80%;
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
    }
`;

function Dashboard({ setAuth }: any) {
    const [name, setName] = useState("");
    const [inputs, setInputs] = useState({        
        newPassword: ""        
    });

    const { newPassword } = inputs;

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputs({ ...inputs, [event.target.name] : event.target.value });
    }

    async function getProfileData() {
        try {

            const response = await api.get('users/profile', {
                headers: {
                    token: localStorage.token
                }
            });
                        
            setName(response.data.name);
        } catch (err) {
            console.error(err.message);
        }
    }

    function logout(event: React.MouseEvent) {
        event.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.info("Você saiu da sua conta com sucesso", {position: toast.POSITION.TOP_CENTER});
    };

    async function deleteAccount() {
        try {
            
            await api.delete('users/delete', {
                headers: {
                    token: localStorage.token
                }
            });

            localStorage.removeItem("token");
            setAuth(false);

            toast.info("Sua conta foi excluída com sucesso!", {position: toast.POSITION.TOP_CENTER});
        } catch (error) {
            console.error(error.message);
        }
    }

    async function changePassword() {
        try {
            const data = { newPassword };

            const response = await api.put('users/update', data, {
                headers: {
                    token: localStorage.token
                }
            });
            
            if(response.status === 200) {
                toast.info("Senha alterada com sucesso!", {position: toast.POSITION.TOP_CENTER});
            } else {
                toast.error(response.data.error, {position: toast.POSITION.TOP_CENTER});
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getProfileData();
    },[]);

    return (
        <>
            <Header>
                <h1>Olá, {name}!</h1>
                <Button width="150px" title="Sair" icon={<FiLogOut />} onClick={(event) => logout(event)} />
            </Header>
            <DashboardBackground>
                <Container>
                    <h1>Configurações</h1>
                    <div>
                        <Input 
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            placeholder="Nova Senha"
                            handleInputChange={handleInputChange}
                        />
                        <Button width="250px" margin="0 0 0 25px" title="Mudar Senha" icon={<FiEdit3 />} onClick={changePassword} />                        
                    </div>
                    <Button color="#701313" margin="40px 0 0 0" title="Apagar Conta" icon={<FiTrash2 />} onClick={deleteAccount} />
                </Container>
            </DashboardBackground>
            <ToastContainer />
        </>
    );
}

export default Dashboard;
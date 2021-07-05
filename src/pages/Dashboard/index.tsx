import React, { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';

import Button from '../../components/Button';
import Background from '../../components/Background';
import MainContainer from '../../components/MainContainer';

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
`;

function Dashboard({ setAuth }: any) {
    const [name, setName] = useState("");

    async function getProfileData() {
        try {
            const response = await fetch("http://localhost:3333/users/profile/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseResponse = await response.json();
                        
            setName(parseResponse.name);
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
                </Container>
            </DashboardBackground>
            <ToastContainer />
        </>
    );
}

export default Dashboard;
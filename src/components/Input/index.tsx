import { useState } from 'react';
import styled from 'styled-components';

const InputField = styled.label`
    position: relative;
    font-size: 18px;
    padding-top: 20px;
    margin-bottom: 5px;

    input {
        border: 2px solid ${({ theme }) => theme.colors.gray};
        border-radius: 5px;
        color: ${({ theme }) => theme.colors.black};
        width: 360px;
        font-size: 18px;
        padding: 12px;    
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -ms-progress-appearance: none;
        outline: none;
        transition: border 0.3s ease;
    }
    input:focus {
        border: 2px solid ${({ theme }) => theme.colors.black};
        transition-delay: 0.1s;
    }
    span {
        position: absolute;
        left: 12px;
        top: 50%;
        color: #686868;
        padding: 0 8px;
        transition: 
            top 0.3s ease,
            font-size 0.3s ease,
            color 0.3s ease;
    }
    input:focus + span, .Active {        
        top: 15px;
        background: ${({ theme }) => theme.colors.white};
        font-size: 12px;
        color: #222;
    }    
`;

interface InputProps {
    type: string,
    name: string,
    placeholder: string
}

export default function Input({ type, name, placeholder }: InputProps) {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');

    function handleTextChange(text: string) {
        setValue(text);

        if (text !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }
    
    return (
        <InputField>
            <input type={ `${type}` } name={ `${name}` } value={value} onChange={(e) => handleTextChange(e.target.value)} required />
            <span className={ isActive ? "Active" : "" }>{ placeholder }</span>
        </InputField>
    );
}
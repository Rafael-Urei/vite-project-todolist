import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { useEffect } from "react";

export const Welcome = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const local = localStorage.getItem('AlreadyKnown')
        if (local === 'true') {
            navigate('/home')
        }
    },[])

    return (
        <Modal/>
    )
};
import { Button } from '@carbon/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const navigate = useNavigate();
    const routeChange = () => {
        let path = '';
        navigate(path);
    }
    const handleClick = () => {
        routeChange();
        props.onChange(''); // reset email
    }

    return (
        <>
            <Button onClick={() => { handleClick() }} style={{ "fontSize": "16px", "fontWeight": "bold" }}>SIGNOUT</Button>
        </>
    )
}
export default Logout;
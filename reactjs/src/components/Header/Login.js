import { Button, FormGroup, Modal, PasswordInput, TextInput } from '@carbon/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ModalStateManager = ({
    renderLauncher: LauncherContent,
    children: ModalContent,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {!ModalContent || typeof document === 'undefined'
                ? null
                : ReactDOM.createPortal(
                    <ModalContent open={open} setOpen={setOpen} />,
                    document.body
                )}
            {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
        </>
    );
};

const Login = (props) => {

    let email = '';
    const handleChange = (event) => {
        email = event.target.value;
    }
    const handleSubmit = (setOpen) => {
        setOpen(false);
        props.onChange(email);
    }

    return (
        <ModalStateManager
            renderLauncher={({ setOpen }) => (
                <Button onClick={() => setOpen(true)} style={{ "fontSize": "16px", "fontWeight": "bold" }}>LOGIN</Button>
            )}>
            {({ open, setOpen }) => (
                <Modal
                    modalHeading="Signin with your account"
                    primaryButtonText="Login"
                    secondaryButtonText="Cancel"
                    open={open}
                    onRequestClose={() => setOpen(false)}
                    onRequestSubmit={() => { handleSubmit(setOpen) }}>
                    <FormGroup style={{ maxWidth: '600px' }} legendText='sa'>
                        <TextInput
                            data-modal-primary-focus
                            name="logemail"
                            id="logemail"
                            labelText="Email Id"
                            placeholder="Email Id"
                            style={{ marginBottom: '1rem' }}
                            onChange={handleChange}
                        />
                        <PasswordInput
                            id="logpassword"
                            labelText="Password"
                            placeholder="Password"
                        />
                    </FormGroup>
                </Modal>
            )}
        </ModalStateManager>
    );
}

export default Login;
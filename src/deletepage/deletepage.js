import { Modal, Box, Button, Alert } from "@mui/material"
import { baseAPIUrl } from "../utils/commUtils";
import { useRequest } from "../utils/hookUtils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const DeleteModal = ({author, modalOpen, setModalOpen, blogId}) => {

    const requestDelete = useRequest('POST', `${baseAPIUrl}/blog/delete?id=${blogId}`)
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const resp = await requestDelete({});
            const { status, data: {errno} } = resp;
            if (status === 200 && errno === 0) {
                setModalOpen(false);
                return navigate(`/${author}/blogs`);
            } else {
                setError(new Error("Falied to delete, try again later"))
            }
        } catch(err) {
            setError(err);
        }
    }

    const renderModalContent = () => {
        if (error) {
            return <Alert severity="error">Something went wrong, try again later</Alert>
        }
        return <>
                <Alert severity="info">You are about to delete your blogs</Alert>
                <p></p>
                <Button variant="outlined" onClick={handleDelete}>Confirm</Button>
        </>
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
    return (
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                {renderModalContent()}
            </Box>
        </Modal>
    );
}
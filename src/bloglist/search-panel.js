import { Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom";

export const SearchPanel = () => {

    const handleInputChange = (event) => {
        console.log(event)
    }

    const navigate = useNavigate();
    const handleButtonClick = (event) => {
        return navigate('/blog/create')
    }

    return <>
        <TextField
            label="Search posts"
            id="search-bar"
            autoFocus
            margin="dense"
            onChange={handleInputChange}
            size="small"
        />
        <div>
            <Button onClick={handleButtonClick}>Create</Button>
        </div>
    </>
}
import { TextField } from "@mui/material"

export const SearchPanel = () => {

    const handleInputChange = (event) => {
        console.log(event)
    }

    return <div>
        <TextField
            label="Search posts"
            id="search-bar"
            autoFocus
            margin="dense"
            onChange={handleInputChange}
            size="small"
        />
    </div>
}
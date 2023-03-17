import { TextField } from "@mui/material"
import { useCallback } from "react";
import loadsh from 'lodash'


export const SearchPanel = ({ setPage, setSearchVal }) => {

    const handleInputChange = (event) => {
        setSearchVal(event.target.value);
        setPage(1);
    };

    const handleDebounceInputChange = useCallback(loadsh.debounce(handleInputChange, 2000), [])

    return <div className="search-panel">
        <TextField
            fullWidth
            label="Search posts"
            autoFocus
            margin="dense"
            onChange={handleDebounceInputChange}
            size="small"
        />
    </div>
}

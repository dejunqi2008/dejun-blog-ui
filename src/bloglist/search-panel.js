import { Button, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { baseAPIUrl } from '../utils/commUtils';
import loadsh from 'lodash'
import axios from "axios";

export const SearchPanel = ({ author, isAuth, setBlogPosts }) => {

    const [searchVal, setSearchVal] = useState('');
    useEffect(() => {
        axios.get(`${baseAPIUrl}/blog/list?author=${author}&keyword=${searchVal}`)
        .then(resp => {
            const { data: {data, errno}, status} = resp;
            if (status === 200 && errno === 0) {
                setBlogPosts(data);
            }
        });
    }, [searchVal])

    const handleInputChange = (event) => {
        setSearchVal(event.target.value);
    };

    const handleDebounceInputChange = useCallback(loadsh.debounce(handleInputChange, 2000), [])

    return <>
        <TextField
            label="Search posts"
            id="search-bar"
            autoFocus
            margin="dense"
            onChange={handleDebounceInputChange}
            size="small"
        />
    </>
}

// export const MemoSearchPannel = memo(SearchPanel)
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {useLoader} from "../utils/providers/LoadingProvider.jsx";
import React, {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';

const filter = createFilterOptions();
export default function KeywordAutocomplete(props) {
    const {isLoading} = useLoader();
    const [value, setValue] = useState(props.userKeywords);
    return (
        <Autocomplete
            multiple
            limitTags={5}
            options={value.concat(props.keywords.filter(kW => !value.some(v => v.id === kW.id)))}
            value={value}
            getOptionLabel={(option) => option.name}
            loading={isLoading}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        name: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        name: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
                props.onChange(newValue);
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const {inputValue} = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.name);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        name: inputValue,
                    });
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(renderProps, option) => {
                if(value.some((val) => val.id === option.id || val.name === option.name)) {
                    renderProps["aria-selected"] = true;
                    renderProps["aria-disabled"] = true;
                }
                return (<li {...renderProps}>{option.name}</li>);
            }
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="My Keywords"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            freeSolo
            fullWidth
        />
    )
}
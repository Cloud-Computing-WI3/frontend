import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {useLoader} from "../utils/providers/LoadingProvider.jsx";
import React, {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';
import {GoogleCategories} from "../utils/apis/news_feed/google_categories.js";

const filter = createFilterOptions();
export default function KeywordAutocomplete(props) {
    const [value, setValue] = useState(props.userKeywords.map(kW => {return ({category: "My keywords", name: kW.name, id: kW.id})}));
    const initOptions = value.concat(props.keywords.filter(kW => !value.some(v => v.id === kW.id)));
    const [googleCategories, setGoogleCategories] = useState([]);
    const [options, setOptions] = useState(initOptions.concat(googleCategories));
    useEffect(() => {
        setLoading(true);
        GoogleCategories.get().then(categories => {
            const c = categories.sort((a, b) => -b.category.localeCompare(a.category))
            setOptions(options.concat(c));
            setLoading(false);
        })
    }, [])
    const {isLoading, setLoading} = useLoader();
    return (
        <Autocomplete
            multiple
            limitTags={5}
            options={options}
            value={value}
            groupBy={(option) => option.category}
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
                        category: "Add new",
                        name: inputValue,
                    });
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(renderProps, option) => {
                if(value.some((val) => val.name === option.name)) {
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
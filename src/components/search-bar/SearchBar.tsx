import React from "react"
import { SearchIcon } from '@patternfly/react-icons';
import '@patternfly/react-core/dist/styles/base.css';

import {
    Button,
    ButtonVariant,
    InputGroup,
    TextInput,
} from '@patternfly/react-core';

const SearchBar: React.FC = (props) => {
    return (
        <React.Fragment>
            <InputGroup>
                <TextInput name="textInput11" id="textInput11" type="search" aria-label="search input example" />
                <Button variant={ButtonVariant.control} aria-label="search button for search input">
                    <SearchIcon />
                </Button>
            </InputGroup>
        </React.Fragment>

    );
}

export default SearchBar;

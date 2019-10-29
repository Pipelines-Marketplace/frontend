/* eslint-disable max-len */
import React, {useState} from 'react';
import {SearchIcon} from '@patternfly/react-icons';
import '@patternfly/react-core/dist/styles/base.css';
import './index.css';

import {
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  Flex,
} from '@patternfly/react-core';

const SearchBar: React.FC = (props) => {
  const [isOpen, set] = useState(false);
  const dropdownItems = [
    <DropdownItem key="link">Link</DropdownItem>,
    <DropdownItem key="action" component="button">
          Action
    </DropdownItem>,
    <DropdownItem key="disabled link" isDisabled>
          Disabled Link
    </DropdownItem>,
    <DropdownItem key="disabled action" isDisabled component="button">
          Disabled Action
    </DropdownItem>,
    <DropdownSeparator key="separator" />,
    <DropdownItem key="separated link">Separated Link</DropdownItem>,
    <DropdownItem key="separated action" component="button">
          Separated Action
    </DropdownItem>,
  ];
  const ontoggle = (isOpen: React.SetStateAction<boolean>) => set(isOpen);
  const onSelect = () => set(!isOpen);

  return (

    <div>
      <Flex breakpointMods={[{modifier: 'flex-1', breakpoint: 'lg'}]}>
        <React.Fragment>
          <InputGroup style={{width: '70%'}}>
            <TextInput name="textInput11" id="textInput11" type="search" aria-label="search input example" />
            <Button variant={ButtonVariant.control} aria-label="search button for search input">
              <SearchIcon />
            </Button>
          </InputGroup>

          <div className="filter">
            <Dropdown
              onSelect = {onSelect}
              toggle={<DropdownToggle onToggle={ontoggle}>Filter</DropdownToggle>}
              isOpen = {isOpen}
              dropdownItems={dropdownItems}
            />
          </div>

        </React.Fragment>
      </Flex>
    </div>
  );
};

export default SearchBar;

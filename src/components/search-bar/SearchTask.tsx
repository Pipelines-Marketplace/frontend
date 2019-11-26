import * as React from 'react';
import {ENTER_KEY} from '../../constants';
import {TextInput} from '@patternfly/react-core';

interface SearchTaskProps {
    onSearchTask: (text: string) => void;
}

// eslint-disable-next-line react/prop-types
const SearchTask: React.FC<SearchTaskProps> = ({onSearchTask}) => {
  const onEnterkey = (e: React.KeyboardEvent) => {
    const value = (e.target as HTMLInputElement).value;
    if (e.keyCode !== ENTER_KEY || !value.trim()) return;
    onSearchTask(value);
    (e.currentTarget as HTMLInputElement).value = '';
  };

  return <TextInput name="textInput11" id="textInput11" type="search"
    aria-label="search input example" onKeyDown = {onEnterkey} autoFocus />;
};

export default SearchTask;

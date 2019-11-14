import React, { useState } from 'react';
import TaskContainer from '../task-container/TaskContainer';
import { useEffect } from 'react';
import './filter.css';
import { Checkbox,Expandable,} from '@patternfly/react-core/dist/js/components';
import { TagsIcon, BoldIcon } from '@patternfly/react-icons';
import { any, string } from 'prop-types';
import { tsExportAssignment } from '@babel/types';
export interface TagsData {
  name: string,
  status: boolean
}
const Filter: React.FC = () => {
  const [flag, setFlas] = useState(false);
  const tags_set = new Set();
  // fetch api for getting tags

  const tags = ['go', 'build', 'task', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'p'];

  const pdf = () => {
    console.log(tags_set);

  }
  const add = (e: any) => {
    if (tags_set.has(e.target.value) === false) {
      tags_set.add(e.target.value);
    }
    else {
      tags_set.delete(e.target.value)
    }
  ///   dispath the tags array tpo store and fetch then

    // function call for display in category-wise
    pdf();
  }

  return (
    <div className="filter-size">


      <h2 style={{ textAlign: "center", marginBottom: "1em" }}>Categories</h2>
      <React.Fragment >

        <Checkbox label="Task" id="Task" value="Task" onClick={add} aria-label="uncontrolled checkbox example" />
        <Checkbox label="Pipelines" id="Pipelines" value="Pipelines" onClick={add} aria-label="uncontrolled checkbox example" />
      </React.Fragment>

      <h2 style={{ textAlign: "center", marginBottom: "1em" }}> Tags </h2>

      <React.Fragment >
        {
          tags.map((it: string) =>
            <Checkbox label={it} value={it} onClick={add} aria-label="uncontrolled checkbox example" id={it} />)

        }
      </React.Fragment>
    

      <h2 style={{ textAlign: "center", marginBottom: "1em" }}> Types </h2>

      <React.Fragment >
        <Checkbox label="Build" value="Build" onClick={add} aria-label="uncontrolled checkbox example" id="Build" />
        <Checkbox label="Test" value="Test" onClick={add} aria-label="uncontrolled checkbox example" id="Test" />
        <Checkbox label="Deploy" value="Deploy" onClick={add} aria-label="uncontrolled checkbox example" id="Deploy" />
      </React.Fragment>
      

    </div>
  );
};

export default Filter;

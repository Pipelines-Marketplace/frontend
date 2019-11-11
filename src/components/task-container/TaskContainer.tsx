import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
// eslint-disable-next-line no-unused-vars
import {TaskPropObject} from '../task/Task';
import Task from '../task/Task';
import {mockData} from '../../services/mockdata';
import axios from 'axios'
import { any } from 'prop-types';
import { ResData } from '../redux/store';
import { async } from 'q';
import {fetchTaskSuccess} from '../redux/Actions/TaskAction'

export interface MockData{
  Name : string,
  Description : string,
  Rating : number,
  Downloads : number,
  YAML : string
}

const TaskContainer: React.FC = (props: any) => {
  // console.log(props.users)
  const [Taskdata, setTaskData] = useState([])
  
  // React.useEffect(() => {
  //   fetch('http://localhost:5000/tasks')
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log(data)        
  //       setTaskData(data)
  //     });
  // }, [])
  var tempArr : any = []
  React.useEffect(() => {
    props.fetchTaskSuccess()
  }, [])
  
  // let TaskDataItems = props.TaskData.map((task: MockData) =>{
  //   const taskData: MockData = {
  //     Name: task['Name'],
  //     Description: task['Description'],
  //     Rating: 0,
  //     Downloads: 0,
  //     YAML: task['YAML']
  //    };
  // })

  // console.log(typeof(props.TaskData))
  // var TaskDataItems = props.TaskData
  // console.log(TaskDataItems)

//   if(props.TaskData != null){
//   Object.keys(props.TaskData).map(function(key){
//     tempArr.push({[key]:props.TaskData[key]})
//     return tempArr
//   })
// }
  
  if(props.TaskData != null){
    
    tempArr = props.TaskData.map((task: any) =>{
      const taskData: MockData = {
            Name: task['Name'],
            Description: task['Description'],
            Rating: 0,
            Downloads: 0,
            YAML: task['YAML']
           };
           return taskData
    })
  }

// console.log(TaskDataItems)
  return (
    
    <div>
      {/* {JSON.stringify(props.TaskData)} */}

      {
      //  if(props.TaskData != null) {
        tempArr.map((task: any) => {
          const taskData: MockData = {
            Name: task['Name'],
            Description: task['Description'],
            Rating: 0,
            Downloads: 0,
            YAML: task['YAML']
           };
          return <Task key={task['Name']} task={taskData} />;
        })
      }
      {/* } */}
      
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return{
      TaskData : state.TaskData.TaskData   
  }
}

// export default TaskContainer
export default connect(mapStateToProps, {fetchTaskSuccess})(TaskContainer)





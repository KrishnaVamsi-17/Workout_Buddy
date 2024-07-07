import { useState } from "react";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'


const WorkoutForm = () => {
  const {dispatch} = useWorkoutsContext()
  const [title,setTitle] = useState('')
  const [load,setLoad] = useState('')
  const [reps,setReps] = useState('')
  const [error,setError] = useState(null)
  const [emptyFields,setEmptyFields] = useState([])

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const workout = {title,load,reps};

    const resp = await fetch('http://localhost:4000/api/workouts',{
      method:'POST',
      body:JSON.stringify(workout),
      headers:{
        'Content-Type':'application/json'
      }

    })
    const json = await resp.json();

    if(!resp.ok){
       setError(json.error);
       setEmptyFields(json.emptyFields);
    }
    if(resp.ok){

      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields(null);
      //window.location.reload('/');
      console.log("Workout Added");
      dispatch({type:'CREATE_WORKOUT',payload:json})

    }
  }

  return ( 
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Excercise Title:</label>
      <input 
       type="text"
       onChange={(e)=> setTitle(e.target.value)}
       value={title}
       className={emptyFields &&emptyFields.includes('title')?'error':''}
      
      />
      <label>Load (in KG):</label>
      <input 
       type="number"
       onChange={(e)=> setLoad(e.target.value)}
       value={load}
       className={emptyFields &&emptyFields.includes('load')?'error':''}
      
      />
      <label>Reps:</label>
      <input 
       type="number"
       onChange={(e)=> setReps(e.target.value)}
       value={reps}
       className={emptyFields &&emptyFields.includes('reps')?'error':''}
      
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
   );
}
 
export default WorkoutForm;
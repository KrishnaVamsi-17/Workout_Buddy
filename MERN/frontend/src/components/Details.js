import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { FaTrash } from "react-icons/fa";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const Details = ({workout}) => {
  const {dispatch} = useWorkoutsContext()
  const handleClick = async () =>{

    const resp = await fetch('http://localhost:4000/api/workouts/'+ workout._id,{
      method:'DELETE'
    })
    const json = await resp.json()
    if(resp.ok){
      dispatch({type:'DELETE_WORKOUT',payload:json})
    }

  }



  return (
     <div className="workout-details">
       <h4>{workout.title}</h4>
       <p><strong>Load (Kg):</strong>{workout.load}</p>
       <p><strong>Reps:</strong>{workout.reps}</p>
       <p>{formatDistanceToNow(new Date(workout.createdAt),{addsuffix:true})}</p>
       <span onClick={handleClick}><FaTrash /></span>
     </div>
    );
}
 
export default Details;

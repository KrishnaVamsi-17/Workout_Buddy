import { useEffect } from "react";
import Details from '../components/Details';
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
const Home = () => {
   const {workouts,dispatch} = useWorkoutsContext()


  useEffect(()=>{
     const fetchWorkouts = async () =>{
       const resp = await fetch('http://localhost:4000/api/workouts') 
       const json = await resp.json();


       if(resp.ok){
         dispatch({type:'SET_WORKOUTS',payload: json})
       }
     }
     fetchWorkouts();
  },[dispatch])




  return ( 
    <div className="home">
       <div className="workouts">
         {workouts && workouts.map((data)=>(
             <Details key={data._id} workout = {data} />
         ))}
       </div>
       <WorkoutForm />
    </div>
   );
}
 
export default Home;
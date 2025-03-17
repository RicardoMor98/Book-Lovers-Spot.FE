import { useState } from "react"

// useState and useEffect
export default function Counter(){

    

    const[counter,setCounter]=useState(0)

    function incrementCounter(){
        setCounter(counter+1)
    }

    function decrementCounter(){
        if(counter > 0)
        setCounter(counter-1)
    }  


    return(
        <div>
            <h1>Counter Application</h1>
            <p>Reading of counter is:{counter}</p>
            <button onClick={incrementCounter}>increment counter</button>
            <button onClick={decrementCounter}>decrement counter</button>
        </div>
    )
}
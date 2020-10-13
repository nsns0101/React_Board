import React, {useState, useEffect} from "react";


export default () => {
    const [a, setA] = useState(0);

    const myF = () => {
      console.log("myF");
    };
  
    useEffect(()=>{
  
    }, []);
  
    return (
      <div>
        <button onClick={()=>setA(a+1)}>{a}</button>
        {myF()}
      </div>
    );
}
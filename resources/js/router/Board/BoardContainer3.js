import React, {useState, useEffect} from "react";


export default () => {
    const [a, setA] = useState();

    const myF = () => {
      console.log("myF");
    };
  
    useEffect(()=>{
  
    }, []);
  
    return (
      <div>
        <button onClick={()=>setA("b")}>good</button>
        {myF()}
      </div>
    );
}
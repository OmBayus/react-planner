import React, { useState } from "react"

const AddItem = ()=>{

    const [data,setData] = useState({name:"",width:"0",height:"0",image:""})

    const handleChange = (e)=>{
        const {name,value} = e.target
        setData(prevValue=>({...prevValue,[name]:value}))
    }

    const handleSubmit = ()=>{
        const items = JSON.parse(localStorage.getItem("items"))
        if(items){
            items.push(data)
            localStorage.setItem('items', JSON.stringify(items));
        }
        else{
            localStorage.setItem('items', JSON.stringify([data]));
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div style={{margin:"10px 0"}}>
                <input name="name" value={data.name} onChange={handleChange} type="text" placeholder="Name"/>
            </div>
            <div style={{margin:"10px 0"}}>
                <input name="width" value={data.width} onChange={handleChange} type="text" placeholder="Width"/>
            </div>
            <div style={{margin:"10px 0"}}>
                <input name="height" value={data.height} onChange={handleChange} type="text" placeholder="Height"/>
            </div>
            <div style={{margin:"10px 0"}}>
                <input name="image" value={data.image} onChange={handleChange} type="text" placeholder="Image Url"/>
            </div>
            <button type="submit">Save</button>
        </form>
    )
}


export default AddItem
import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
    image: yup.string()
}).required();


const AddItem = ()=>{

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            name: "",
            width: "100",
            height: "100",
            image: ""
        }
      });


    const onSubmit = (data) => {
        const items = JSON.parse(localStorage.getItem("items"))
        data.image = data.image === "" ? `https://via.placeholder.com/${data.width}x${data.height}` : data.image
        if(items){
            items.push(data)
            localStorage.setItem('items', JSON.stringify(items));
        }
        else{
            localStorage.setItem('items', JSON.stringify([data]));
        }
        location.reload();
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} style={{width:"50%"}}>
            <div>
                    <TextField
                        sx={{margin:"1em 0",width:"100%"}}
                        error={errors.name !== undefined}
                        label="Name"
                        helperText={errors.name === undefined ? "" : errors.name.message}
                        {...register("name")}
                    />
            </div>
            <div>
                    <TextField
                        sx={{margin:"1em 0",width:"100%"}}
                        error={errors.width !== undefined}
                        label="Width"
                        helperText={errors.width === undefined ? "" : errors.width.message}
                        {...register("width")}
                    />
            </div>
            <div>
                    <TextField
                        sx={{margin:"1em 0",width:"100%"}}
                        error={errors.height !== undefined}
                        label="Height"
                        helperText={errors.height === undefined ? "" : errors.height.message}
                        {...register("height")}
                    />
            </div>
            <div>
                    <TextField
                        sx={{margin:"1em 0",width:"100%"}}
                        error={errors.image !== undefined}
                        label="Image Url"
                        helperText={errors.image === undefined ? "": errors.image.message}
                        {...register("image")}
                    />
            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
                <Button variant="contained" size="large" type="submit">Save</Button>
            </div>
        </form>
    )
}


export default AddItem
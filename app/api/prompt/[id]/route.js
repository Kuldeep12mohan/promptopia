import { connectToDB } from "@/utils/database";
import Prompt from "@/models/Prompt";

//GET(for reading)

export const GET=async(request,{params})=>{
    try{
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator')

        if(!prompt) return new Response ("Prompt not found",{status:404})

        return new Response(JSON.stringify(prompt),{status:200})

    } catch(error){
        return new Response("failed to fetch ",{status:500})
    }
}

//Patch (for editing)
export const PATCH= async (request,{params})=>{
    const {prompt,tag}=await request.json()

    try {
        await connectToDB()

        const existingPrompt=await Prompt.findById(params.id)
        if(!existingPrompt) return new Response("Prompt not found", {status:404})

        existingPrompt.prompt=prompt
        existingPrompt.tag=tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status :200})
    } catch (error) {
        return new Response("Failed to update Prompt",{status:500})
    }
}

//delete (for deleting)
export const DELETE=async(request,{params})=>{
    try {
        await connectToDB()

        await prompt.findByIdAndRemove(params.id)

        return new Response("Deleted Succesfully",{status:200})
    } catch (error) {
        return new Response("Failed to delete Prompt",{status:500})
    }
}
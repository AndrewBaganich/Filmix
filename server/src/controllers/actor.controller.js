import ActorService from "../services/actor.services.js"

const actorSevice = new ActorService

export const getAllActors = async(req, res) => {
    try{
        const allActors = await actorSevice.getAllActors();
        return res.status(200).json(allActors);
    }catch(err){
        return res.status(404).json({message:"Failed to load actors.", error: err.message});
    }
}

export const getActorById = async(req, res) => {
    try{
        const id = Number(req.params.id);
        const actorById = await actorSevice.getActorById(id);

        if(!actorById){
            return res.status(404).json({message:"Actor not found"});
        }
        return res.status(200).json(actorById);

    }catch(err){
        return res.status(404).json({message:"Actor not found", error: err.message});
    }
}

export const createActor = async(req,res) => {
    try{
        const newActor = await actorSevice.createActor({
            body: req.body,
            avatar: req.file
        });
        return res.status(200).json(newActor);
    }catch(err){
        return res.status(404).json({message: "Actor was not created", error: err.message});
    }
}

export const deleteActor = async(req, res) => {
    try{
        const id = Number(req.params.id);
        const result = await actorSevice.deleteActor(id);
        return res.status(200).json({message: "Actor was deleted"});
    }catch(err){
        return res.status(404).json({message:"Actor not found", error: err.message});
    }
}

export const updateActor = async(req, res) => {
    try{
        const id = Number(req.params.id)
        const body = req.body
        const updatedActor = await actorSevice.updateActor(id,body)

         if(!updatedActor){
            return res.status(404).json({message:"Actor not found"});
        }

        return res.status(200).json(updatedActor, {message: "Actor was updated"});
        
    }catch(err){
        return res.status(404).json({message:"Actor not found", error: err.message});
    }
    
}
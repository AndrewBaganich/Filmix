import prisma from "../config/prisma.js";
import path from "path";
import fs from "fs/promises"

async function createActorWithAvatar(data) {

    const body = data.body;
    const avatar = data.avatar;

    const avatars = path.join("uploads", "avatars")

    await fs.mkdir(avatars, { recursive: true });

    const avatarExt = path.extname(avatar.originalname);

    const avatarFilename = `${Date.now()}-avatar${avatarExt}`;

    const avatarPath = path.join(avatars, avatarFilename);

    await fs.writeFile(avatarPath, avatar.buffer);

    return prisma.actor.create({
        data:{
            name: body.name,
            age: Number(body.age),
            lived: Boolean(body.lived),
            photoUrl: avatarPath,
            bio: body.bio
        }
    })
}

class ActorService{
    
    async getAllActors(){
        return prisma.actor.findMany();
    }
    
    async getActorById(id){
        return prisma.actor.findUnique({
            where:{
                id:id
            }
        })
    }

    async createActor(data){
        return createActorWithAvatar(data)
    }

    async deleteActor(id){
        return prisma.actor.delete({
            where:{
                id: id
            }
        })
    }

    async updateActor(id, body){
        return prisma.actor.update({
            where:{
                id:id
            },
            data:body
        })
    }
    

}

export default ActorService
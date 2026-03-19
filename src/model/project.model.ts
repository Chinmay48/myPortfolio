import mongoose, {Schema,Document,model,models} from "mongoose";

export interface IProject extends Document{
    title:string;
    description:string;
    githubUrl:string;
    liveUrl?:string;
    type:"individual" | "team";
    techStack:string[];
    image?:string;
    createdAt:Date;
    updatedAt:Date;
}

const ProjectSchema=new Schema<IProject>({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    githubUrl:{
        type:String,
        required:true
    },
    liveUrl:{
        type:String
    },
    type:{
        type:String,
        enum:["individual","team"],
        required:true
    },
    techStack:[
        {
            type:String
        }
    ],
    image:{
        type:String
    }
    
},{
    timestamps:true
})

export const Project=models.Project || model<IProject>("Project",ProjectSchema)
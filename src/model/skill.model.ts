import mongoose,{Schema,Document,models,model} from "mongoose";

export interface ISkill extends Document{
    name:string;
    icon:string;
    category:"frontend" | "backend" | "tools";
    createdAt:Date;
    updatedAt:Date
}


const SkillSchema=new Schema<ISkill>(
     {
        name:{
            type:String,
            required:true,
            trim:true
        },
        icon:{
            type:String,
            required:true,
            
        },
        category:{
            type:String,
            enum:["frontend","backend","tools"],
            required:true
        }
     },{
        timestamps:true
     }
)

export const Skill=models.Skill || model<ISkill>("Skill",SkillSchema)
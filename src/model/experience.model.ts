import mongoose,{Schema,Document,models,model} from "mongoose";

export interface IExperience extends Document{
    role:string;
    company:string;
    description:string;
    startDate:Date;
    endDate?:Date;
    isCurrent:boolean;
    techStack?:string[];
    createdAt:Date;
    updatedAt:Date;
}


const ExperienceSchema=new Schema<IExperience>(
    {
      role:{
        type:String,
        required:true,
        trim:true,
      },
      company:{
        type:String,
        required:true,
        trim:true
      },
      description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    techStack: [
      {
        type: String,
      },
    ],
    },{
        timestamps:true
    }
)

export const Experience=models.Experience || model<IExperience>("Experinece",ExperienceSchema)
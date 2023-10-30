import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//import { Comment } from './comment.schema';


export type UserDocument = HydratedDocument<User>;


@Schema({ collection: 'users' })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  role: number;

/*   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[]; */
}



export const UserSchema = SchemaFactory.createForClass(User);
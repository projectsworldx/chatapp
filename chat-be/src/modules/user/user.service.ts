import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UserLogin } from './dto/user.dto';
import { User, UserDocument } from '../../schema/user.schema';
import { JwtAuthService } from '../jwt/jwt.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class UserService {


  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<UserDocument>,
    private  JwtAuthService: JwtAuthService
    ){}

  async create(createUserDto: CreateUserDto) {

    let {password : inputPassword} = createUserDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(inputPassword, salt);
    createUserDto.password = hash;
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  
  }

  findFriends(id: string) {

    const createdUser =  this.userModel.find({ _id: { $ne: id }}).exec();
    return createdUser;

  }

  async userLogin(userLogin: UserLogin) {

    try {
      let { email: email, password } = userLogin;
      let createdUser: any = await this.userModel.findOne({ email }).exec();

      //user not found
      if (!createdUser) {
        throw new HttpException({success: false, result: "User not found"}, HttpStatus.NOT_FOUND);
      }

      const isMatch = await bcrypt.compare(password, createdUser?.password);

      //invalid credentials
      if (!isMatch) {
        throw new HttpException({success: false, result: "Invalid credentials"}, HttpStatus.BAD_REQUEST);
      }

      let {_id, ...userObject} = createdUser;
      let token = await this.JwtAuthService.createToken(userObject);
      return {success: true, result: "User Logged in successfully", data : {token, userObject: createdUser}};

    }
    catch (err) {
      return err;
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

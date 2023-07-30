import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findAllUsersThatNeedToBySynced(seconds: number): User[] {
    throw new Error('Method not implemented.');
  }
  create(createUserInput: CreateUserInput) {
    this.userModel.create(createUserInput);
  }

  findAll() {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string) {
    return this.userModel.findOne({ _id: id }, undefined, { lean: true });
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ username }, undefined, { lean: true });
  }

  update(username: string, updateUserInput: UpdateUserInput) {
    throw new Error('Method not implemented.');
  }

  remove(id: number) {
    throw new Error('Method not implemented.');
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  findAllUsersThatNeedToBySynced(seconds: number): User[] {
    throw new Error('Method not implemented.');
  }
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll(): User[] {
    return [{ exampleField: 1, id: '1', lastSyncAt: new Date() }];
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

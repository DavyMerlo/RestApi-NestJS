import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { mapper } from './mapper/user.mapper';
import { UserComponent } from '../models/components/user.component';

@Injectable({})
export class UserService {

    constructor(
        private userRepository: UserRepository
    )
    {}
    
    async users() : Promise<UserComponent>{
        const usersDB = await this.userRepository.usersDB();
        if(!usersDB || usersDB.length === 0) throw new NotFoundException('No users found');
        const mappedUsers = mapper.mapUser(usersDB);
        return new UserComponent(200, "succesfull", mappedUsers);
    }

    async userById(id: number){
        const userDetail = await this.userRepository.userByIdDB(id);
        if(!userDetail) throw new NotFoundException('No user found with Id: ' + id);
        return userDetail;
    }
}

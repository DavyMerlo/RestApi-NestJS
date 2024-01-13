import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable({})
export class UserService {

    constructor(
        private userRepository: UserRepository
    )
    {}
    
    async users(){
        const usersDB = await this.userRepository.usersDB();
        return usersDB;
    }

    async userById(id: number){
        const userDetail = await this.userRepository.userByIdDB(id);
        return userDetail;
    }
}

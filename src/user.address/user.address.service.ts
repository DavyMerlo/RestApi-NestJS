import { Injectable } from '@nestjs/common';
import { UserAddressRepository } from './user.address.repository';
import { addressMapper } from '../address/mapper/address.mapper';
import { userMapper } from '../user/mapper/user.mapper';

@Injectable()
export class UserAddressService {

    constructor(
        private userAddressRepository: UserAddressRepository
    )
    {}

    async addressByUserId(userId: number){
        const addressByUserIdDB = await this.userAddressRepository.addressesByUserId(userId);
        const addressesToMap = addressByUserIdDB.map(item => item.address);
        return addressMapper.mapAddresses(addressesToMap);
    }

    async userByAddressId(addressId: number){
        const userByAddressIdDb = await this.userAddressRepository.userByAddressId(addressId);
        const userToMap = userByAddressIdDb.map(item => item.user);
        return userMapper.mapUser(userToMap);
    }
}

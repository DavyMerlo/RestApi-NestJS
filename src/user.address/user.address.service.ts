import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAddressRepository } from './user.address.repository';
import { userMapper } from '../user/mapper/user.mapper';
import { userAddressMapper } from './mapper/user.addresses.mapper';

@Injectable()
export class UserAddressService {

    constructor(
        private userAddressRepository: UserAddressRepository
    )
    {}

    async addressesByUserId(userId: number){
        const addressesByUserIdDB = await this.userAddressRepository.addressesByUserId(userId);
        if(!addressesByUserIdDB || addressesByUserIdDB.length === 0) throw new  NotFoundException('No addresses found associated with userId: ' + userId);
        const mappedAddressesUser = userAddressMapper.mapUserAddressList(addressesByUserIdDB);
        return mappedAddressesUser;
    }

    async usersByAddressId(addressId: number){
        const usersByAddressIdDb = await this.userAddressRepository.usersByAddressId(addressId);
        if(!usersByAddressIdDb || usersByAddressIdDb.length === 0) throw new  NotFoundException('No users found associated with addressId: ' + addressId);
        const userToMap = usersByAddressIdDb.map(item => item.user);
        return userMapper.mapUser(userToMap);
    }
}

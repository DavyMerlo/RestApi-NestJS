import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAddressRepository } from './user.address.repository';
import { userAddressMapper } from './mapper/user.addresses.mapper';
import { UserAddressListComponent } from '../models/components/user.address.list.component';
import { AddressUserListComponent } from '../models/components/address.user.list.component';

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
        return new UserAddressListComponent(200, "succesfull", mappedAddressesUser);
    }

    async usersByAddressId(addressId: number){
        const usersByAddressIdDb = await this.userAddressRepository.usersByAddressId(addressId);
        if(!usersByAddressIdDb || usersByAddressIdDb.length === 0) throw new  NotFoundException('No users found associated with addressId: ' + addressId);
        const mappedUsersAddress = userAddressMapper.mapAddressUserList(usersByAddressIdDb);
        return new AddressUserListComponent(200, "succesfull", mappedUsersAddress);
    }
}

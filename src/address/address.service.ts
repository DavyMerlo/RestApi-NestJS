import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { addressMapper } from './mapper/address.mapper';
import { AddressComponent } from '../models/components/address.component';

@Injectable()
export class AddressService {

    constructor(
        private addressRepository: AddressRepository
    )
    {}

    async addresses(){
        const addressesDB = await this.addressRepository.addressesDB();
        if(!addressesDB || addressesDB.length === 0) throw new NotFoundException('No addresses found');
        const mappedAddresses = addressMapper.mapAddresses(addressesDB);
        return new AddressComponent(200, "succesfull", mappedAddresses);
    }

    async addressById(id: number){
        const addressDetail = await this.addressRepository.addressByIdDB(id);
        if(!addressDetail) throw new  NotFoundException('No address found with Id: ' + id);
        return addressDetail;
    }
}

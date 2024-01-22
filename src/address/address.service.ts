import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { addressMapper } from './mapper/address.mapper';
import { BaseComponent } from '../models/components/base.component';

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
        return new BaseComponent(200, "succesfull", {addresses: mappedAddresses});
    }

    async addressById(id: number){
        const addressDetail = await this.addressRepository.addressByIdDB(id);
        if(!addressDetail) throw new  NotFoundException('No address found with Id: ' + id);
        const mappedAddressDetails = addressMapper.mapAddressDetail(addressDetail);
        return new BaseComponent(200, "succesfull", {address: mappedAddressDetails});
    }

    async softDeleteAddress(id: number){
        await this.addressDetailMap(id);
        await this.addressRepository.softDeleteAddress(id);
        return new BaseComponent(200, "succesfull", {});
    }

    private async addressDetailMap(id: number){
        const addressDetail = await this.addressRepository.addressByIdDB(id);
        if(!addressDetail) throw new NotFoundException('No address found with ' + id);
        return addressMapper.mapAddressDetail(addressDetail);
    }
}

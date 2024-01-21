import { Module } from '@nestjs/common';
import { UserAddressController } from './user.address.controller';
import { UserAddressService } from './user.address.service';
import { UserAddressRepository } from './user.address.repository';

@Module({
  controllers: [UserAddressController],
  providers: [
    UserAddressService, 
    UserAddressRepository
  ]
})
export class UserAddressModule {
}

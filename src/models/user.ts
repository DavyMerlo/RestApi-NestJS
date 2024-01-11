import Data from "./data/data";
import { UserDto } from "../user/dto/user.dto";
import { UserAddress } from "./user.address";
import { UserOrder } from "./user.order";
import * as argon from 'argon2';

export class User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    userAddresses?: UserAddress[];
    userOrders?: UserOrder[];
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(dto: UserDto) {
      this.firstName = dto.firstName;
      this.lastName = dto.lastName;
      this.email = dto.email;
      this.hash = dto.hash;
    }
}

async function createUser(userData: UserDto[]): Promise<User[]> {
  const users: User[] = [];
  for (const data of userData) {
    const user = new User(data);
    user.hash = await argon.hash(user.hash);
    users.push(user);
  }
  return users;
}

export const usersPromise = createUser(Data.userData);
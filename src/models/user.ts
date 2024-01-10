import Data from "./data/data";
import { UserData } from "./types/user.data.type";
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
  
    constructor(userData: UserData) {
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.email = userData.email;
      this.hash = userData.hash;
    }
}

async function createUser(userData: UserData[]): Promise<User[]> {
  const users: User[] = [];
  for (const data of userData) {
    const user = new User(data);
    user.hash = await argon.hash(user.hash);
    users.push(user);
  }
  return users;
}

export const usersPromise = createUser(Data.userData);
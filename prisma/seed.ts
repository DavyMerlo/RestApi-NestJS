// import {db} from "../src/utils/db.server";
import { PrismaService } from '../src/prisma/prisma.service';
import {addresses} from "../src/models/address";
import {usersPromise} from "../src/models/user";
import {userAddresses} from "../src/models/user.address";
import {categories} from "../src/models/category";
import {subCategories} from "../src/models/sub.category";
import {products} from "../src/models/product";
import {orders} from "../src/models/order";
import {orderLines} from "../src/models/order.line";
import {userOrders} from "../src/models/user.order";

const db = new PrismaService();

async function seed() {

  const users = await usersPromise;
 
  await db.address.createMany({
    data: addresses,
  });
  
  await db.user.createMany({
    data: users,
  });
  
  await db.userAddress.createMany({
    data: userAddresses,
  });

  await db.category.createMany({
    data: categories,
  });
  
  await db.subCategory.createMany({
    data: subCategories,
  });

  await db.product.createMany({
    data: products,
  });

  await db.order.createMany({
    data: orders,
  });

  await db.orderLine.createMany({
    data: orderLines,
  });

  await db.userOrder.createMany({
    data: userOrders,
  });

  console.log('Database seeded');
}

seed()
  .catch((error) => {
    console.error('Somethings goes wrong with seeding the database', error);
    process.exit(1);
});
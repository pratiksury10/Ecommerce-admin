import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sku!: string;

  @Column()
  name!: string;

  @Column("decimal")
  price!: number;

  @Column("text", { array: true, nullable: true })
  images!: string[];
}


// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// import "reflect-metadata"; // Ensure this is imported

// @Entity()
// export class Product {
//   @PrimaryGeneratedColumn()
//   id!: number; // Fix: "!" tells TypeScript that TypeORM will handle initialization

//   @Column()
//   sku!: string;

//   @Column()
//   name!: string;

//   @Column("decimal")
//   price!: number;

//   @Column("text", { array: true, nullable: true })
//   images!: string[];

//   constructor(sku: string, name: string, price: number, images: string[]) {
//     this.sku = sku;
//     this.name = name;
//     this.price = price;
//     this.images = images;
//   }
// }

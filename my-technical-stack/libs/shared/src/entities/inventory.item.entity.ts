import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "inventoryItem"
})
export class InventoryItem {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column()
    description: string;

    @AutoMap()
    @Column()
    powerlevel: number;
}
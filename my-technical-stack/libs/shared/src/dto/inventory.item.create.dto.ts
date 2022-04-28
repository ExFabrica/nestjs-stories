import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class InventoryItemCreateDTO {
    @ApiProperty()
    @AutoMap()
    name:string;

    @ApiProperty()
    @AutoMap()
    description:string;

    @ApiProperty()
    @AutoMap()
    powerlevel:number;
}
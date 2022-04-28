import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class InventoryItemReadDTO {
    @ApiProperty()
    @AutoMap()
    id:number;
    
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
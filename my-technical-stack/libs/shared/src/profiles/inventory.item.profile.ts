/* istanbul ignore file */
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { InventoryItem } from "../entities/inventory.item.entity";
import { InventoryItemCreateDTO } from "../dto/inventory.item.create.dto";
import { InventoryItemReadDTO } from "../dto/inventory.item.read.dto";
import { InventoryItemUpdateDTO } from "../dto/inventory.item.update";

@Injectable()
export class InventoryItemProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, InventoryItem, InventoryItemReadDTO);
      createMap(mapper, InventoryItemCreateDTO, InventoryItem, forMember((dest) => dest.id, ignore()));
      createMap(mapper, InventoryItemUpdateDTO, InventoryItem);
    };
  }
}

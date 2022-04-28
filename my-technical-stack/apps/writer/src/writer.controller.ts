import { InventoryItemCreateDTO } from '@app/shared/dto/inventory.item.create.dto';
import { InventoryItemReadDTO } from '@app/shared/dto/inventory.item.read.dto';
import { InventoryItemUpdateDTO } from '@app/shared/dto/inventory.item.update';
import { InventoryService } from '@app/shared/services/inventory/inventory.service';
import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Version } from '@nestjs/common';

@Controller("inventory")
export class WriterController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Version('1.0')
  @Post()
  async create(
    @Body() item: InventoryItemCreateDTO,
  ): Promise<InventoryItemReadDTO | undefined> {
    try {
      return this.inventoryService.create(item);
    } catch (err) {
      console.debug(err);
    }
  }

  @Version('1.0')
  @Put(":id")
  async update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() item: InventoryItemUpdateDTO,
  ): Promise<InventoryItemReadDTO | undefined> {
    try {
      return this.inventoryService.update(id, item);
    } catch (err) {
      console.debug(err);
    }
  }

  @Version('1.0')
  @Delete(":id")
  async delete(
    @Param("id") id: number
  ): Promise<boolean> {
    try {
      await this.inventoryService.remove(id);
      return true;
    } catch (err) {
      console.debug(err);
      return false;
    }
  }
}

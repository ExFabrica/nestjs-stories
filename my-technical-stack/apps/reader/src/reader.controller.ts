import { InventoryItemReadDTO } from '@app/shared/dto/inventory.item.read.dto';
import { InventoryService } from '@app/shared/services/inventory/inventory.service';
import { Controller, Get, Version } from '@nestjs/common';

@Controller("inventory")
export class ReaderController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Version('1.0')
  @Get()
  async findAll(): Promise<InventoryItemReadDTO[]> {
    return this.inventoryService.findAll();
  }
}

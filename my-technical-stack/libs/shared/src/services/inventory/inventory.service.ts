import { InventoryItemCreateDTO } from '@app/shared/dto/inventory.item.create.dto';
import { InventoryItemReadDTO } from '@app/shared/dto/inventory.item.read.dto';
import { InventoryItemUpdateDTO } from '@app/shared/dto/inventory.item.update';
import { InventoryItem } from '@app/shared/entities/inventory.item.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem) private inventoryItemRepository: Repository<InventoryItem>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) { }

  findAll = async (): Promise<InventoryItemReadDTO[]> => {
    try {
      return this.classMapper.mapArrayAsync(await this.inventoryItemRepository.find(), InventoryItem, InventoryItemReadDTO);
    }
    catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  };

  create = async (
    item: InventoryItemCreateDTO,
  ): Promise<InventoryItemReadDTO | undefined> => {
    try {
      const entity = this.classMapper.map(item, InventoryItemCreateDTO, InventoryItem);
      return this.classMapper.mapAsync(await this.inventoryItemRepository.save(entity), InventoryItem, InventoryItemReadDTO);
    }
    catch (ex) {
      throw new Error(`create error: ${ex.message}.`);
    }
  };

  update = async (
    id: number,
    item: InventoryItemUpdateDTO,
  ): Promise<InventoryItemReadDTO | undefined> => {
    if (!id)
      throw new Error(`update error: id is empty.`);
    try {
      item.id = id;
      const entity = this.classMapper.map(item, InventoryItemUpdateDTO, InventoryItem);
      return this.classMapper.mapAsync(await this.inventoryItemRepository.save(entity), InventoryItem, InventoryItemReadDTO);
    }
    catch (ex) {
      throw new Error(`Update error: ${ex.message}.`);
    }
  };

  remove = async (
    id: number,
  ): Promise<void> => {
    if (!id)
      throw new Error(`update error: id is empty.`);
    try {
      const inventoryItemFromDB = await this.inventoryItemRepository.findOne({
        where: {
          id: id
        }
      });
      if (!inventoryItemFromDB)
        throw new Error(`Error during remove, item not found => id: ${id}}`);
      await this.inventoryItemRepository.remove([inventoryItemFromDB]);
    }
    catch (ex) {
      throw new Error(`remove error: ${ex.message}.`);
    }
  };
}
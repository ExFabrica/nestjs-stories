import { InventoryItem } from '@app/shared/entities/inventory.item.entity';
import { InventoryItemProfile } from '@app/shared/profiles/inventory.item.profile';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let inventoryItemsRepository: Repository<InventoryItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        InventoryService,
        {
          provide: getRepositoryToken(InventoryItem),
          useClass: Repository,
        },
        InventoryItemProfile
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    inventoryItemsRepository = module.get<Repository<InventoryItem>>(getRepositoryToken(InventoryItem));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe("Method findAll", () => {
    it('it should return 2 items', async () => {
      jest.spyOn(inventoryItemsRepository, 'find').mockResolvedValueOnce(ITEMS);
      const result = await service.findAll();
      expect(result.length).toEqual(2);
    });
    it('it must generate an error, findAll return an error', async () => {
      jest.spyOn(inventoryItemsRepository, 'find').mockImplementation(() => { throw new Error('async error') });
      try {
        await service.findAll();
      }
      catch (err) {
        expect(err.message).toContain("findAll error: async error");
      }
    });
  });

  describe("Method Create", () => {
    it('it should create an item ', async () => {
      jest.spyOn(inventoryItemsRepository, 'save').mockResolvedValueOnce(
        {
          "id": 3,
          "name": "Elf Power Shield",
          "description": "This Shield from Elf tribe is resistant and light",
          "powerlevel": 40
        });
      const result = await service.create({
        "name": "Elf Power Shield",
        "description": "This Shield from Elf tribe is resistant and light",
        "powerlevel": 40
      });
      if (result && result[0]) {
        expect(result[0].id).toEqual(3);
        expect(result[0].name).toEqual("Elf Power Shield");
        expect(result[0].description).toEqual("This Shield from Elf tribe is resistant and light");
        expect(result[0].powerlevel).toEqual(40);
      }
    });

    it('it must generate an error, error during save process', async () => {
      jest.spyOn(inventoryItemsRepository, 'save').mockImplementation(() => { throw new Error('async error') });
      try {
        await service.create({
          "name": "Elf Power Shield",
          "description": "This Shield from Elf tribe is resistant and light",
          "powerlevel": 40
        });
      }
      catch (err) {
        expect(err.message).toEqual("create error: async error.");
      }
    });

  });
});

const ITEMS: InventoryItem[] = [
  {
    "id": 1,
    "name": "My First Item",
    "description": "The description of the first item",
    "powerlevel": 1
  },
  {
    "id": 2,
    "name": "Orc Power Shield",
    "description": "This Shield from ORC tribe is very resistant and heavy",
    "powerlevel": 30
  }
]
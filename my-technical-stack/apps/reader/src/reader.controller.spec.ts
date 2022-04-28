import { InventoryItem } from '@app/shared/entities/inventory.item.entity';
import { InventoryService } from '@app/shared/services/inventory/inventory.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ReaderController } from './reader.controller';

describe('ReaderController', () => {
  let readerController: ReaderController;
  let service: InventoryService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ReaderController],
      providers: [
        {
          provide: InventoryService,
          useFactory: () => ({
            findAll: jest.fn(() => Promise.resolve(ITEMS))
          })
        }],
    }).compile();

    readerController = app.get<ReaderController>(ReaderController);
    service = app.get<InventoryService>(InventoryService);
  });

  describe("Api findAll", () => {
    it("it calling findAll method", async () => {
      const items: InventoryItem[] = await readerController.findAll();
      expect(items).toBeDefined();
      expect(items.length).toEqual(2);
    })

    it("if calling findAll and receive a specific error", async () => {
      jest.spyOn(readerController, 'findAll').mockImplementation(() => { throw new Error('async error') });
      try {
        await readerController.findAll();
      }
      catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toEqual("async error");
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

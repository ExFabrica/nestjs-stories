import { InventoryItemCreateDTO } from '@app/shared/dto/inventory.item.create.dto';
import { InventoryItem } from '@app/shared/entities/inventory.item.entity';
import { InventoryService } from '@app/shared/services/inventory/inventory.service';
import { Test, TestingModule } from '@nestjs/testing';
import { WriterController } from './writer.controller';

describe('WriterController', () => {
  let writerController: WriterController;
  let service: InventoryService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WriterController],
      providers: [
        {
          provide: InventoryService,
          useFactory: () => ({
            create: jest.fn(() => Promise.resolve(ITEMS[1]))
          })
        }
      ],
    }).compile();

    writerController = app.get<WriterController>(WriterController);
    service = app.get<InventoryService>(InventoryService);
  });

  describe("Api findAll", () => {
    it("it calling findAll method", async () => {
      const item: InventoryItemCreateDTO = await writerController.create({
        "name": "Orc Power Shield",
        "description": "This Shield from ORC tribe is very resistant and heavy",
        "powerlevel": 30
      });
      expect(item.name).toEqual("Orc Power Shield");
      expect(item.description).toEqual("This Shield from ORC tribe is very resistant and heavy");
      expect(item.powerlevel).toEqual(30);
    })

    it("if calling findAll and receive a specific error", async () => {
      jest.spyOn(writerController, 'create').mockImplementation(() => { throw new Error('async error') });
      try {
        await writerController.create({
          "name": "Orc Power Shield",
          "description": "This Shield from ORC tribe is very resistant and heavy",
          "powerlevel": 30
        });
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

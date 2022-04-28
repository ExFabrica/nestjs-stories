import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from './entities/inventory.item.entity';
import { InventoryItemProfile } from './profiles/inventory.item.profile';
import { InventoryService } from './services/inventory/inventory.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:
        process.env.NODE_ENV === "test"
          ? (configService: ConfigService) => ({
            type: "sqlite",
            database: configService.get("DATABASE_NAME_FOR_TEST"),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
          })
          : async (configService: ConfigService) => {
            return {
              type: "sqlite",
              database: configService.get("DATABASE_NAME_FOR_DEV"),
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              migrations: [__dirname + "/libs/shared/src/db-migrations/*{.ts,.js}"],
              synchronize: true,
            }
          },
    }),
    TypeOrmModule.forFeature([InventoryItem]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [InventoryService, InventoryItemProfile],
  exports: [InventoryService],
})
export class SharedModule { }
import { DependenteController } from "./dependente.controller";
import { DependenteService } from "./dependente.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@org/prisma";

@Module({
      imports: [PrismaModule], 
      controllers: [DependenteController],
      providers: [DependenteService],
    })
export class DependenteModule {
}

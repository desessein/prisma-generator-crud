import { DependenteParentescoController } from "./dependenteparentesco.controller";
import { DependenteParentescoService } from "./dependenteparentesco.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@org/prisma";

@Module({
      imports: [PrismaModule], 
      controllers: [DependenteParentescoController],
      providers: [DependenteParentescoService],
    })
export class DependenteParentescoModule {
}

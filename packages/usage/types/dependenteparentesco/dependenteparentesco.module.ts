import { DependenteParentescoController } from "./dependenteparentesco.controller";
import { DependenteParentescoService } from "./dependenteparentesco.service";
import { Module } from "@nestjs/common";

@Module({
      controllers: [DependenteParentescoController],
      providers: [DependenteParentescoService],
    })
export class DependenteParentescoModule {
}

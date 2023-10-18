import { DependenteController } from "./dependente.controller";
import { DependenteService } from "./dependente.service";
import { Module } from "@nestjs/common";

@Module({
      controllers: [DependenteController],
      providers: [DependenteService],
    })
export class DependenteModule {
}

import { DependenteCondicaoController } from "./dependentecondicao.controller";
import { DependenteCondicaoService } from "./dependentecondicao.service";
import { Module } from "@nestjs/common";

@Module({
      controllers: [DependenteCondicaoController],
      providers: [DependenteCondicaoService],
    })
export class DependenteCondicaoModule {
}

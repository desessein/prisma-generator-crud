import { DependenteCondicaoController } from "./dependentecondicao.controller";
import { DependenteCondicaoService } from "./dependentecondicao.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@org/prisma";

@Module({
      imports: [PrismaModule], 
      controllers: [DependenteCondicaoController],
      providers: [DependenteCondicaoService],
    })
export class DependenteCondicaoModule {
}

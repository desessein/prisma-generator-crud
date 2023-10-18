import { PessoaController } from "./pessoa.controller";
import { PessoaService } from "./pessoa.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@org/prisma";

@Module({
      imports: [PrismaModule], 
      controllers: [PessoaController],
      providers: [PessoaService],
    })
export class PessoaModule {
}

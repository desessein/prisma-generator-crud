import { PaginationModel } from "@prisma-utils/nestjs-prisma";
import { Pessoa } from "@org/prisma";

export class CreatePessoaResponse {
    response!: Pessoa;
}

export class ListPessoaResponse {
    response!: PaginationModel<Pessoa>;
}

export class DeletePessoaResponse {
    response!: void;
}

export class UpdatePessoaResponse {
    response!: Pessoa;
}

export class GetPessoaResponse {
    response!: Pessoa;
}

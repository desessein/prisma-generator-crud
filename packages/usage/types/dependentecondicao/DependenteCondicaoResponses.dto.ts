import { PaginationModel } from "@prisma-utils/nestjs-prisma";
import { DependenteCondicao } from "@org/prisma";

export class CreateDependenteCondicaoResponse {
    response!: DependenteCondicao;
}

export class ListDependenteCondicaoResponse {
    response!: PaginationModel<DependenteCondicao>;
}

export class DeleteDependenteCondicaoResponse {
    response!: void;
}

export class UpdateDependenteCondicaoResponse {
    response!: DependenteCondicao;
}

export class GetDependenteCondicaoResponse {
    response!: DependenteCondicao;
}

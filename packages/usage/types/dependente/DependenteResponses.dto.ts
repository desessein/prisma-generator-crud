import { PaginationModel } from "@prisma-utils/nestjs-prisma";
import { Dependente } from "@org/prisma";

export class CreateDependenteResponse {
    response!: Dependente;
}

export class ListDependenteResponse {
    response!: PaginationModel<Dependente>;
}

export class DeleteDependenteResponse {
    response!: void;
}

export class UpdateDependenteResponse {
    response!: Dependente;
}

export class GetDependenteResponse {
    response!: Dependente;
}

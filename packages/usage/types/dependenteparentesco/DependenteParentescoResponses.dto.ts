import { PaginationModel } from "@prisma-utils/nestjs-prisma";
import { DependenteParentesco } from "@org/prisma";

export class CreateDependenteParentescoResponse {
    response!: DependenteParentesco;
}

export class ListDependenteParentescoResponse {
    response!: PaginationModel<DependenteParentesco>;
}

export class DeleteDependenteParentescoResponse {
    response!: void;
}

export class UpdateDependenteParentescoResponse {
    response!: DependenteParentesco;
}

export class GetDependenteParentescoResponse {
    response!: DependenteParentesco;
}

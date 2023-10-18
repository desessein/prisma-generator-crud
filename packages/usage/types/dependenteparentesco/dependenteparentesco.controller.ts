import { DependenteParentescoService } from "./dependenteparentesco.service";
import { CreateDependenteParentesco, CreateDependenteParentescoResponse, CreateDependenteParentescoIdentifier, GetDependenteParentesco, GetDependenteParentescoResponse, GetDependenteParentescoIdentifier, ListDependenteParentesco, ListDependenteParentescoResponse, ListDependenteParentescoIdentifier, DeleteDependenteParentesco, DeleteDependenteParentescoResponse, DeleteDependenteParentescoIdentifier, UpdateDependenteParentesco, UpdateDependenteParentescoResponse, UpdateDependenteParentescoIdentifier } from "@org/clients";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class DependenteParentescoController {
    constructor(private service: DependenteParentescoService) {
    }

    @MessagePattern(CreateDependenteParentescoIdentifier)
    create(input: CreateDependenteParentesco): Promise<CreateDependenteParentescoResponse> {
        return this.service.create(input);
    }

    @MessagePattern(GetDependenteParentescoIdentifier)
    get(input: GetDependenteParentesco): Promise<GetDependenteParentescoResponse> {
        return this.service.get(input);
    }

    @MessagePattern(ListDependenteParentescoIdentifier)
    list(input: ListDependenteParentesco): Promise<ListDependenteParentescoResponse> {
        return this.service.list(input);
    }

    @MessagePattern(UpdateDependenteParentescoIdentifier)
    update(input: UpdateDependenteParentesco): Promise<UpdateDependenteParentescoResponse> {
        return this.service.update(input);
    }

    @MessagePattern(DeleteDependenteParentescoIdentifier)
    delete(input: DeleteDependenteParentesco): Promise<DeleteDependenteParentescoResponse> {
        return this.service.delete(input);
    }
}

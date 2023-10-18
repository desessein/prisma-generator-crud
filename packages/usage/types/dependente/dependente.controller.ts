import { DependenteService } from "./dependente.service";
import { CreateDependente, CreateDependenteResponse, CreateDependenteIdentifier, GetDependente, GetDependenteResponse, GetDependenteIdentifier, ListDependente, ListDependenteResponse, ListDependenteIdentifier, DeleteDependente, DeleteDependenteResponse, DeleteDependenteIdentifier, UpdateDependente, UpdateDependenteResponse, UpdateDependenteIdentifier } from "@org/clients";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class DependenteController {
    constructor(private service: DependenteService) {
    }

    @MessagePattern(CreateDependenteIdentifier)
    create(input: CreateDependente): Promise<CreateDependenteResponse> {
        return this.service.create(input);
    }

    @MessagePattern(GetDependenteIdentifier)
    get(input: GetDependente): Promise<GetDependenteResponse> {
        return this.service.get(input);
    }

    @MessagePattern(ListDependenteIdentifier)
    list(input: ListDependente): Promise<ListDependenteResponse> {
        return this.service.list(input);
    }

    @MessagePattern(UpdateDependenteIdentifier)
    update(input: UpdateDependente): Promise<UpdateDependenteResponse> {
        return this.service.update(input);
    }

    @MessagePattern(DeleteDependenteIdentifier)
    delete(input: DeleteDependente): Promise<DeleteDependenteResponse> {
        return this.service.delete(input);
    }
}

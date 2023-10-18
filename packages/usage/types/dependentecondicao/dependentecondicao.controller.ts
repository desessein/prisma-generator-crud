import { DependenteCondicaoService } from "./dependentecondicao.service";
import { CreateDependenteCondicao, CreateDependenteCondicaoResponse, CreateDependenteCondicaoIdentifier, GetDependenteCondicao, GetDependenteCondicaoResponse, GetDependenteCondicaoIdentifier, ListDependenteCondicao, ListDependenteCondicaoResponse, ListDependenteCondicaoIdentifier, DeleteDependenteCondicao, DeleteDependenteCondicaoResponse, DeleteDependenteCondicaoIdentifier, UpdateDependenteCondicao, UpdateDependenteCondicaoResponse, UpdateDependenteCondicaoIdentifier } from "@org/clients";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class DependenteCondicaoController {
    constructor(private service: DependenteCondicaoService) {
    }

    @MessagePattern(CreateDependenteCondicaoIdentifier)
    create(input: CreateDependenteCondicao): Promise<CreateDependenteCondicaoResponse> {
        return this.service.create(input);
    }

    @MessagePattern(GetDependenteCondicaoIdentifier)
    get(input: GetDependenteCondicao): Promise<GetDependenteCondicaoResponse> {
        return this.service.get(input);
    }

    @MessagePattern(ListDependenteCondicaoIdentifier)
    list(input: ListDependenteCondicao): Promise<ListDependenteCondicaoResponse> {
        return this.service.list(input);
    }

    @MessagePattern(UpdateDependenteCondicaoIdentifier)
    update(input: UpdateDependenteCondicao): Promise<UpdateDependenteCondicaoResponse> {
        return this.service.update(input);
    }

    @MessagePattern(DeleteDependenteCondicaoIdentifier)
    delete(input: DeleteDependenteCondicao): Promise<DeleteDependenteCondicaoResponse> {
        return this.service.delete(input);
    }
}

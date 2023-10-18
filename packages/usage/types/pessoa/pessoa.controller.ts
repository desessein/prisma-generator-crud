import { PessoaService } from "./pessoa.service";
import { CreatePessoa, CreatePessoaResponse, CreatePessoaIdentifier, GetPessoa, GetPessoaResponse, GetPessoaIdentifier, ListPessoa, ListPessoaResponse, ListPessoaIdentifier, DeletePessoa, DeletePessoaResponse, DeletePessoaIdentifier, UpdatePessoa, UpdatePessoaResponse, UpdatePessoaIdentifier } from "@org/clients";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class PessoaController {
    constructor(private service: PessoaService) {
    }

    @MessagePattern(CreatePessoaIdentifier)
    create(input: CreatePessoa): Promise<CreatePessoaResponse> {
        return this.service.create(input);
    }

    @MessagePattern(GetPessoaIdentifier)
    get(input: GetPessoa): Promise<GetPessoaResponse> {
        return this.service.get(input);
    }

    @MessagePattern(ListPessoaIdentifier)
    list(input: ListPessoa): Promise<ListPessoaResponse> {
        return this.service.list(input);
    }

    @MessagePattern(UpdatePessoaIdentifier)
    update(input: UpdatePessoa): Promise<UpdatePessoaResponse> {
        return this.service.update(input);
    }

    @MessagePattern(DeletePessoaIdentifier)
    delete(input: DeletePessoa): Promise<DeletePessoaResponse> {
        return this.service.delete(input);
    }
}

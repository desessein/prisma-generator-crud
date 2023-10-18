import { CreatePessoa, CreatePessoaResponse, CreatePessoaIdentifier, GetPessoa, GetPessoaResponse, GetPessoaIdentifier, ListPessoa, ListPessoaResponse, ListPessoaIdentifier, DeletePessoa, DeletePessoaResponse, DeletePessoaIdentifier, UpdatePessoa, UpdatePessoaResponse, UpdatePessoaIdentifier } from "@org/clients";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

export class PessoaClientProxy {
    private client: ClientProxy;

    constructor(client: ClientProxy) {
        this.client = client;
    }

    create(input: CreatePessoa): Observable<CreatePessoaResponse> {
        return this.client.send<CreatePessoaResponse, CreatePessoa>(CreatePessoaIdentifier, input);
    }

    get(input: GetPessoa): Observable<GetPessoaResponse> {
        return this.client.send<GetPessoaResponse, GetPessoa>(GetPessoaIdentifier, input);
    }

    list(input: ListPessoa): Observable<ListPessoaResponse> {
        return this.client.send<ListPessoaResponse, ListPessoa>(ListPessoaIdentifier, input);
    }

    update(input: UpdatePessoa): Observable<UpdatePessoaResponse> {
        return this.client.send<UpdatePessoaResponse, UpdatePessoa>(UpdatePessoaIdentifier, input);
    }

    delete(input: DeletePessoa): Observable<DeletePessoaResponse> {
        return this.client.send<DeletePessoaResponse, DeletePessoa>(DeletePessoaIdentifier, input);
    }
}

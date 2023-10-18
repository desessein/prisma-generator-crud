import { CreateDependenteCondicao, CreateDependenteCondicaoResponse, CreateDependenteCondicaoIdentifier, GetDependenteCondicao, GetDependenteCondicaoResponse, GetDependenteCondicaoIdentifier, ListDependenteCondicao, ListDependenteCondicaoResponse, ListDependenteCondicaoIdentifier, DeleteDependenteCondicao, DeleteDependenteCondicaoResponse, DeleteDependenteCondicaoIdentifier, UpdateDependenteCondicao, UpdateDependenteCondicaoResponse, UpdateDependenteCondicaoIdentifier } from "@org/clients";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

class DependenteCondicaoClientProxy {
    private client: ClientProxy;

    constructor(client: ClientProxy) {
        this.client = client;
    }

    create(input: CreateDependenteCondicao): Observable<CreateDependenteCondicaoResponse> {
        return this.client.send<CreateDependenteCondicaoResponse, CreateDependenteCondicao>(CreateDependenteCondicaoIdentifier, input);
    }

    get(input: GetDependenteCondicao): Observable<GetDependenteCondicaoResponse> {
        return this.client.send<GetDependenteCondicaoResponse, GetDependenteCondicao>(GetDependenteCondicaoIdentifier, input);
    }

    list(input: ListDependenteCondicao): Observable<ListDependenteCondicaoResponse> {
        return this.client.send<ListDependenteCondicaoResponse, ListDependenteCondicao>(ListDependenteCondicaoIdentifier, input);
    }

    update(input: UpdateDependenteCondicao): Observable<UpdateDependenteCondicaoResponse> {
        return this.client.send<UpdateDependenteCondicaoResponse, UpdateDependenteCondicao>(UpdateDependenteCondicaoIdentifier, input);
    }

    delete(input: DeleteDependenteCondicao): Observable<DeleteDependenteCondicaoResponse> {
        return this.client.send<DeleteDependenteCondicaoResponse, DeleteDependenteCondicao>(DeleteDependenteCondicaoIdentifier, input);
    }
}

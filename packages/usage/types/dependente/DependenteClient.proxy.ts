import { CreateDependente, CreateDependenteResponse, CreateDependenteIdentifier, GetDependente, GetDependenteResponse, GetDependenteIdentifier, ListDependente, ListDependenteResponse, ListDependenteIdentifier, DeleteDependente, DeleteDependenteResponse, DeleteDependenteIdentifier, UpdateDependente, UpdateDependenteResponse, UpdateDependenteIdentifier } from "@org/clients";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

class DependenteClientProxy {
    private client: ClientProxy;

    constructor(client: ClientProxy) {
        this.client = client;
    }

    create(input: CreateDependente): Observable<CreateDependenteResponse> {
        return this.client.send<CreateDependenteResponse, CreateDependente>(CreateDependenteIdentifier, input);
    }

    get(input: GetDependente): Observable<GetDependenteResponse> {
        return this.client.send<GetDependenteResponse, GetDependente>(GetDependenteIdentifier, input);
    }

    list(input: ListDependente): Observable<ListDependenteResponse> {
        return this.client.send<ListDependenteResponse, ListDependente>(ListDependenteIdentifier, input);
    }

    update(input: UpdateDependente): Observable<UpdateDependenteResponse> {
        return this.client.send<UpdateDependenteResponse, UpdateDependente>(UpdateDependenteIdentifier, input);
    }

    delete(input: DeleteDependente): Observable<DeleteDependenteResponse> {
        return this.client.send<DeleteDependenteResponse, DeleteDependente>(DeleteDependenteIdentifier, input);
    }
}

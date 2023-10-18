import { CreateDependenteParentesco, CreateDependenteParentescoResponse, CreateDependenteParentescoIdentifier, GetDependenteParentesco, GetDependenteParentescoResponse, GetDependenteParentescoIdentifier, ListDependenteParentesco, ListDependenteParentescoResponse, ListDependenteParentescoIdentifier, DeleteDependenteParentesco, DeleteDependenteParentescoResponse, DeleteDependenteParentescoIdentifier, UpdateDependenteParentesco, UpdateDependenteParentescoResponse, UpdateDependenteParentescoIdentifier } from "@org/clients";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

export class DependenteParentescoClientProxy {
    private client: ClientProxy;

    constructor(client: ClientProxy) {
        this.client = client;
    }

    create(input: CreateDependenteParentesco): Observable<CreateDependenteParentescoResponse> {
        return this.client.send<CreateDependenteParentescoResponse, CreateDependenteParentesco>(CreateDependenteParentescoIdentifier, input);
    }

    get(input: GetDependenteParentesco): Observable<GetDependenteParentescoResponse> {
        return this.client.send<GetDependenteParentescoResponse, GetDependenteParentesco>(GetDependenteParentescoIdentifier, input);
    }

    list(input: ListDependenteParentesco): Observable<ListDependenteParentescoResponse> {
        return this.client.send<ListDependenteParentescoResponse, ListDependenteParentesco>(ListDependenteParentescoIdentifier, input);
    }

    update(input: UpdateDependenteParentesco): Observable<UpdateDependenteParentescoResponse> {
        return this.client.send<UpdateDependenteParentescoResponse, UpdateDependenteParentesco>(UpdateDependenteParentescoIdentifier, input);
    }

    delete(input: DeleteDependenteParentesco): Observable<DeleteDependenteParentescoResponse> {
        return this.client.send<DeleteDependenteParentescoResponse, DeleteDependenteParentesco>(DeleteDependenteParentescoIdentifier, input);
    }
}

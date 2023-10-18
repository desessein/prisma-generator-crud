import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { DependenteCondicaoClientProxy, CreateDependenteCondicao, CreateDependenteCondicaoResponse, GetDependenteCondicao, GetDependenteCondicaoResponse, ListDependenteCondicao, ListDependenteCondicaoResponse, DeleteDependenteCondicao, DeleteDependenteCondicaoResponse, UpdateDependenteCondicao, UpdateDependenteCondicaoResponse } from "@org/clients";

@Controller('dependentecondicao')
@ApiTags('dependentecondicao')
export class DependenteCondicaoController {
    constructor(private readonly proxy: DependenteCondicaoClientProxy) {
    }

    @Post('list')
    async list(@Body body: ListDependenteCondicao): Promise<ListDependenteCondicaoResponse> {
        return firstValueFrom(this.proxy.list(body as ListDependenteCondicao));
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<GetDependenteCondicaoResponse> {
        return firstValueFrom(this.proxy.get({ id } as GetDependenteCondicao));
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body body: UpdateDependenteCondicao): Promise<UpdateDependenteCondicaoResponse> {
        return firstValueFrom(this.proxy.update({ id, ...body } as UpdateDependenteCondicao));
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteDependenteCondicaoResponse> {
        return firstValueFrom(this.proxy.delete({ id } as DeleteDependenteCondicao));
    }

    @Post('')
    async create(@Body body: CreateDependenteCondicao): Promise<CreateDependenteCondicaoResponse> {
        return firstValueFrom(this.proxy.create(body as CreateDependenteCondicao));
    }
}

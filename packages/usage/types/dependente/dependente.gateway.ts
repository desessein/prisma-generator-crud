import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { DependenteClientProxy, CreateDependente, CreateDependenteResponse, GetDependente, GetDependenteResponse, ListDependente, ListDependenteResponse, DeleteDependente, DeleteDependenteResponse, UpdateDependente, UpdateDependenteResponse } from "@org/clients";

@Controller('dependente')
@ApiTags('dependente')
export class DependenteController {
    constructor(private readonly proxy: DependenteClientProxy) {
    }

    @Post('list')
    async list(@Body() body: ListDependente): Promise<ListDependenteResponse> {
        return firstValueFrom(this.proxy.list(body as ListDependente));
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<GetDependenteResponse> {
        return firstValueFrom(this.proxy.get({ id } as GetDependente));
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UpdateDependente): Promise<UpdateDependenteResponse> {
        return firstValueFrom(this.proxy.update({ id, ...body } as UpdateDependente));
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteDependenteResponse> {
        return firstValueFrom(this.proxy.delete({ id } as DeleteDependente));
    }

    @Post('')
    async create(@Body() body: CreateDependente): Promise<CreateDependenteResponse> {
        return firstValueFrom(this.proxy.create(body as CreateDependente));
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { DependenteParentescoClientProxy, CreateDependenteParentesco, CreateDependenteParentescoResponse, GetDependenteParentesco, GetDependenteParentescoResponse, ListDependenteParentesco, ListDependenteParentescoResponse, DeleteDependenteParentesco, DeleteDependenteParentescoResponse, UpdateDependenteParentesco, UpdateDependenteParentescoResponse } from "@org/clients";

@Controller('dependenteparentesco')
@ApiTags('dependenteparentesco')
export class DependenteParentescoController {
    constructor(private readonly proxy: DependenteParentescoClientProxy) {
    }

    @Post('list')
    async list(@Body() body: ListDependenteParentesco): Promise<ListDependenteParentescoResponse> {
        return firstValueFrom(this.proxy.list(body as ListDependenteParentesco));
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<GetDependenteParentescoResponse> {
        return firstValueFrom(this.proxy.get({ id } as GetDependenteParentesco));
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UpdateDependenteParentesco): Promise<UpdateDependenteParentescoResponse> {
        return firstValueFrom(this.proxy.update({ id, ...body } as UpdateDependenteParentesco));
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteDependenteParentescoResponse> {
        return firstValueFrom(this.proxy.delete({ id } as DeleteDependenteParentesco));
    }

    @Post('')
    async create(@Body() body: CreateDependenteParentesco): Promise<CreateDependenteParentescoResponse> {
        return firstValueFrom(this.proxy.create(body as CreateDependenteParentesco));
    }
}

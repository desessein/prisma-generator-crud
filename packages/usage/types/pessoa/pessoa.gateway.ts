import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { PessoaClientProxy, CreatePessoa, CreatePessoaResponse, GetPessoa, GetPessoaResponse, ListPessoa, ListPessoaResponse, DeletePessoa, DeletePessoaResponse, UpdatePessoa, UpdatePessoaResponse } from "@org/clients";

@Controller('pessoa')
@ApiTags('pessoa')
export class PessoaController {
    constructor(private readonly proxy: PessoaClientProxy) {
    }

    @Post('list')
    async list(@Body body: ListPessoa): Promise<ListPessoaResponse> {
        return firstValueFrom(this.proxy.list(body as ListPessoa));
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<GetPessoaResponse> {
        return firstValueFrom(this.proxy.get({ id } as GetPessoa));
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body body: UpdatePessoa): Promise<UpdatePessoaResponse> {
        return firstValueFrom(this.proxy.update({ id, ...body } as UpdatePessoa));
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeletePessoaResponse> {
        return firstValueFrom(this.proxy.delete({ id } as DeletePessoa));
    }

    @Post('')
    async create(@Body body: CreatePessoa): Promise<CreatePessoaResponse> {
        return firstValueFrom(this.proxy.create(body as CreatePessoa));
    }
}

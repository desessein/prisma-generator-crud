import { Injectable } from "@nestjs/common";
import { PrismaService } from "@org/prisma";
import { ApiError, CreatePessoa, CreatePessoaResponse, GetPessoa, GetPessoaResponse, ListPessoa, ListPessoaResponse, DeletePessoa, DeletePessoaResponse, UpdatePessoa, UpdatePessoaResponse } from "@org/clients";

@Injectable()
export class PessoaService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(data: CreatePessoa): Promise<CreatePessoaResponse> {

                    try {
                        const result = await this.prismaService.pessoa.create({ data: {
                            nome: data.nome,
        dataNasc: data.dataNasc,
        nomeMae: data.nomeMae,
        nomePai: data.nomePai,
        sexo: data.sexo,
        estadoCivil: data.estadoCivil,
                            
                dependente: data.dependenteIds ? {
                    connect: data.dependenteIds.map(id => ({ id })),
                } : undefined
            ,

                dependenteTitular: data.dependenteTitularIds ? {
                    connect: data.dependenteTitularIds.map(id => ({ id })),
                } : undefined
            
                        } 
                      });
                      
                      return {
                        response: result
                      };
                    } catch (e) {
                        throw new ApiError({
                            errors: [],
                            statusCode: 500,
                            msg: e.message
                        });
                    }
                
    }

    async get(data: GetPessoa): Promise<GetPessoaResponse> {

                    try {
                      const result = await this.prismaService.pessoa.findUniqueOrThrow({
                        where: { id: data.id },
                      })
                  
                      return {
                        response: result
                      }
                    } catch (e) {
                      throw new ApiError({
                        errors: [],
                        statusCode: 500,
                        msg: e.message,
                      })
                    }
                
    }

    async list(data: ListPessoa): Promise<ListPessoaResponse> {

                        try {
                          const [items, count] = await this.prismaService.$transaction([
                            this.prismaService.pessoa.findMany({
                                where: {
                                    nome: data.nome,
        dataNasc: data.dataNasc,
        nomeMae: data.nomeMae,
        nomePai: data.nomePai,
        sexo: data.sexo,
        estadoCivil: data.estadoCivil
                                },
                                include: {
                                  dependente: data.dependenteInclude,
        dependenteTitular: data.dependenteTitularInclude
                                },
                                take: data?.take,
                                skip: data?.skip,
                            }),
                            this.prismaService.pessoa.count({ where: {
                                nome: data.nome,
        dataNasc: data.dataNasc,
        nomeMae: data.nomeMae,
        nomePai: data.nomePai,
        sexo: data.sexo,
        estadoCivil: data.estadoCivil
                            } }),
                          ])
                    
                          const take = data?.take ? data?.take : count
                          const skip = data?.skip ? data?.skip : 0
                    
                          return {
                            response: {
                              items: items,
                              meta: {
                                totalItems: count,
                                items: items.length,
                                totalPages: Math.ceil(count / take),
                                page: skip / take + 1,
                              },
                            }
                          }
                        } catch (e) {
                            throw new ApiError({
                                errors: [],
                                statusCode: 500,
                                msg: e.message,
                              })
                        }
                
    }

    async delete(data: DeletePessoa): Promise<DeletePessoaResponse> {

                    try {
                      await this.prismaService.pessoa.delete({
                        where: { id: data.id },
                      })

                      return {
                        response: null,
                      }
                    } catch (e) {
                      throw new ApiError({
                        errors: [],
                        statusCode: 500,
                        msg: e.message,
                      })
                    }
                
    }

    async update(data: UpdatePessoa): Promise<UpdatePessoaResponse> {

                    try {
                        const result = await this.prismaService.pessoa.update({ 
                            where: { id: data.id },
                            data: {
                                nome: data.nome,
        dataNasc: data.dataNasc,
        nomeMae: data.nomeMae,
        nomePai: data.nomePai,
        sexo: data.sexo,
        estadoCivil: data.estadoCivil,
                                
                dependente: data.dependenteIds ? {
                    connect: data.dependenteIds.map(id => ({ id })),
                } : undefined
            ,

                dependenteTitular: data.dependenteTitularIds ? {
                    connect: data.dependenteTitularIds.map(id => ({ id })),
                } : undefined
            
                            } 
                      });
                      
                      return {
                        response: result,
                      };
                    } catch (e) {
                        throw new ApiError({
                            errors: [],
                            statusCode: 500,
                            msg: e.message
                        });
                    }
                
    }
}

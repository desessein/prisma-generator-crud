import { Injectable } from "@nestjs/common";
import { PrismaService } from "@org/prisma";
import { ApiError, CreateDependenteCondicao, CreateDependenteCondicaoResponse, GetDependenteCondicao, GetDependenteCondicaoResponse, ListDependenteCondicao, ListDependenteCondicaoResponse, DeleteDependenteCondicao, DeleteDependenteCondicaoResponse, UpdateDependenteCondicao, UpdateDependenteCondicaoResponse } from "@org/clients";

@Injectable()
export class DependenteCondicaoService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(data: CreateDependenteCondicao): Promise<CreateDependenteCondicaoResponse> {

                    try {
                        const result = await this.prismaService.dependenteCondicao.create({ data: {
                            valor: data.valor,
        label: data.label,
                            
                dependente: data.dependenteIds ? {
                    connect: data.dependenteIds.map(id => ({ id })),
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

    async get(data: GetDependenteCondicao): Promise<GetDependenteCondicaoResponse> {

                    try {
                      const result = await this.prismaService.dependenteCondicao.findUniqueOrThrow({
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

    async list(data: ListDependenteCondicao): Promise<ListDependenteCondicaoResponse> {

                        try {
                          const [items, count] = await this.prismaService.$transaction([
                            this.prismaService.dependenteCondicao.findMany({
                                where: {
                                    valor: data.valor,
        label: data.label
                                },
                                include: {
                                  dependente: data.dependenteInclude
                                },
                                take: data?.take,
                                skip: data?.skip,
                            }),
                            this.prismaService.dependenteCondicao.count({ where: {
                                valor: data.valor,
        label: data.label
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

    async delete(data: DeleteDependenteCondicao): Promise<DeleteDependenteCondicaoResponse> {

                    try {
                      await this.prismaService.dependenteCondicao.delete({
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

    async update(data: UpdateDependenteCondicao): Promise<UpdateDependenteCondicaoResponse> {

                    try {
                        const result = await this.prismaService.dependenteCondicao.update({ 
                            where: { id: data.id },
                            data: {
                                valor: data.valor,
        label: data.label,
                                
                dependente: data.dependenteIds ? {
                    connect: data.dependenteIds.map(id => ({ id })),
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

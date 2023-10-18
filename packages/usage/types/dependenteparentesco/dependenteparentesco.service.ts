import { Injectable } from "@nestjs/common";
import { PrismaService } from "@org/prisma";
import { ApiError, CreateDependenteParentesco, CreateDependenteParentescoResponse, GetDependenteParentesco, GetDependenteParentescoResponse, ListDependenteParentesco, ListDependenteParentescoResponse, DeleteDependenteParentesco, DeleteDependenteParentescoResponse, UpdateDependenteParentesco, UpdateDependenteParentescoResponse } from "@org/clients";

@Injectable()
export class DependenteParentescoService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(data: CreateDependenteParentesco): Promise<CreateDependenteParentescoResponse> {

                    try {
                        const result = await this.prismaService.dependenteParentesco.create({ data: {
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

    async get(data: GetDependenteParentesco): Promise<GetDependenteParentescoResponse> {

                    try {
                      const result = await this.prismaService.dependenteParentesco.findUniqueOrThrow({
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

    async list(data: ListDependenteParentesco): Promise<ListDependenteParentescoResponse> {

                        try {
                          const [items, count] = await this.prismaService.$transaction([
                            this.prismaService.dependenteParentesco.findMany({
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
                            this.prismaService.dependenteParentesco.count({ where: {
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

    async delete(data: DeleteDependenteParentesco): Promise<DeleteDependenteParentescoResponse> {

                    try {
                      await this.prismaService.dependenteParentesco.delete({
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

    async update(data: UpdateDependenteParentesco): Promise<UpdateDependenteParentescoResponse> {

                    try {
                        const result = await this.prismaService.dependenteParentesco.update({ 
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

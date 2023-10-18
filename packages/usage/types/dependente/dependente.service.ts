import { Injectable } from "@nestjs/common";
import { PrismaService } from "@org/prisma";
import { ApiError, CreateDependente, CreateDependenteResponse, GetDependente, GetDependenteResponse, ListDependente, ListDependenteResponse, DeleteDependente, DeleteDependenteResponse, UpdateDependente, UpdateDependenteResponse } from "@org/clients";

@Injectable()
export class DependenteService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(data: CreateDependente): Promise<CreateDependenteResponse> {

                    try {
                        const result = await this.prismaService.dependente.create({ data: {
                            cid: data.cid,
        cidDataLaudo: data.cidDataLaudo,
        cidDataInicio: data.cidDataInicio,
                            
                pessoaDependente: data.pessoaDependenteIds ? {
                    connect: data.pessoaDependenteIds.map(id => ({ id })),
                } : undefined
            ,

                pessoaTitular: data.pessoaTitularIds ? {
                    connect: data.pessoaTitularIds.map(id => ({ id })),
                } : undefined
            ,

                dependenteTipo: data.dependenteTipoIds ? {
                    connect: data.dependenteTipoIds.map(id => ({ id })),
                } : undefined
            ,

                dependenteParentesco: data.dependenteParentescoIds ? {
                    connect: data.dependenteParentescoIds.map(id => ({ id })),
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

    async get(data: GetDependente): Promise<GetDependenteResponse> {

                    try {
                      const result = await this.prismaService.dependente.findUniqueOrThrow({
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

    async list(data: ListDependente): Promise<ListDependenteResponse> {

                        try {
                          const [items, count] = await this.prismaService.$transaction([
                            this.prismaService.dependente.findMany({
                                where: {
                                    cid: data.cid,
        cidDataLaudo: data.cidDataLaudo,
        cidDataInicio: data.cidDataInicio
                                },
                                include: {
                                  pessoaDependente: data.pessoaDependenteInclude,
        pessoaTitular: data.pessoaTitularInclude,
        dependenteTipo: data.dependenteTipoInclude,
        dependenteParentesco: data.dependenteParentescoInclude
                                },
                                take: data?.take,
                                skip: data?.skip,
                            }),
                            this.prismaService.dependente.count({ where: {
                                cid: data.cid,
        cidDataLaudo: data.cidDataLaudo,
        cidDataInicio: data.cidDataInicio
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

    async delete(data: DeleteDependente): Promise<DeleteDependenteResponse> {

                    try {
                      await this.prismaService.dependente.delete({
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

    async update(data: UpdateDependente): Promise<UpdateDependenteResponse> {

                    try {
                        const result = await this.prismaService.dependente.update({ 
                            where: { id: data.id },
                            data: {
                                cid: data.cid,
        cidDataLaudo: data.cidDataLaudo,
        cidDataInicio: data.cidDataInicio,
                                
                pessoaDependente: data.pessoaDependenteIds ? {
                    connect: data.pessoaDependenteIds.map(id => ({ id })),
                } : undefined
            ,

                pessoaTitular: data.pessoaTitularIds ? {
                    connect: data.pessoaTitularIds.map(id => ({ id })),
                } : undefined
            ,

                dependenteTipo: data.dependenteTipoIds ? {
                    connect: data.dependenteTipoIds.map(id => ({ id })),
                } : undefined
            ,

                dependenteParentesco: data.dependenteParentescoIds ? {
                    connect: data.dependenteParentescoIds.map(id => ({ id })),
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

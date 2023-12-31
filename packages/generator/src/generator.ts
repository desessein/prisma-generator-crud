import {
  DMMF,
  generatorHandler,
  GeneratorOptions,
} from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import path from 'path'
import { GENERATOR_NAME } from './constants'
import { genEnum } from './helpers/genEnum'
import { writeFileSafely } from './utils/writeFileSafely'
import {
  genCreateInputDto,
  genDeleteInputDto,
  genGetInputDto,
  genListInputDto,
  genUpdateInputDto,
  genClassIndexDto,
  generateResponseClasses,
  Class,
generateIdentifiersClasses,
} from './helpers/dto'
import { writeTSClass } from './helpers/dto/gen-class-dto'
import {
  genCreateService,
  genService,
  genDeleteService,
  genGetService,
  genListService,
  genUpdateService,
} from './helpers/services'
import { generateControllerFile } from './helpers/controller'
import { generateModuleFile } from './helpers/module'
import { generateDependenteClientProxy } from './helpers/proxy-client'
import { generateGatewayControllerFile } from './helpers/gateway'
import { SourceFile } from 'ts-morph'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    logger.info(`${GENERATOR_NAME}:Generating test`)


    options.dmmf.datamodel.models.forEach(async (model) => {
      if(
        model.name.toLowerCase() != 'ContaPix'.toLowerCase()
        ) {
        return;
      }

      const createCLS = genCreateInputDto(model)
      const deleteCLS = genDeleteInputDto(model)
      const getCLS = genGetInputDto(model)
      const listCLS = genListInputDto(model)
      const updateCLS = genUpdateInputDto(model)

      const classes = [createCLS, deleteCLS, getCLS, listCLS, updateCLS]

      // Dto Classes
      classes.forEach(cls => {
        writeTSClass({
          outputPath: options.generator.output?.value! + '/client',
          cls,
          model,
        })
      })

      classes.forEach(cls => {
        genClassIndexDto({
          outputPath: options.generator.output?.value!   + '/client',
          exports: `./${model.name.toLowerCase()}/${cls.name}.dto`
        })
      })

      // Response Classes
      genClassIndexDto({
        outputPath: options.generator.output?.value!   + '/client',
        exports: `./${model.name.toLowerCase()}/${model.name}Responses.dto`
      })
      generateResponseClasses(model.name, options.generator.output?.value!  + '/client')

      // Identifiers Classes
      genClassIndexDto({
        outputPath: options.generator.output?.value!   + '/client',
        exports: `./${model.name.toLowerCase()}/${model.name}Identifiers.dto`
      })
      generateIdentifiersClasses(model.name, options.generator.output?.value!  + '/client')

      // Controller Class
      generateControllerFile(model.name, options.generator.output?.value! + '/service')

      // // Services
      generateServices({
        outputPath: options.generator.output?.value! + '/service',
        model,
        createCLS,
        deleteCLS,
        getCLS,
        listCLS,
        updateCLS,
      })

      // // Module
      genClassIndexDto({
        outputPath: options.generator.output?.value!  + '/service',
        exports: `./${model.name.toLowerCase()}/${model.name.toLowerCase()}.module`
      })
      generateModuleFile(model.name, options.generator.output?.value! + '/service')

      // // Gateway
      genClassIndexDto({
        outputPath: options.generator.output?.value! + '/gateway',
        exports: `./${model.name.toLowerCase()}/${model.name.toLowerCase()}-gateway.controller`
      })
      generateGatewayControllerFile(model.name, options.generator.output?.value! + '/gateway')


      // // Proxy
      genClassIndexDto({
        outputPath: options.generator.output?.value!   + '/client',
        exports: `./${model.name.toLowerCase()}/${model.name}Client.proxy`
      })
      generateDependenteClientProxy(model.name, options.generator.output?.value!  + '/client')
    })
  },
})

function generateServices({
  outputPath,
  model,
  createCLS,
  deleteCLS,
  getCLS,
  listCLS,
  updateCLS,
}: {
  outputPath: string
  model: DMMF.Model
  createCLS: Class
  deleteCLS: Class
  getCLS: Class
  listCLS: Class
  updateCLS: Class
}) {
  const { classDeclaration, sourceFile } = genService({
    outputPath,
    model,
  })

  genCreateService({
    modelCls: createCLS,
    cls: classDeclaration,
    sourceFile,
    model,
  })

  genGetService({
    modelCls: getCLS,
    cls: classDeclaration,
    sourceFile,
    model,
  })

  genListService({
    modelCls: listCLS,
    cls: classDeclaration,
    sourceFile,
    model,
  })

  genDeleteService({
    modelCls: deleteCLS,
    cls: classDeclaration,
    sourceFile,
    model,
  })

  genUpdateService({
    modelCls: updateCLS,
    cls: classDeclaration,
    sourceFile,
    model,
  })

  sourceFile.saveSync()
}

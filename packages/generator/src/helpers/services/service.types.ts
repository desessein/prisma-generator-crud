import { Class } from '../dto';

export class Service {
    methodName: string
    returnType: string
    async: boolean
    parameters: { name: string, type: string }[]
    data: Class
}
export class ListDependente {
    id: number;
    cid: string;
    cidDataLaudo: string;
    cidDataInicio: string;
    pessoaDependenteIds: number[];
    pessoaTitularIds: number[];
    dependenteTipoIds: number[];
    dependenteParentescoIds: number[];
    idInclude: boolean;
    cidInclude: boolean;
    cidDataLaudoInclude: boolean;
    cidDataInicioInclude: boolean;
    pessoaDependenteInclude: boolean;
    pessoaTitularInclude: boolean;
    dependenteTipoInclude: boolean;
    dependenteParentescoInclude: boolean;
    take: number;
    skip: number;
}

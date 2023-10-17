export class ListPessoa {
    id: number;
    nome: string;
    dataNasc: string;
    nomeMae: string;
    nomePai: string;
    sexo: string;
    estadoCivil: string;
    dependenteIds: number[];
    dependenteTitularIds: number[];
    idInclude: boolean;
    nomeInclude: boolean;
    dataNascInclude: boolean;
    nomeMaeInclude: boolean;
    nomePaiInclude: boolean;
    sexoInclude: boolean;
    estadoCivilInclude: boolean;
    dependenteInclude: boolean;
    dependenteTitularInclude: boolean;
    take: number;
    skip: number;
}

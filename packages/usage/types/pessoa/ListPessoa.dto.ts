export class ListPessoa {
    id!: number;
    nome!: string;
    dataNasc!: string;
    nomeMae!: string;
    nomePai!: string;
    sexo!: string;
    estadoCivil!: string;
    dependenteIds!: number[];
    dependenteTitularIds!: number[];
    dependenteInclude!: boolean;
    dependenteTitularInclude!: boolean;
    take!: number;
    skip!: number;
}

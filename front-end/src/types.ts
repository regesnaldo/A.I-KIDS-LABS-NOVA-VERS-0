 export type Season = {
  id: string | number;
  titulo: string;
  descricao: string;
  imagem?: string;
  image?: string;
};

export type MissionModule = {
  id: string | number;
  titulo: string;
  descricao?: string;
  duracao?: string;
};

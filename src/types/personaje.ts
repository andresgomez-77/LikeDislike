export type PersonajeFuente = "RICK_MORTY" | "POKEMON" | "SUPERHERO";

export type TypeVote = "LIKE" | "DISLIKE";
export interface Personaje {
  id?: string;
  idPersonaje: string;
  nombre: string;
  imagen: string;
  source: PersonajeFuente;
  likes: number;
  dislikes: number;
  totalVotes: number;
  lastEvaluatedAt?: string;
  createdAt?: string;
}

export interface VoteRequest {
  idPersonaje: string;
  typeVote: TypeVote;
}

export interface Estadisticas {
  personaje: Personaje;
  mensaje: string;
  existe: boolean;
}

export interface PreferenciaUsuario {
  FuenteLikes: {[key: string]: number};
  FuenteDislikes: {[key: string]: number};
  FuentePreferida: PersonajeFuente | null;
  PorcentajePreferencia: number;
}

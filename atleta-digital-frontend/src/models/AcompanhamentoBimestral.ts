export interface AcompanhamentoBimestral {
  id: number;
  matriculaEscolarId: number;
  bimestre: number;
  mediaNotas?: number;
  frequenciaEscolar?: number;
  dificuldadeReportada?: boolean;
  ocorrencias?: string;
}
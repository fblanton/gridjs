export interface RowConfig {
  onClick?: (cell: TCell, row: Row<TCell>, column: TColumn) => void;
}

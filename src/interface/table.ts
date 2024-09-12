export interface Column<T> {
  title: string;
  accessor: keyof T;
}

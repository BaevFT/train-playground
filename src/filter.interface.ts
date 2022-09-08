export interface Filter {
  parameter: string;
  condition: 'more' | 'less' | 'equal' | 'moreequal' | 'lessequal';
  target: number | string;
}

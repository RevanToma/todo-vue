export interface TodoUpdateArgs {
  id: string;
  title?: string;
  completed?: boolean;
}

export interface TodoIdArgs {
  title: string;
  id: string;
  todoType: string;
}

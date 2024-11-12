export interface IApiCrudService<Tipo extends TipoBase> {
  getAll(params?: object): Promise<Tipo[]>;
  create(todo: Tipo): Promise<Tipo>;
  update(id: number, todo: Tipo): Promise<Tipo>;
  delete(id: number): Promise<boolean>;
}

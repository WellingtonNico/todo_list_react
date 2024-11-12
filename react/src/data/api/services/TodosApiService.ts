import { ApiCrudServiceBase } from "./ApiCrudServiceBase";

export class TodosApiCrudService extends ApiCrudServiceBase<Todo> {
  url = "/api/todos/";
}

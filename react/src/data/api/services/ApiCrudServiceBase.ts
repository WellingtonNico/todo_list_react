import { apiClient } from "../client";
import { IApiCrudService } from "./IApiService";

export class ApiCrudServiceBase<Tipo extends TipoBase>
  implements IApiCrudService<Tipo>
{
  url = "define api endpoint";

  async getAll(params?: object): Promise<Tipo[]> {
    return (await apiClient.get(this.url, { params })).data;
  }

  async create(todo: Tipo): Promise<Tipo> {
    return (await apiClient.post(this.url, todo)).data;
  }

  async update(id: number, todo: Tipo): Promise<Tipo> {
    return (await apiClient.put(`${this.url}${id}/`, todo)).data;
  }

  async delete(id: number): Promise<boolean> {
    return (await apiClient.delete(`${this.url}${id}/`)).status == 204;
  }
}

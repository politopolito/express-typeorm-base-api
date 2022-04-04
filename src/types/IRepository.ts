/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
import { Repository } from "typeorm";

type IRepository<T> = Repository<T> & {
  findById?(id: number, options: any): Promise<T>;
};

export default IRepository;

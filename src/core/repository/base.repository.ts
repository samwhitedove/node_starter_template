
// export type IEntity<T> = {
//     value: T;
// }

// export function identity<T>(arg: T): T {
//     return arg;
// }

import {DeepPartial, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import IDatabase from '../config/db.config';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class IEntity<T extends ObjectLiteral> extends IDatabase{

    private  readonly repository: Repository<T> | undefined;
    
    constructor(private readonly target: EntityTarget<T> ){
        super()
        this.repository =  super.dataSourceConnection?.getRepository(target);
    }

    create = async (payload: DeepPartial<T>): Promise<T> => {
    
        const result = await this.repository?.save(payload);

        return result!;
    };

    find = async () => {
        const result = await this.repository?.find();

        return result!;
    };

    findOne = async (criteria: FindOptionsWhere<T>) => {
        const result = await this.repository?.findOne({where: criteria});

        return result;
    };

    update = async (criteria: FindOptionsWhere<T>, change: QueryDeepPartialEntity<T>) => {
        const result = await this.repository?.update(criteria, change);

        return result;
    };


    delete = async (criteria: FindOptionsWhere<T>) => {
        const result = await this.repository?.delete(criteria);

        return result;
    };


    exist = async (criteria: FindOptionsWhere<T>, ) => {

        const exist = await this.repository?.findOne({ where: criteria });
        return !!exist; 
    };
  
}
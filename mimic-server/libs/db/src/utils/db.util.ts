import { SelectQueryBuilder } from 'typeorm';

type WithPlusSelectQueryBuilder<T> = SelectQueryBuilder<T> & {
  addSelectPlus(
    selection:
      | ((qb: SelectQueryBuilder<any>) => SelectQueryBuilder<any>)
      | string,
    selectionAliasName?: string,
    isAppend?: boolean,
  ): WithPlusSelectQueryBuilder<T>;

  andWherePlus(
    ...params: [...Parameters<SelectQueryBuilder<T>['andWhere']>, boolean?]
  ): WithPlusSelectQueryBuilder<T>;

  orWherePlus(
    ...params: [...Parameters<SelectQueryBuilder<T>['orWhere']>, boolean?]
  ): WithPlusSelectQueryBuilder<T>;
};

export const withPlus = <T>(queryBuilder: SelectQueryBuilder<T>) => {
  const addSelectPlus: WithPlusSelectQueryBuilder<T>['addSelectPlus'] = (
    selection,
    selectionAliasName,
    isAppend = true,
  ) => {
    if (isAppend) {
      queryBuilder.addSelect(selection as any, selectionAliasName);
    }
    return queryBuilder as any;
  };

  const andWherePlus: WithPlusSelectQueryBuilder<T>['andWherePlus'] = (
    where,
    parameters,
    isAppend = true,
  ) => {
    if (isAppend) {
      queryBuilder.andWhere(where as any, parameters);
    }
    return queryBuilder as any;
  };

  const orWherePlus: WithPlusSelectQueryBuilder<T>['orWherePlus'] = (
    where,
    parameters,
    isAppend = true,
  ) => {
    if (isAppend) {
      queryBuilder.orWhere(where as any, parameters);
    }
    return queryBuilder as any;
  };

  return Object.assign(queryBuilder, {
    andWherePlus,
    orWherePlus,
    addSelectPlus,
  }) as WithPlusSelectQueryBuilder<T>;
};

import { db } from '@common/database'
import { IProduct } from '@common/database/types/product'
import { IOperationType } from '@common/database/types/operation'
import Knex from 'knex'

class ProductsService {
  async getProductsByCategory(categoryId: number): Promise<IProduct[]> {
    return db<IProduct>('product as p')
      .select([
        'p.id',
        'p.name',
        'p.markup',
        'u.name as unitName',
        'u.measure as unitMeasure',
        'lao.price AS purchasePrice',
        db.raw(`
          COALESCE(
            SUM(
              CASE
                WHEN o.type=${IOperationType.EXPENDITURE} THEN o.qty * -1
                ELSE o.qty
              END
            ),
            0
          ) as qty
        `),
        db.raw('COALESCE(lao.price * (1 + p.markup/100.0), 0) AS price'),
      ])
      .join('unit as u', 'p.unitId', 'u.id')
      .leftJoin(
        db('operation')
          .select(['price', 'productId'])
          .where({
            type: IOperationType.ARRIVAL,
            consider: true,
          })
          .orderBy('createdAt', 'desc')
          .limit(1)
          .as('lao'),
        function () {
          this.on('lao.productId', '=', 'p.id')
        },
      )
      .leftJoin(
        db('operation')
          .select(['createdAt', 'productId'])
          .where({
            type: IOperationType.AUDIT,
          })
          .orderBy('createdAt')
          .limit(1)
          .as('lro'),
        function () {
          this.on('lro.productId', '=', 'p.id')
        },
      )
      .leftJoin(
        db('operation')
          .select(['qty', 'type', 'productId', 'createdAt'])
          .orderBy('createdAt')
          .as('o'),
        function () {
          this.on('o.productId', '=', 'p.id')
          this.on(
            'o.createdAt',
            '>=',
            db.raw('CASE WHEN lro.createdAt THEN lro.createdAt ELSE 0 END'),
          )
        },
      )
      .where({
        categoryId,
      })
      .groupBy('p.id')
  }

  async searchProducts(name: string, limit: number) {
    return db<IProduct>('product as p')
      .select(['p.id', 'p.name', 'c.name as categoryName'])
      .where('p.name', 'like', `%${name}%`)
      .limit(limit)
      .leftJoin('category as c', 'p.categoryId', 'c.id')
      .groupBy('p.id')
  }
}

export const productsService = new ProductsService()

import { db } from '@common/database'
import { ICategory } from '@common/database/types/category'

export default class CategoriesService {
  async getAllCategories() {
    return db<ICategory>('category').select('*')
  }

  async getCategoryById(id: number) {
    return db<ICategory>('Category').where({ id }).first()
  }

  async searchCategories(name: string, limit: number) {
    return db<ICategory>('category')
      .where('name', 'like', `%${name}%`)
      .limit(limit)
  }

  async createCategory(args: ICategory) {
    return db<ICategory>('category').insert(args)
  }

  async updateCategory(id: number, data: ICategory) {
    return db<ICategory>('category').where({ id }).update(data)
  }

  async deleteCategory(id: number) {
    return db<ICategory>('category').where('id', id).delete()
  }
}

export const categoriesService = new CategoriesService()

export interface IProduct {
  id: number
  name: string
  markup: number
  qty: number
  purchasePrice: number
  price: number
  unitId?: number
  unitName?: string
  unitMeasure?: string
  categoryId: number
  categoryName?: string
}

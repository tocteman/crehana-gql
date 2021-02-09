export type CityNameInputProps = {
  cities: any[]
}
export type CompanyNameInputProps = {
  companies: any[]
}
export interface Company {
  name: string,
  id: string,
  slug: string
}
export interface City {
  id: string,
  slug: string,
  name: string
}
export interface Job {
  slug: string,
  id: string,
  title: string,
  updatedAt: Date,
  company: Company,
  cities: City[]
}

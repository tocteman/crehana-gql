import {atom} from 'recoil'

export const currentJob = atom({
  key: "CURRENT JOB",
  default: {slug: "", company: {slug: ""}}
})

export const titleFilter = atom({
  key: "TITLE FILTER",
  default: ""
})

export const companyNameFilter = atom({
  key: "COMPANY NAME FILTER",
  default: ""
})

export const cityNameFilter = atom({
  key: "CITY NAME FILTER",
  default: ""
})

export const sliceRange = atom({
  key: "SLICE RANGE",
  default: {from: 0, to: 5}
})
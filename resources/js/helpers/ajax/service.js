import Http from '../../util/Http'

export const fetchServices = (query) => {
  return new Promise((resolve, reject) => {
    try {
      const res = await Http.get(`customers${query}`)
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}

export const deleteServices = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const res = await Http.delete(`services/delete/multiple`, {parans:{data}})
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}

export const addServices = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const res = await Http.post(`services`, data)
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}
export const viewServices = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const res = await Http.get(`services/${id}`)
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}

export const searchServices = (query) => {
  return new Promise((resolve, reject) => {
    try {
      const res = await Http.get(`services${query}`)
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}

export const addServiceMetas = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const res = await Http.post(`service-metas`, data)
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}

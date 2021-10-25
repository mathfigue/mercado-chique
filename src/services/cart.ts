const STORAGE: any = process.env.REACT_APP_STORAGE

export const getCart = () => JSON.parse(localStorage.getItem(STORAGE) || '[]')

export const setCart = (data: []) =>
  localStorage.setItem(STORAGE, JSON.stringify(data))

export const deleteCart = () => localStorage.removeItem(STORAGE)

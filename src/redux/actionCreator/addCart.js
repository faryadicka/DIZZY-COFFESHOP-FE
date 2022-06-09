import { sizeProduct, idProduct, timeProduct, deliveryProduct, countDec, countInc, imgProduct, nameProduct, priceProduct } from "./actionString"

export const increment = () => {
  return {
    type: countInc
  }
}

export const decrement = () => {
  return {
    type: countDec
  }
}

export const setIdProduct = (id) => {
  return {
    type: idProduct,
    payload: {
      id
    }
  }
}

export const setSize = (size) => {
  return {
    type: sizeProduct,
    payload: {
      size
    }
  }
}

export const setDelivery = (delivery) => {
  return {
    type: deliveryProduct,
    payload: {
      delivery
    }
  }
}

export const setTime = (time) => {
  return {
    type: timeProduct,
    payload: {
      time
    }
  }
}

export const setImage = (image) => {
  return {
    type: imgProduct,
    payload: {
      image
    }
  }
}

export const setName = (name) => {
  return {
    type: nameProduct,
    payload: {
      name
    }
  }
}

export const setPrice = (price) => {
  return {
    type: priceProduct,
    payload: {
      price
    }
  }
}

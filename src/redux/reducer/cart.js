import {
  clearCart,
  sizeProduct,
  idProduct,
  timeProduct,
  deliveryProduct,
  countDec,
  countInc,
  imgProduct,
  nameProduct,
  priceProduct,
  checkOutProduct,
} from "../actionCreator/actionString";
const initialState = {
  id: "",
  price: 0,
  size: "",
  delivery: "",
  time: "",
  qty: 0,
  name: "",
  image: "",
  checkOut: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case countInc:
      return { ...state, qty: state.qty + 1 };
    case countDec:
      return { ...state, qty: state.qty - 1 };
    case idProduct:
      const { id } = action.payload;
      return { ...state, id };
    case sizeProduct:
      const { size } = action.payload;
      return { ...state, size };
    case timeProduct:
      const { time } = action.payload;
      return { ...state, time };
    case deliveryProduct:
      const { delivery } = action.payload;
      return { ...state, delivery };
    case imgProduct:
      const { image } = action.payload;
      return { ...state, image };
    case nameProduct:
      const { name } = action.payload;
      return { ...state, name };
    case priceProduct:
      const { price } = action.payload;
      return { ...state, price };
    case checkOutProduct:
      const { checkOut } = action.payload;
      return { ...state, checkOut };
    case clearCart:
      return {
        ...state,
        id: "",
        price: 0,
        size: "",
        delivery: "",
        time: "",
        qty: 0,
        name: "",
        image: "",
        checkOut: false,
      };
    default:
      return state;
  }
};

export default cartReducer;

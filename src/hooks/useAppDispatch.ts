import { store } from "../redux/store";
import { useDispatch } from "react-redux";

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
/* eslint-disable import/named */
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import parseRequestUrl, { showLoading, hideLoading } from "./utils";
import Error404Screen from "./screens/Error404Screen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import Header from "./components/Header";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
  "/register": RegisterScreen,
  "/profile": ProfileScreen,
  "/shipping": ShippingScreen,
  "/payment": PaymentScreen,
  "/placeorder": PlaceOrderScreen
};
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const main = document.getElementById("main-container");

  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);

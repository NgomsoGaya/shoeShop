import pgPromise from "pg-promise";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise();
const db = pgp(connectionString);

export default function render() {
  async function signUp(req, res, next) {
    try {
      res.render("signup");
    } catch (error) {
      next(error);
    }
  }
  async function login(req, res, next) {
    try {
      res.render("login");
    } catch (error) {
      next(error);
    }
  }
  async function allShoes(req, res, next) {
    try {
      res.render("allshoes");
    } catch (error) {
      next(error);
    }
  }
  async function cart(req, res, next) {
    try {
      res.render("cart");
    } catch (error) {
      next(error);
    }
  }
  async function admin(req, res, next) {
    try {
      res.render("admin");
    } catch (error) {
      next(error);
    }
  }

  return {
    signUp,
    login,
    allShoes,
    cart,
    admin,
  };
}

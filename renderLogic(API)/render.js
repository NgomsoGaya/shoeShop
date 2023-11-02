import pgPromise from "pg-promise";
import "dotenv/config";
import query from "../backEndFunctions/query.js";


const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise();
const db = pgp(connectionString);
const queryFunction = query(db)

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
      const data = await queryFunction.showAllShoes();
      
      res.json(data);
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

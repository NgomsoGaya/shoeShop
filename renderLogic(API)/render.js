import pgPromise from "pg-promise";
import "dotenv/config";
import query from "../backEndFunctions/query.js";
import axios from "axios";
import { response } from "express";

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
  

  async function getAllAPIShoes(req, res, next) {
    try {
      const data = await queryFunction.showAllShoes();

      res.json(data)
      
    } catch (error) {
      next(error)
    }
  }
//const response = ''
  async function displayAllShoes() {
    try {
      const response = await axios.get('http://localhost:3033/api/shoes')
      // console.log(response);
      return response.data
      
    } catch (error) {
      // next(error)
      throw error
    }
    // console.log(response.data);
  }
  
async function allShoes(req, res, next) {
  try {
      //displayAllShoes()
      //const data = await queryFunction.showAllShoes();
    const response = await displayAllShoes()
    // console.log(response);
      res.render("allshoes", {response} );
    } catch (error) {
      next(error);
    }
}
  //  console.log(response);

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
    getAllAPIShoes,
    displayAllShoes,
  };
}

import pgPromise from "pg-promise";
import "dotenv/config";
import query from "../backEndFunctions/query.js";
import axios from "axios";
;

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

  async function filterByBrandAPI(req, res, next) {
    try {

      const brand = req.params.brandname
      const data = await queryFunction.filterByBrand(brand)
      
      res.json(data)
     // console.log(data);
    } catch (error) {
      next(error)
    }
  }

  async function displayAllShoes() {
    try {
      const response = await axios.get('http://localhost:3033/api/shoes')
      
      return response.data
      
    } catch (error) {
      throw error
    }
  }
  async function displayFilteredByBrand(brand) {
    try {

      const response = await axios.get(`http://localhost:3033/api/shoes/${brand}`)

      return response.data

    } catch (error) {
      throw error
    }
  }
  
async function allShoes(req, res, next) {
  try {
    const brand = req.params.brandname
    const response = await displayAllShoes()
    const sameBrand = await displayFilteredByBrand(brand)
    
      res.render("allshoes", { response, sameBrand});
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
    getAllAPIShoes,
    displayAllShoes,
    filterByBrandAPI,
    displayFilteredByBrand,
  };
}

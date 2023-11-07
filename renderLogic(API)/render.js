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
  //DATA FROM QUERIES SENT AS JSON
  async function getAllAPIShoes(req, res, next) {
    try {
      const data = await queryFunction.showAllShoes();

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async function filterByBrandAPI(req, res, next) {
    try {
      const brand = req.params.brandname;
      const data = await queryFunction.filterByBrand(brand);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async function filterBySizeAPI(req, res, next) {
    try {
      const size = req.params.shoesize;
      const data = await queryFunction.filterBySize(size);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async function filterByColorAPI(req, res, next) {
    try {
      const color = req.params.shoecolor;
      const data = await queryFunction.filterByColor(color);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  //----DATA FROM QUERIES SENT AS JSON------

  //END-POINTS ACCESSING THE JSON
  async function displayAllShoes() {
    try {
      const response = await axios.get("http://localhost:3033/api/shoes");

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async function displayFilteredByBrand(brand) {
    try {
      const response = await axios.get(
        `http://localhost:3033/api/shoes/brand/${brand}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async function displayFilteredBySize(size) {
    try {
      const response = await axios.get(
        `http://localhost:3033/api/shoes/size/${size}`
      )

      return response.data
    } catch (error) {
      throw error
    }
  }
  async function displayFilteredByColor(color) {
    try {
      const response = await axios.get(
        `http://localhost:3033/api/shoes/color/${color}`
      )

      return response.data
    } catch (error) {
      throw error
    }
  }
  //------END-POINTS ACCESSING THE JSON -------

  //RENDERING THE PAGES /& DATA FROM END-POINTS
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
      const brand = req.params.brandname;
      const response = await displayAllShoes();

     // const sameBrand = await displayFilteredByBrand(brand);

      res.render("allshoes", { response});
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
  //---------RENDERING THE PAGES /& DATA FROM END-POINTS-------

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
    filterBySizeAPI,
    displayFilteredBySize,
    filterByColorAPI,
    displayFilteredByColor,
  };
}

import pgPromise from "pg-promise";
import "dotenv/config";
import query from "../backEndFunctions/query.js";
import axios from "axios";


const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise();
const db = pgp(connectionString);
const queryFunction = query(db);

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
  async function filterByBrandColorSizeAPI(req, res, next) { 
    try {
      const brand = req.params.brandname
      const color = req.params.color
      const size = req.params.size

      const data = await queryFunction.filterByBrandColorSize(brand, color, size);
        
      res.json(data)
      } catch (error) {
        next(error)
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
      const response = await axios.get("https://shoeshop-ess4.onrender.com/api/shoes");

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async function displayFilteredByBrandColorSize(brand, color, size) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/brand/${brand}/color/${color}/size/${size}`
      );
      
      return response.data
    } catch (error) {
      throw error
    }
  }
  async function displayFilteredByBrand(brand) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/brand/${brand}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async function displayFilteredBySize(size) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/size/${size}`
      );

      return response.data
    } catch (error) {
      throw error
    }
  }
  async function displayFilteredByColor(color) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/color/${color}`
      );

      return response.data
    } catch (error) {
      throw error
    }
  }
  //------END-POINTS ACCESSING THE JSON -------

  //RENDERING THE PAGES /& DATA FROM END-POINTS
  async function allShoes(req, res, next) {
    try {
      const response = await displayAllShoes();

      res.render("allshoes", { response});
    } catch (error) {
      next(error);
    }
  }
  async function filterShoes(req, res, next) {
    try {
      const brand = req.body.brand
      const size = req.body.size
      const color = req.body.color;
      
      if (brand !== "all" && size !== "all" && color !== "all") {
        const response = await displayFilteredByBrandColorSize(brand, color, size)
        res.render("allshoes", { response });
      }else if (brand !== "all") {
        const response = await displayFilteredByBrand(brand);
        res.render("allshoes", { response });
      } else if (size !== "all") {
        const response = await displayFilteredBySize(size);
        res.render("allshoes", { response });
      } else if (color !== "all") {
        const response = await displayFilteredByColor(color);
        res.render("allshoes", { response })
      }
    } catch (error) {
      next(error)
    }
  }

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
    filterByBrandColorSizeAPI,
    displayFilteredByBrandColorSize,
    filterByBrandAPI,
    displayFilteredByBrand,
    filterBySizeAPI,
    displayFilteredBySize,
    filterByColorAPI,
    displayFilteredByColor,
    filterShoes,
  };
}

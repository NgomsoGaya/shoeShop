export default function query(db) {
  async function signup(username, password, confirm) {
    if (username && password && confirm) {
      const existingUser = await db.oneOrNone(
        "SELECT * FROM users WHERE username = $1",
        username
      );
      if (existingUser) {
        return "Username already exists";
      } else if (!existingUser) {
        if (password === confirm) {
          await db.none(
          "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
          [username, password, 'Client']
        );
        return "Sign-up successful";
        }
      }
    }
    return "Sign-up failed";
  }

  async function login(username, password) {
    let role = null;

    if (username && password) {
      const user = await db.oneOrNone(
        "SELECT role FROM users WHERE username = $1 AND password= $2",
        [username, password]
      );

      if (user) {
        role = user.role;
      }
    }
    return role;
  }


  async function showAllShoes() {
        const shoes = await db.many("SELECT * FROM shoes")
        return shoes;
    }

  async function filterByBrandColorSize(brand, color, size) {
    const BCSfilteredShoes = await db.manyOrNone("SELECT * FROM shoes WHERE brand = $1 AND color = $2 AND size = $3", [brand, color, size])

    return BCSfilteredShoes;
  }

  async function filterByBrandColor(brand, color) {
    const BCfilteredshoes = await db.manyOrNone("SELECT * FROM shoes WHERE brand = $1 AND color = $2", [brand, color])
    
    return BCfilteredshoes;
  }

  async function filterByColorSize(color, size) {
    const CSfilteredshoes = await db.manyOrNone("SELECT * FROM shoes WHERE color = $1 AND size = $2", [color, size])

    return CSfilteredshoes;
  }

  async function filterByBrandSize(brand, size) {
    const BSfilteredshoes = await db.manyOrNone("SELECT * FROM shoes WHERE brand = $1 AND size = $2", [brand, size])

    return BSfilteredshoes;
  }

  async function filterByBrand(brand) {
    const brandFilteredShoes = await db.manyOrNone(
      "SELECT * FROM shoes WHERE brand = $1",
      [brand]
    )

    return brandFilteredShoes;
  }

  async function filterBySize(size) {
    const sizeFilteredShoes = await db.manyOrNone("SELECT * FROM shoes WHERE size = $1", [size]);
    
    return sizeFilteredShoes;
  }

  async function filterByColor(color) {
    const colorFilteredShoes = await db.many(
      "SELECT * FROM shoes WHERE color = $1",
      [color]
    )

    return colorFilteredShoes;
  }

  return {
      signup,
      login,
      showAllShoes,
      filterByBrandColorSize,
      filterByBrandColor,
      filterByColorSize,
      filterByBrandSize,
      filterByBrand,
      filterBySize,
      filterByColor,
    };
}
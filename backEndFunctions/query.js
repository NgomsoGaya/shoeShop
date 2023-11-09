export default function query(db){
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
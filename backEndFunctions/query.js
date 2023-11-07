export default function query(db){
  async function showAllShoes() {
        const shoes = await db.many("SELECT * FROM shoes")
        return shoes;
    }

  async function filterByBrand(brand) {
    const brandFilteredShoes = await db.manyOrNone(
      "SELECT * FROM shoes WHERE brand = $1",
      [brand]
    )

    return brandFilteredShoes;
  }

  async function filterBySize(size) {
    const allShoes = await db.manyOrNone("SELECT * FROM shoes");
    const sizeFilteredShoes = allShoes.filter((shoe) =>
      shoe.size.includes(size)
    );
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
      filterByBrand,
      filterBySize,
      filterByColor,
    };
}
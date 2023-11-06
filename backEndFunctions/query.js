export default function query(db){
    async function showAllShoes() {
        const shoes = await db.many("SELECT * FROM shoes")
        return shoes;
    }

  async function filterByBrand(brand) {
    const brandFilteredShoes = await db.manyOrNone(
      "SELECT * FROM shoes WHERE brand = $1",
      [brand]
    );

    return brandFilteredShoes || [];
  }

    return {
      showAllShoes,
      filterByBrand,
    };
}
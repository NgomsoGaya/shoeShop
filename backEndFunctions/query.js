export default function query(db){
    async function showAllShoes() {
        const shoes = await db.many("SELECT * FROM shoes")
        return shoes;
    }


    return {
      showAllShoes,
    };
}
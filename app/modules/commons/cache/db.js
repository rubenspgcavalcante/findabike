import Dexie from "dexie";

const db = new Dexie("findabike");
db.version(1).stores({
  networks: 'id,company,href,location,name,stations'
});

export default db;
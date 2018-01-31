import db from "../modules/commons/cache/db";

self.addEventListener('message', ({ data }) => {
  if (data.type === 'NETWORKS_LOADED') {
    db.transaction('rw', db.networks, () => db.networks.bulkPut(data.payload));
  }
});


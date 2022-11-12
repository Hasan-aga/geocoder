const db = require("../db");

const getRoutePosition = async (res, points) => {
  console.log(
    `calculating route between these points: ${points.map((p) => `[${p}] `)}`
  );

  try {
    const values = [];
    points.forEach((p) => {
      values.push(...p);
    });

    const queryString = `SELECT ST_AsGeoJSON(ST_Union((the_geom))) FROM ways WHERE id in
                                (SELECT edge FROM pgr_dijkstra(
                                'SELECT id,
                                 source,
                                 target,
                                 length AS cost
                                FROM ways',
                                (SELECT id FROM ways_vertices_pgr
                                ORDER BY the_geom <-> ST_SetSRID(ST_Point(${values[1]} ,${values[0]}), 4326) LIMIT 1), 
                                (SELECT id FROM ways_vertices_pgr
                                ORDER BY the_geom <-> ST_SetSRID(ST_Point(${values[3]} ,${values[2]}), 4326) LIMIT 1),
                                directed := true) foo)`;
    const { rows } = await db.query(queryString, []);
    if (!rows) throw new Error("query went wrong!");
    return rows;
  } catch (err) {
    console.err("GET api/cemetery/getroute/:latitude/:longitude" + err.stack);
    throw new Error("Failed to calculate route, ", err);
  }
};

exports.getRoutePosition = getRoutePosition;

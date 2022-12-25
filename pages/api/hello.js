// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from "./../../public/DATAALL.json"
import Hotel from "./../../model/Hotel"

import db from "../../utils/db";
import Admin from "../../model/Admin";


export default async function handler(req, res) {
  await db.connect();
  await Hotel.deleteMany();
  await Hotel.insertMany(data);

  await db.disconnect();
  res.status(200).json({ name: "message send succesfully" });
}

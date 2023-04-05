import { Client } from "pg";

export const client = new Client({
  user: "PANDORA",
  password: "AuroraMaior#Resplandecente072",
  host: "localhost",
  database: "streamer_z",
  port: 5432,
});

export const startDataBase = async (): Promise<void> => {
  try {
    await client.connect();
    console.log("Connected whit database.");
  } catch (error) {
    console.log("Server has not connected to the database!");
    console.error(error);
  }
};
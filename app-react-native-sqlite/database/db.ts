import * as SQLite from 'expo-sqlite';

export let db: SQLite.SQLiteDatabase | undefined;

export const openDatabaseAsync = async () => {
  if (!db) {
    // Substitua 'seunomedobanco.db' pelo nome do seu arquivo de banco de dados
    db = await SQLite.openDatabaseAsync('usuarios.db');
    // Opcional: Execute a criação da tabela se ela não existir
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT
      );
    `);
  }
  return db;
};
export default db;

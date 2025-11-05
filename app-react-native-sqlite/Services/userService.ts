// Importe a função openDatabaseAsync e a instância db (se exportada)
import { openDatabaseAsync, db } from "../database/db"; 

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
}

/**
 * Recupera todos os usuários do banco de dados.
 */
export const getUsers = async (): Promise<Usuario[]> => {
  const database = await openDatabaseAsync();
  // Use getAllAsync para buscar todos os registros de uma vez
  const allRows = await database.getAllAsync<Usuario>("SELECT * FROM usuarios");
  return allRows;
};

/**
 * Adiciona um novo usuário ao banco de dados.
 */
export const addUser = async (user: Usuario): Promise<number | undefined> => {
  const database = await openDatabaseAsync();

  // Tratamento do telefone: se for undefined, use null
  const telefoneValue = user.telefone === undefined ? null : user.telefone;
  
  // Use runAsync para operações que não retornam um conjunto de resultados (INSERT, UPDATE, DELETE)
  // Os parâmetros são passados no segundo argumento como um array
  const result = await database.runAsync(
    "INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)",
    [user.nome, user.email, telefoneValue]
  );
  // Você pode obter o ID do último registro inserido se precisar
  return result.lastInsertRowId;
};

/**
 * Atualiza um usuário existente, convertendo undefined para null.
 */
export const updateUser = async (user: Usuario): Promise<void> => {
  const database = await openDatabaseAsync();

  // Tratamento do id: se for undefined, use null
  const idValue = user.id === undefined ? null : user.id;

  // Tratamento do telefone: se for undefined, use null
  const telefoneValue = user.telefone === undefined ? null : user.telefone;

  await database.runAsync(
    "UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?",
    [user.nome, user.email, telefoneValue, idValue] // Use o valor tratado aqui
  );
};

/**
 * Exclui um usuário.
 */
export const deleteUser = async (id: number): Promise<void> => {
  const database = await openDatabaseAsync();
  await database.runAsync(
    "DELETE FROM usuarios WHERE id = ?",
    [id]
  );
};

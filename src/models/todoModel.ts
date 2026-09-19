import db from "../config/db.js";

export const TodoModel = {
  getByUserId: async (userId: number) => {
    const [rows] = await db.query("SELECT * FROM todos WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  },

  // Langkah 10a: ambil satu todo berdasarkan id
  getById: async (id: number, userId: number) => {
    const [rows]: any = await db.query(
      "SELECT * FROM todos WHERE id = ? AND user_id = ?",
      [id, userId],
    );
    return rows[0]; // undefined jika tidak ditemukan
  },

  create: async (userId: number, task: string) => {
    const [result]: any = await db.query(
      "INSERT INTO todos (user_id, task) VALUES (?, ?)",
      [userId, task],
    );
    return result.insertId;
  },

  // Langkah 1: update task atau status is_completed
  update: async (
    id: number,
    task: string,
    isCompleted: boolean,
    userId: number,
  ) => {
    const [result]: any = await db.query(
      "UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?",
      [task, isCompleted, id, userId],
    );
    return result.affectedRows;
  },

  // Langkah 1: hapus todo berdasarkan id dan userId
  delete: async (id: number, userId: number) => {
    const [result]: any = await db.query(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [id, userId],
    );
    return result.affectedRows;
  },
};

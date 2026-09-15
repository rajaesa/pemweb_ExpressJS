import db from "../config/db.js";

export const TodoModel = {
  getByUserId: async (userId: number) => {
    const [rows] = await db.query("SELECT * FROM todos WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  },

  create: async (userId: number, task: string) => {
    const [result]: any = await db.query(
      "INSERT INTO todos (user_id, task) VALUES (?, ?)",
      [userId, task],
    );
    return result.insertId;
  },

  updateStatus: async (id: number, userId: number, completed: boolean) => {
    const [result] = await db.query(
      "UPDATE todos SET is_completed = ? WHERE id = ? AND user_id = ?",
      [completed, id, userId],
    );
    return result;
  },

  delete: async (id: number, userId: number) => {
    const [result] = await db.query(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [id, userId],
    );
    return result;
  },
};

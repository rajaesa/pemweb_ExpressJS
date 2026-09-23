import pool from "../config/db.js";

export const TodoModel = {
  create: async (userId: number, task: string): Promise<number> => {
    const [result]: any = await pool.query(
      "INSERT INTO todos (user_id, task, is_completed) VALUES (?, ?, ?)",
      [userId, task, false],
    );
    return result.insertId;
  },

  getById: async (id: number, userId: number) => {
    const [rows]: any = await pool.query(
      "SELECT * FROM todos WHERE id = ? AND user_id = ?",
      [id, userId],
    );
    return rows[0];
  },

  getByUserId: async (userId: number, limit: number, offset: number) => {
    const [rows] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC LIMIT ? OFFSET ?",
      [userId, limit, offset],
    );
    return rows;
  },

  countByUserId: async (userId: number) => {
    const [rows]: any = await pool.query(
      "SELECT COUNT(*) AS total FROM todos WHERE user_id = ?",
      [userId],
    );
    return rows[0].total as number;
  },

  update: async (
    id: number,
    task: string | undefined,
    isCompleted: boolean | undefined,
    userId: number,
  ): Promise<number> => {
    const fields: string[] = [];
    const values: any[] = [];

    if (task !== undefined) {
      fields.push("task = ?");
      values.push(task);
    }
    if (isCompleted !== undefined) {
      fields.push("is_completed = ?");
      values.push(isCompleted);
    }

    values.push(id, userId);

    const [result]: any = await pool.query(
      `UPDATE todos SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`,
      values,
    );
    return result.affectedRows;
  },

  delete: async (id: number, userId: number): Promise<number> => {
    const [result]: any = await pool.query(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [id, userId],
    );
    return result.affectedRows;
  },
};

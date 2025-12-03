import { db } from "../database";

export const ConsultasService = {
  listarPorPaciente(pacienteId) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM consultas WHERE paciente_id=? ORDER BY data DESC;",
          [pacienteId],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        );
      });
    });
  },

  criar(c) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO consultas (paciente_id, data, descricao) VALUES (?, ?, ?);",
          [c.paciente_id, c.data, c.descricao],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  },

  atualizar(id, c) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE consultas SET paciente_id=?, data=?, descricao=? WHERE id=?;",
          [c.paciente_id, c.data, c.descricao, id],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  },

  excluir(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM consultas WHERE id=?;",
          [id],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }
};


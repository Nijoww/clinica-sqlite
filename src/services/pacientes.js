import { db } from "../database";

export const PacientesService = {
  listar() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM pacientes ORDER BY nome;",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        );
      });
    });
  },

  criar(p) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO pacientes (nome, telefone, idade) VALUES (?, ?, ?);",
          [p.nome, p.telefone, p.idade],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  },

  atualizar(id, p) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE pacientes SET nome=?, telefone=?, idade=? WHERE id=?;",
          [p.nome, p.telefone, p.idade, id],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  },

  excluir(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        // excluir consultas do paciente
        tx.executeSql("DELETE FROM consultas WHERE paciente_id=?", [id]);

        tx.executeSql(
          "DELETE FROM pacientes WHERE id=?;",
          [id],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }
};


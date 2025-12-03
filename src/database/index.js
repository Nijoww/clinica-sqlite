import * as SQLite from 'expo-sqlite';
import { runMigrations } from './migrations';

export const db = SQLite.openDatabase('clinica.db');

export function initDB() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        runMigrations(tx);
      },
      (error) => reject(error),
      () => resolve()
    );
  });
}


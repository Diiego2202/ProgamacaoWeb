-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
CREATE DATABASE IF NOT EXISTS biblioteca;
-- CREATE DATABASE IF NOT EXISTS biblioteca DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE biblioteca;

CREATE TABLE livro (
  id int NOT NULL AUTO_INCREMENT,
  titulo varchar(50) NOT NULL,
  ano int NOT NULL,
  autor varchar(50) NOT NULL,
  paginas int NOT NULL,
  PRIMARY KEY (id)
);

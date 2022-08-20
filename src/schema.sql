DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
	  id serial PRIMARY KEY,
	  name varchar(50) NOT NULL
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
	  id serial PRIMARY KEY,
	  name varchar(50) NOT NULL,
  	  email varchar(50) NOT NULL,
  	  password text NOT NULL 
);

DROP TABLE IF EXISTS service_order;
CREATE TABLE service_order (
	  id serial PRIMARY KEY,
	  date timestamp NOT NULL,
  	  id_client integer NOT NULL,
  	  id_employee integer NOT NULL 
);
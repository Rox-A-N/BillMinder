
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


-- Table to create bill form entries
CREATE TABLE "bill_data" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) UNIQUE NOT NULL,
	"amount" INTEGER,
	"due date" DATE,
	"category" VARCHAR (80),
	"repeat" VARCHAR (100),
	"payment method" VARCHAR (255),
	"payment status" VARCHAR (255),
	"cleared bank" BOOLEAN,
	"notes" VARCHAR (255),
	"user_id" INT REFERENCES "user");
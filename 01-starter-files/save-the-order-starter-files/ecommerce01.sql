CREATE DATABASE `full-stack-ecommerce`;

USE `full-stack-ecommerce`;

-- Step 1: Delete data

SET FOREIGN_KEY_CHECKS=0;

TRUNCATE customer;
TRUNCATE orders;
TRUNCATE order_item;
TRUNCATE address;

SET FOREIGN_KEY_CHECKS=1;

-- Step 2: make the email address unique

ALTER TABLE customer ADD UNIQUE(email);

DROP USER IF EXISTS dbacnh_market_tracker;
CREATE USER dbacnh_market_tracker IDENTIFIED BY 'dbacnh_market_trackerpw';

DROP DATABASE IF EXISTS dbacnh_market_tracker;
CREATE DATABASE acnh_market_tracker;

USE acnh_market_tracker;
GRANT ALL PRIVILEGES on acnh_market_tracker.* TO 'dbacnh_market_tracker'@'localhost' identified by 'dbacnh_market_trackerpw';
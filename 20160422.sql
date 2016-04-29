
CREATE TABLE lists (
    id int(11) NOT NULL AUTO_INCREMENT,
    lasts varchar(128) NOT NULL,
    date varchar(128) NOT NULL,
    h varchar(128) NOT NULL,
    m varchar(128) NOT NULL,
    s varchar(128) NOT NULL,
    start varchar(128) NOT NULL,
    end varchar(128) NOT NULL,
    PRIMARY KEY (id),
    KEY date (date)
);

CREATE TABLE add_his (
    id INT(11) NOT NULL AUTO_INCREMENT,
    date VARCHAR(128) NOT NULL,
    time VARCHAR(128) NOT NULL,
    PRIMARY KEY (id),
    KEY date (date)
);

CREATE TABLE rest (
    id int(11) NOT NULL AUTO_INCREMENT,
    h VARCHAR(128) NOT NULL,
    m VARCHAR(128) NOT NULL,
    s VARCHAR(128) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO rest (h, m, s)VALUES ('00','00','00');
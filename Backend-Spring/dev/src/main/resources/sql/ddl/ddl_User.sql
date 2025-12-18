CREATE TABLE user
(
    id       BIGINT AUTO_INCREMENT NOT NULL,
    username VARCHAR(255)          NULL,
    password VARCHAR(255)          NULL,
    `role`   VARCHAR(255)          NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);
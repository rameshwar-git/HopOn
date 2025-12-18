CREATE TABLE user_location
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    user_id    BIGINT                NOT NULL,
    latitude   DOUBLE                NOT NULL,
    longitude  DOUBLE                NOT NULL,
    created_at datetime              NOT NULL,
    CONSTRAINT pk_user_location PRIMARY KEY (id)
);

ALTER TABLE user_location
    ADD CONSTRAINT FK_USER_LOCATION_ON_USERID FOREIGN KEY (user_id) REFERENCES user (id);
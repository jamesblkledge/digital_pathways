CREATE DATABASE <DATABASE NAME>;

USE <DATABASE NAME>;

CREATE TABLE Student (
    StudentID INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    EmailAddress VARCHAR(255) NOT NULL,
    Password VARCHAR (100) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    SixthFormYear VARCHAR(2) NOT NULL,
    Location VARCHAR(50) NOT NULL,
    ProfilePicture VARCHAR(255) NOT NULL,
    InterestedSector VARCHAR(50) DEFAULT 'you have not taken the test yet!'
);

CREATE TABLE StudentSkills (
    StudentID INT(10) UNSIGNED NOT NULL,
    SkillA VARCHAR(100) NOT NULL,
    SkillB VARCHAR(100) NOT NULL,
    SkillC VARCHAR(100) NOT NULL,
    SkillD VARCHAR(100) NOT NULL,
    SkillE VARCHAR(100) NOT NULL
);

CREATE TABLE QuizResults (
    StudentID INT(10) UNSIGNED NOT NULL,
    ResultA INT(1) NOT NULL,
    ResultB INT(1) NOT NULL,
    ResultC INT(1) NOT NULL,
    ResultD INT(1) NOT NULL,
    ResultE INT(1) NOT NULL
);

ALTER TABLE Student ADD INDEX (StudentID);
ALTER TABLE StudentSkills ADD INDEX (StudentID);
ALTER TABLE QuizResults ADD INDEX (StudentID);

ALTER TABLE StudentSkills ADD FOREIGN KEY (StudentID) REFERENCES Student(StudentID);
ALTER TABLE QuizResults ADD FOREIGN KEY (StudentID) REFERENCES Student(StudentID);

CREATE TABLE Job (
    JobID INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(25) NOT NULL,
    Description VARCHAR(400) NOT NULL,
    Salary VARCHAR(10) NOT NULL
);

INSERT INTO Student (EmailAddress, Password, FirstName, LastName, SixthFormYear, Location, ProfilePicture) VALUES
('<EMAIL>', '<PASSWORD>', '<FIRST NAME>', '<LAST NAME>', '<SCHOOL YEAR>', '<LOCATION>', '<PROFILE PICTURE URL>');

INSERT INTO Job (Title, Description, Salary) VALUES
('ui & ux designer', 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '£34,500'),
('software developer', 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '£36,500');

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2022 at 10:30 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventure`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `createEvent` (IN `eventName` VARCHAR(255), IN `eventDate` DATE, IN `eventTime` VARCHAR(20), IN `eventLocation` VARCHAR(255), IN `eventDescriptionIntro` VARCHAR(1000), IN `eventDescriptionBody` VARCHAR(5000), IN `eventFree` TINYINT(4), IN `eventTicketLink` VARCHAR(5000), IN `eventImage` VARCHAR(500), IN `userId` INT(11))  BEGIN
INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id) VALUES (eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createEventWithGenres` (IN `eventName` VARCHAR(255), IN `eventDate` DATE, IN `eventTime` VARCHAR(20), IN `eventLocation` VARCHAR(255), IN `eventDescriptionIntro` VARCHAR(1000), IN `eventDescriptionBody` VARCHAR(5000), IN `eventFree` TINYINT(4), IN `eventTicketLink` VARCHAR(5000), IN `eventImage` VARCHAR(500), IN `userId` INT(11), IN `genreIds` VARCHAR(255))  BEGIN 
	INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id) VALUES (eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId);
	SET @eventId = (SELECT MAX(event_id) FROM event);
	SET @genresWithEventId = REPLACE(CAST(genreIds AS CHAR), ',', CONCAT(', ', CAST(@eventId AS CHAR), '),('));
    SET @genresWithEventId = CONCAT('(', @genresWithEventId, ', ', @eventId, ')');
    SET @insert = CONCAT('INSERT INTO event_genre (event_id, genre_id) VALUES', @genresWithEventId);
    PREPARE stmt FROM @insert;
    EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createEventWithGenresOLD` (IN `eventName` VARCHAR(255), IN `eventDate` DATE, IN `eventTime` VARCHAR(20), IN `eventLocation` VARCHAR(255), IN `eventDescriptionIntro` VARCHAR(1000), IN `eventDescriptionBody` VARCHAR(5000), IN `eventFree` TINYINT(4), IN `eventTicketLink` VARCHAR(5000), IN `eventImage` VARCHAR(500), IN `userId` INT(11), IN `genreIds` VARCHAR(255))  BEGIN 
	INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id) VALUES (eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId);
	SET @eventId = LAST_INSERT_ID();
	SET @genresWithEventId = REPLACE(genreIds, ',', CONCAT(', ', @eventId, '),('));
    SET @genresWithEventId = CONCAT('(', @genresWithEventId, ', ', @eventId, ')');
    SET @insert = CONCAT('INSERT INTO event_genre VALUES', @genresWithEventId);
    PREPARE stmt FROM @insert;
    EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createEventWithGenresOLD2` (IN `eventName` VARCHAR(255), IN `eventDate` DATE, IN `eventTime` VARCHAR(20), IN `eventLocation` VARCHAR(255), IN `eventDescriptionIntro` VARCHAR(1000), IN `eventDescriptionBody` VARCHAR(5000), IN `eventFree` TINYINT(4), IN `eventTicketLink` VARCHAR(5000), IN `eventImage` VARCHAR(500), IN `userId` INT(11), IN `genreIds` VARCHAR(255))  BEGIN 
	INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id) VALUES (eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId);
	SET @eventId = LAST_INSERT_ID();
	SET @genresWithEventId = REPLACE(CAST(genreIds AS CHAR), ',', CONCAT(', ', CAST(@eventId AS CHAR), '),('));
    SET @genresWithEventId = CONCAT('(', @genresWithEventId, ', ', @eventId, ')');
    SET @insert = CONCAT('INSERT INTO event_genre VALUES', @genresWithEventId);
    PREPARE stmt FROM @insert;
    EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createEventWithGenresOLD3` (IN `eventName` VARCHAR(255), IN `eventDate` DATE, IN `eventTime` VARCHAR(20), IN `eventLocation` VARCHAR(255), IN `eventDescriptionIntro` VARCHAR(1000), IN `eventDescriptionBody` VARCHAR(5000), IN `eventFree` TINYINT(4), IN `eventTicketLink` VARCHAR(5000), IN `eventImage` VARCHAR(500), IN `userId` INT(11), IN `genreIds` VARCHAR(255))  BEGIN 
	INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id) VALUES (eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId);
	SET @eventId = LAST_INSERT_ID();
	SET @genresWithEventId = REPLACE(CAST(genreIds AS CHAR), ',', CONCAT(', ', CAST(@eventId AS CHAR), '),('));
    SET @genresWithEventId = CONCAT('(', @genresWithEventId, ', ', @eventId, ')');
    SET @insert = CONCAT('INSERT INTO event_genre (event_id, genre_id) VALUES', @genresWithEventId);
    PREPARE stmt FROM @insert;
    EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createEventWithGenresOLD4` (IN `eventName` VARCHAR(255), IN `eventDate` DATE, IN `eventTime` VARCHAR(20), IN `eventLocation` VARCHAR(255), IN `eventDescriptionIntro` VARCHAR(1000), IN `eventDescriptionBody` VARCHAR(5000), IN `eventFree` TINYINT(4), IN `eventTicketLink` VARCHAR(5000), IN `eventImage` VARCHAR(500), IN `userId` INT(11), IN `genreIds` VARCHAR(255))  BEGIN 
START TRANSACTION;
	INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id) VALUES (eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId);
	SET @eventId = LAST_INSERT_ID();
	SET @genresWithEventId = REPLACE(CAST(genreIds AS CHAR), ',', CONCAT(', ', CAST(@eventId AS CHAR), '),('));
    SET @genresWithEventId = CONCAT('(', @genresWithEventId, ', ', @eventId, ')');
    SET @insert = CONCAT('INSERT INTO event_genre (event_id, genre_id) VALUES', @genresWithEventId);
    PREPARE stmt FROM @insert;
    EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createEventWithGenresOLD5` (IN `eventName` VARCHAR(255), IN `eventDate` DATE, IN `eventTime` VARCHAR(20), IN `eventLocation` VARCHAR(255), IN `eventDescriptionIntro` VARCHAR(1000), IN `eventDescriptionBody` VARCHAR(5000), IN `eventFree` TINYINT(4), IN `eventTicketLink` VARCHAR(5000), IN `eventImage` VARCHAR(500), IN `userId` INT(11), IN `genreIds` VARCHAR(255))  BEGIN 
START TRANSACTION;
	INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id) VALUES (eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId);
	SET @eventId = (SELECT MAX(event_id) FROM event);
	SET @genresWithEventId = REPLACE(CAST(genreIds AS CHAR), ',', CONCAT(', ', CAST(@eventId AS CHAR), '),('));
    SET @genresWithEventId = CONCAT('(', @genresWithEventId, ', ', @eventId, ')');
    SET @insert = CONCAT('INSERT INTO event_genre (event_id, genre_id) VALUES', @genresWithEventId);
    PREPARE stmt FROM @insert;
    EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventAddComment` (IN `commentBody` VARCHAR(500), IN `commentTime` TIMESTAMP, IN `commentEventId` INT(11), `userId` INT(11))  BEGIN
INSERT INTO comments (event_comment_body, event_comment_time, comment_event_id, user_account_id) VALUES (commentBody, commentTime, commentEventId, userId);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventAddToFeatured` (IN `id` INT(11))  BEGIN
UPDATE event SET event_featured = 1 WHERE event_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventApprove` (IN `id` INT(11))  BEGIN
UPDATE event SET admin_approved = 1 WHERE event_id= id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventAwaitingApproval` ()  BEGIN
SELECT event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img, genre_id FROM event WHERE event.admin_approved = 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventByGenre` (IN `genreId` INT(11))  BEGIN
SELECT genre_id, event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event WHERE genre_id = genreId AND admin_Approved = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventCommentDelete` (IN `commentId` INT(11))  BEGIN
DELETE FROM `comments` WHERE comment_id = commentId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventCreate` (IN `eventName` VARCHAR(255), IN `eventDate` DATE, IN `eventTime` VARCHAR(20), IN `eventLocation` VARCHAR(255), IN `eventDescriptionIntro` VARCHAR(1000), IN `eventDescriptionBody` VARCHAR(5000), IN `eventFree` TINYINT(4), IN `eventTicketLink` VARCHAR(5000), IN `eventImage` VARCHAR(500), IN `userId` INT(11), IN `genreId` INT(11))  BEGIN
INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id, genre_id) VALUES (eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId, genreId);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventDelete` (IN `id` INT(11))  BEGIN
DELETE FROM event WHERE event_id= id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventFeatured` ()  BEGIN
SELECT event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event WHERE event.event_featured = 1 AND event.admin_approved = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventFree` ()  BEGIN
SELECT genre_id, event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event WHERE event.event_free = 1 AND admin_approved = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventGetComments` (IN `id` INT(11))  BEGIN
SELECT comment_id, event_comment_body, event_comment_time, first_name, last_name, user_profile_picture FROM comments JOIN user_account ON comments.user_account_id = user_account.user_account_id WHERE comments.comment_event_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventGetInfo` (IN `id` INT(11))  BEGIN
SELECT * FROM event WHERE event_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventIncreaseInterested` (IN `id` INT(11))  BEGIN
UPDATE event SET event_interested = event_interested + 1 WHERE event_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventRemoveFromFeatured` (IN `id` INT(11))  BEGIN
UPDATE event SET event_featured = 0 WHERE event_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventSortAZ` ()  BEGIN
SELECT * FROM event WHERE admin_approved = 1 ORDER BY event_name ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eventSortByDate` ()  BEGIN
SELECT * FROM event WHERE admin_approved = 1 ORDER BY event_date;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchResults` (IN `searchQuery` VARCHAR(255))  BEGIN
SELECT event.event_name, event.event_date, event.event_time, event.event_img, event.event_location, event.event_id, genre.genre_name FROM event JOIN genre ON genre.genre_id = event.genre_id WHERE genre.genre_name LIKE CONCAT('%', searchQuery, '%') OR event.event_name LIKE CONCAT('%', searchQuery, '%') OR event.event_location LIKE CONCAT('%', searchQuery, '%') GROUP BY event.event_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userAddInterested` (IN `id` INT(11), IN `eventId` INT(11))  BEGIN
INSERT INTO user_events_interested(user_account_id, event_id) VALUES (id, eventId);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userChangeName` (`updatedFirstName` VARCHAR(255), `updatedLastName` VARCHAR(255), `id` INT(11))  BEGIN
UPDATE user_account SET first_name = updatedFirstName, last_name = updatedLastName WHERE user_account_id= id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userChangePassword` (IN `hash` VARCHAR(255), IN `id` INT(11))  BEGIN
UPDATE user_account SET password = hash WHERE user_account_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userDeleteAccount` (IN `id` INT(11))  BEGIN
DELETE FROM `user_account` WHERE user_account_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userDeleteEvent` (IN `id` INT(11))  BEGIN
DELETE FROM `event` WHERE event_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userForgotPassword` (IN `emailId` VARCHAR(255))  BEGIN
SELECT * FROM user_account WHERE email_address = emailId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userGetInfo` (IN `id` INT(11))  BEGIN
SELECT * FROM user_account WHERE user_account_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userInterestedEvents` (IN `id` INT(11))  BEGIN
SELECT event.event_id, event.event_name, event.event_date, event.event_time, event.event_img FROM event JOIN user_events_interested on user_events_interested.event_id = event.event_id WHERE user_events_interested.user_account_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userLogin` (`emailAddress` VARCHAR(255))  BEGIN
SELECT * FROM user_account WHERE email_address = emailAddress;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userPostedEvents` (IN `id` INT(11))  BEGIN
SELECT event.event_id, event.event_name, event.event_date, event.event_time, event.event_img FROM event WHERE user_account_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userRegistration` (IN `firstName` VARCHAR(255), IN `lastName` VARCHAR(255), IN `emailAddress` VARCHAR(255), IN `password` VARCHAR(255))  BEGIN
INSERT INTO user_account (first_name, last_name, email_address, password) VALUES (firstName, lastName, emailAddress, password);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userUpdateBio` (IN `userBio` VARCHAR(500), `id` INT(11))  BEGIN
UPDATE user_account SET user_bio = userBio WHERE user_account_id= id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userUpdateProfilePicture` (IN `userProfilePicture` VARCHAR(500), IN `id` INT(11))  BEGIN
UPDATE user_account SET user_profile_picture = userProfilePicture WHERE user_account_id= id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `event_comment_body` varchar(500) NOT NULL,
  `event_comment_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `comment_event_id` int(11) NOT NULL,
  `user_account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `event_comment_body`, `event_comment_time`, `comment_event_id`, `user_account_id`) VALUES
(26, 'Love Joanne!!', '2022-08-07 21:44:17', 5, 17),
(30, 'So excitedddddddddddddddddddddddd', '2022-08-07 21:47:42', 5, 12),
(31, 'Christy Moore is my absolute favourite.', '2022-08-07 22:27:02', 6, 17),
(32, 'Uncle Colm from Derry Girls!', '2022-08-08 16:34:39', 9, 17),
(35, 'I can\'t wait for this!', '2022-08-10 10:11:40', 8, 12),
(36, 'Already got my ticket', '2022-08-11 19:42:44', 11, 17),
(38, 'Such a talented man, will definitely be getting tickets ASAP', '2022-08-12 13:10:58', 4, 19),
(39, 'Sure to be a great night.', '2022-08-30 16:14:03', 8, 17),
(40, 'hello, love this event!', '2022-09-06 14:33:43', 5, 36),
(41, 'I love Joanne', '2022-09-06 16:09:48', 5, 33);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` varchar(20) NOT NULL,
  `event_location` varchar(255) NOT NULL,
  `event_description_intro` varchar(1000) NOT NULL,
  `event_description_body` varchar(5000) NOT NULL,
  `event_free` tinyint(4) NOT NULL,
  `event_ticket_link` varchar(5000) NOT NULL,
  `event_img` varchar(500) DEFAULT NULL,
  `event_featured` tinyint(4) NOT NULL,
  `event_interested` int(11) NOT NULL,
  `user_account_id` int(11) NOT NULL,
  `admin_approved` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `event_name`, `genre_id`, `event_date`, `event_time`, `event_location`, `event_description_intro`, `event_description_body`, `event_free`, `event_ticket_link`, `event_img`, `event_featured`, `event_interested`, `user_account_id`, `admin_approved`) VALUES
(4, 'Andrea Bocelli', 16, '2022-09-22', '8pm', 'SSE Arena Belfast', 'The world’s most beloved tenor, Andrea Bocelli, has announced a welcome return to the UK and Ireland in September and October 2022. Bocelli will be visiting Liverpool, Glasgow, Belfast, Birmingham and Sheffield and will also be performing rescheduled show dates in Dublin and at The O2 London.', 'Musically gifted from birth, Andrea Bocelli is one of the most celebrated singers in modern history, performing at major international events including the Olympic Games and the World Cup, as well as his own sell-out arena shows around the world. He has a Golden Globe, seven Classical BRITs and seven World Music Awards under his belt, plus a star on the Hollywood Walk of Fame. His 2018 album release, Si, reached No.1 in both the US and UK charts.\r\n\r\nDespite the global pandemic in 2020, Bocelli was able to create new music – his album Believe contains an uplifting personal collection of songs celebrating the power of music to soothe the soul – as well as reaching new audiences around the world through online streams. The Italian multi-instrumentalist performed live in his home nation from the iconic venues of Teatro Regio di Parma and Duomo Cathedral in Milan, the latter with over 3 million concurrent online viewers, making it the largest simultaneous audience for a classical livestream in YouTube history.\r\n\r\nWith a decorated career spanning more than a quarter of a century, having amassed millions of fans around the world with his emotive and instantly recognisable voice, Bocelli has collaborated with a host of A-list stars including Luciano Pavarotti, Ariana Grande, Jennifer Lopez, Christina Aguilera, Ed Sheeran, Dua Lipa, Céline Dion, Alison Krauss, Tony Bennett and many more.\r\n\r\nUltimately, Bocelli understands that all music is good for the soul in a way that taps into the most subtle nuances of humanity, irrespective of individual belief: “Good music brings with it a powerful message of peace and fellowship, teaching us about beauty, and helping us to open our hearts and minds.”\r\n\r\nAndrea Bocelli Foundation is proud to partner with PLUS1 ensuring that for every ticket sold, £1 will support \"ABF Educational Projects\" in Haiti, empowering children from the most vulnerable areas of the Country, offering them the opportunity to express their true potential.www.andreabocellifoundation.org', 0, 'https://www.ssearenabelfast.com/whats-on/andrea-bocelli-1', 'DC613CAB-2B6A-45F5-9F69-58798118DA86_600x600.webp', 0, 467, 0, 1),
(5, 'Joanne McNally - The Prosecco Express', 17, '2022-10-14', '8pm', 'SSE Arena Belfast', 'With 5 sold out shows at The Limelight Belfast this March, JOANNE MCNALLY is pleased to announce an SSE Arena Belfast show on The Prosecco Express Tour!', 'Described as \'a truly gifted stand up\' by The Sunday Times, join Joanne as she revisits her irreverent and critically acclaimed show The Prosecco Express.\r\n\r\nDue to a relentless ageing process, Joanne is suddenly in her late thirties with no husband, no kids, no pension and no plan. She is full of questions: if she doesn’t birth anything, who will be obligated to watch her die so she doesn’t have to do it alone? Can she start a GoFundMe page to get a golden tomb built for single people to get buried in together, or do we all just get thrown into a mass grave and covered in cat hair? When a man on a dating app identifies as \'spiritual\', is it safe to assume he has the personality of a spoon? If you do all your drinking in the bath, can you write it off as self-care?', 0, 'https://www.ssearenabelfast.com/whats-on/joanne-mcnally-the-prosecco-express', 'JoanneMcNally_HR_1-min-1125x1125.jpg', 1, 938, 0, 1),
(6, 'Christy Moore - Flying Into Mystery Live', 16, '2022-10-03', '8pm', 'Waterfront Hall Belfast', 'Irish music icon, Christy Moore, is returning to the Waterfront Hall, Belfast, this October, showcasing his latest album Flying into Mystery.', 'One of the most compelling and inspirational musicians Ireland has ever seen, Christy Moore has a universal fan base and still continues to entertain; cementing him as an Irish icon. It is his deep urge to connect with the listener and to transmit the meaning of the songs he sings that has endeared him to audiences of all ages.\r\n\r\nChristy Moore released his new album Flying into Mystery, worldwide on the 19 November 2021.\r\n\r\nFeaturing 12 songs, the album is a collection that Christy has brought to life through his distinctive writing and unique interpretation of other Artists\' songs.', 0, 'https://www.ulsterhall.co.uk/what-s-on/christy-moore/', '3EPSHKXVBUCFJCWDI6UGU6D6RU.jpg', 0, 566, 0, 1),
(7, 'Christy Moore - Flying Into Mystery Live', 16, '2022-10-05', '8pm', 'Waterfront Hall Belfast', 'Irish music icon, Christy Moore, is returning to the Waterfront Hall, Belfast, this October, showcasing his latest album Flying into Mystery.', 'One of the most compelling and inspirational musicians Ireland has ever seen, Christy Moore has a universal fan base and still continues to entertain; cementing him as an Irish icon. It is his deep urge to connect with the listener and to transmit the meaning of the songs he sings that has endeared him to audiences of all ages.\r\n\r\nChristy Moore released his new album Flying into Mystery, worldwide on the 19 November 2021.\r\n\r\nFeaturing 12 songs, the album is a collection that Christy has brought to life through his distinctive writing and unique interpretation of other Artists\' songs.', 0, 'https://www.ulsterhall.co.uk/what-s-on/christy-moore/', '3EPSHKXVBUCFJCWDI6UGU6D6RU.jpg', 0, 389, 0, 1),
(8, 'Clubland Halloween', 19, '2022-10-29', '7pm', 'SSE Arena Belfast', 'Clubland Live returns to Belfast for their BIGGEST EVER, LIVE show to date.', 'Saturday 29th October sees the UK\'s leading dance brand take over The SSE Arena, Belfast with a Halloween special - ‘Dia De Los Muertos’ will be showcasing some of the biggest acts in Clubland, full line up to be released soon!\r\n\r\n#ClublandLiveBelfast #DayOfTheDead #NotoriousBrands #ClublandEvents\r\n\r\nThe lineup, when finalised, will read like the premiere league of commercial dance music. Tickets are £39.50 (including booking fee), and go on sale Friday 1 July via Ticketmaster IE.\r\n\r\nPlease note: This event is for strictly over 18\'s - valid photographic ID is required (passport or driving license only). Line up subject to change. Tickets limited to 20 per person.\r\n\r\nDoors will open at 6:30PM, with the show beginning at 7PM and ending at midnight.', 0, 'https://www.ssearenabelfast.com/whats-on/clubland-halloween', 'Clubland-Belfast-DOD-Website-Desktop-1600x900.jpg', 0, 798, 0, 1),
(9, 'Kevin McAleer Live at Mandela', 17, '2022-10-15', '7pm', 'Mandela Hall Belfast', 'A not to be missed live show from the one and only Kevin McAleer.', 'Kevin McAleer’s Uncle Colm persona in Derry Girls has brought a whole new wave of followers to his latest live show, where they are fast discovering what the regulars have known for years - the Tyrone space cadet’s legendary command of language, timing and delivery remains razor sharp, and his timeless brand of pure balderdash is funnier than ever. In “Why am I here”, McAleer asks the big questions and comes up with some deeply stupid answers. If you’re expecting to be bored, you’ll be disappointed.', 0, 'https://www.glistrr.com/events/e/kevin-mcaleer-live-at-mandela-hall-32-203?cb=', 'Media,1377487,smxx-800x420.jpg', 0, 498, 0, 1),
(10, 'Sarah Millican - Bobby Dazzler', 17, '2022-12-15', '7.30pm', 'Millenium Forum Derry', 'The hilarious Sarah Millican is back on tour with a Bobby Dazzler of a new stand-up show.', 'In this, her sixth international tour, you\'ll learn about what happens when your mouth seals shut, how to throw poo over a wall, trying to lose weight but only losing the tip of your finger, a surprisingly funny smear test, and how truly awful a flotation tank can actually be.', 0, 'https://www.millenniumforum.co.uk/shows/sarah-millican-bobby-dazzler/', '96099542a6b82174c3ef56516cf2a2f2a6f27e34.png', 1, 767, 0, 1),
(11, 'Comic Con 2022 Belfast', 24, '2022-09-17', '11.30am', 'Eikon Exhibition Centre', 'Andy Kleek and the Monopoly Events team are proud to bring you Comic Con Northern Ireland 2022!', 'It gives us great pleasure to announce our new venue for Comic Con Northern Ireland which will take place on the weekend of 17-18 September 2022.\r\n\r\n​\r\n\r\nEikon Centre Belfast is the new home of Comic Con Northern Ireland, and tickets are on sale NOW!\r\n\r\n \r\n\r\nEikon Exhibition Centre is Northern Ireland’s largest events campus, conveniently located beside the main arterial routes to Belfast and Dublin, and has a diverse range of facilities on offer. We have chosen a location and venue that we can grow and develop into and make this the nation\'s flagship show, which all of Northern Ireland\'s people can be proud of.\r\n\r\n \r\n\r\nThe first Comic Con Northern Ireland promises to be an event to remember for comic, tv, and film culture fans across the globe as we bring you a phenomenal guest line-up including Originals, Vampire Diaries, and Legacies stars Candice King, Daniel Gillies, Michael Trevino, and Michael Malarky, Sons of Anarchy stars Kim Coates, and Mark Boone Jr, The Walking Dead stars Chandler Riggs, Steven Ogg, and Katelyn Nacon, Gotham stars Robin Lord Taylor, Cameron Monaghan, and David Mazouz, Gossip Girl star Ed Westwick, Lucifer stars DB Woodside, and Lesley Ann Brandt, Impractical Joker James Murray, and soccer star Keith Gillespie. We have an 80\'s and 90s throwback with Battlestar Galactica and A-Team legend Dirk Benedict, and Gremlins star Zach Galligan as well as Fresh Prince cast members Karyn Parsons, and Tatyana Ali. Also joining us will be The Crow star Bai Ling, Power Ranger Jason Faunt, voice acting legends Monica Rial, Tia Ballard, Brina Palencia, Zach Aguilar, Star Wars alumni Andy Seycombe, Femi Taylor, Tim Rose, and Paul Blake!', 0, 'https://www.comicconnorthernireland.co.uk/tickets', '98001283_544804839543319_466683574356017152_n.jpg', 0, 322, 0, 1),
(12, 'Biffy Clyro', 16, '2022-11-09', '6.30pm', 'SSE Arena Belfast', 'Off the back of their sensational return as headliners to this year\'s Download festival last weekend, Biffy Clyro today reveal details of their UK & Ireland arena tour, including The SSE Arena Belfast, with special guests Architects.', 'The tour announcement comes in the wake of glowing reviews from their incredible performance at Download Festival. Their second time topping the bill at Donnington, they once again proved themselves as top tier headliners filling their set with material from 2020’s ‘A Celebration Of Endings’, 2021’s ‘The Myth Of The Happily Ever After’ and a host of huge tracks from their extensive catalogue. This tour will undoubtedly demonstrate to fans once more how Biffy Clyro\'s reputation as one of Britain’s best live acts remains steadfast, Kerrang! concluding “nobody does it better than Biffy Clyro” following the band’s 2021 headline set at Reading Festival.\r\n\r\nAbout the tour, Biffy Clyro said – \"It\'s been way too long... we are so excited to announce our tour of UK/Ireland this November and over the moon to have Architects join us on what is going to be a very special tour. You will not want to miss it”', 0, 'https://www.ssearenabelfast.com/whats-on/biffy-clyro-2022', 'Biffy.webp', 0, 778, 0, 1),
(13, 'Irish Vegan Festival', 25, '2022-10-22', '10.30-5pm', 'Everglades Hotel Derry', 'The Irish Vegan Festival is back!', 'We will host more than 60 all vegan stalls serving delicious world foods and drinks and selling quirky clothes and accessories, bags, and cosmetics; fantastic campaign stalls, special guest speakers, and educational documentaries about how our food choices effect our environment, health, and animal welfare. VIP tickets for £15 include early entry and a goodie bag filled with vegan treats. £3 Advanced tickets. Under age 16 go free. Tickets will also be available at the door.\r\n\r\nVolunteers needed! If you’re interested in helping out at this event or to host a stall, please contact fundraising@farplace.org.uk or fundriaisingassisstant@farplace.org.uk. We offer free entry and a soya hotdog to all those who support raising funds for Farplace Animal Rescue.', 1, '', 'Irish-vegan-Logo-1000-px-300x291.jpg', 0, 124, 0, 1),
(19, 'Nature Kid\'s Club at Broughgammon Farm', 20, '2022-09-24', '11am - 12pm', '50 Straid Road, Ballycastle, County Antrim, BT54 6NP', 'Get wild at the Nature Kid\'s Club at Broughgammon Farm!', 'Discover amazing things in nature, go on wild sensory walks and make nature crafts in this forest school inspired kid\'s club. Adaptable for all ages but recommended from 3 -10 years old. Parents are required to stay with their child/children during the duration of the club, there is an onsite cafe, toilet facilities, shop and the farm is also open to wander around afterwards.', 0, 'https://www.broughgammon.com/events/', 'naturekids.jpg', 1, 79, 0, 1),
(20, 'Foraging on the Farm', 20, '2022-09-18', '11am - 1pm', '50 Straid Road, Ballycastle, County Antrim, BT54 6NP', 'Come and discover the delicious wild food that grows in our hedgerows, coppiced woodland, garden and meadows. ', 'Run by Dermot from Forage Ireland and Becky Cole, gardener and herbalist at Broughgammon Farm, you will learn how to safely forage for wild food, learn some of the folklore of plants and wild remedies that grow on our doorsteps. The walk starts at 11am and runs for about 2 hours. There are samples of wild food at the start of the event. The farm cafe and shop is open until 4pm.', 0, 'https://www.broughgammon.com/events/', 'foragingfarm.jpg', 0, 85, 0, 1),
(21, 'Rock In The Mournes', 21, '2022-10-08', '9am - 4.30pm', 'Carrick Cottage Cafe, 204 Head Road, Annalong, BT34 4RJ', 'Immerse yourself in the majestic Mourne Mountains for a full day of exhilarating activities you\'ll always remember. This exciting mountain day combines some easy yet beautiful hiking into the heart of the Mourne Mountains, followed by some new and exciting adventure activities you may not have tried before, guaranteed to leave you buzzing to be in the great outdoors!', 'Hike: Starting at the beautiful Carrick Cottage Cafe, you set off gently up the trail head for approximately 5km, guided by local Mountain Leader and Earth Scientist, James, who passes on amazing geological and historical knowledge of the Mournes area. After a relaxing hike surrounded by the biggest peaks in Northern Ireland, you have a short, steep hike that leads to the base of the 50 metre cliff where you spend the rest of the day.\r\n​\r\nCave: ​After a short re-fuelling break, you put on your helmet and harness, listen to a safety brief and then get ready to go to the cliff top the interesting way - by squeezing through a narrow constriction in the side of the mountain and then wriggling up through it to the summit - AMAZING!  The cave element is about 10 metres horizontally and then another 10 metres or so vertically, and although our team will guide you safely through it, this section is totally optional and can be avoided if it\'s not your thing.\r\n​\r\nAbseil: ​Once on the cliff top, you once again take in the stunning views over the Mourne Mountains, looking to Slieve Donard (Northern Ireland\'s highest peak), Binnian, Lamagan and the Annalong Valley southwards. Next, you get strapped in to two safety ropes and after a short safety brief start your descent back to the base which is over 150 feet (50 metres) from top to bottom! You\'re in the driver\'s seat, totally controlling your descent, but don\'t worry, our qualified Rock Climbing Instructors will keep you safe on a safety rope that they are in charge of at all times. It\'s the best way to get back to the ground - what a buzz!\r\n​\r\nClimb: After this big thrill, you spend a bit of time focussing your mind and body in a state of \"active meditation\", by learning some rock climbing skills as you scale back up the cliff you just came down. Your focus is 100% on the task at hand and everything else simply goes away for the time that you\'re on the rock. Simultaneously an adrenaline filled and relaxing experience, this unique activity has to be tried to be understood. After an awe inspiring day in the mountains, you walk back out to Carrick Cottage, where there are local traybakes, coffees and tea made by local cafe owner Rachel, whose family have lived in the area for generations.\r\n​\r\nAn experience day not to be missed!', 0, 'https://www.geologyrocksat.com/hike-cave-climb-abseil-experience', 'rockmournes.jpg', 0, 2249, 0, 1),
(22, 'Sunrise Yoga on Devenish Island Experience', 18, '2022-09-10', '6am', '\r\nTrory Jetty, Enniskillen, County Fermanagh, BT74 4YE', 'Welcome the new day the right way with yoga and a light breakfast in the most tranquil parts of Lough Erne. Breathe in the dawn air as you take a boat trip across the still Lough Erne waters to Devenish Island. Move mindfully through every pose on our island yoga lawn, and marvel as the sun rises above the horizon right in front of us. Pause while the silence fills your mind and the breath strengthens your body, then enjoy a light breakfast inspired by the simple way of life of the monks who once lived and thrived on this quiet island. Finish the morning with a tour where you will discover more about the hidden history of life on Devenish.', 'What to expect:\r\n\r\nDepart from Trory Jetty across to Devenish Island enjoying the peace and tranquillity with Erne Water Taxis\r\n\r\nEnjoy a slow gentle mediative walk to our yoga positioning under the protection of the Round Tower\r\n\r\nCatch the sunrise over hill in front while you relax into 70mins Yoga & relaxation\r\n\r\nSavour a healthy breakfast and refreshments on the Island inspired by the inhabitants of days gone by.\r\n\r\nExperience ends with a tour around Island with local storyteller.', 0, 'https://www.aurorayogastudio.co.uk/', 'sunriseyoga.jpg', 1, 46, 0, 1),
(23, 'Strand Arts Centre - EHOD 2022', 22, '2022-09-11', '10am - 1pm', '152-154 Holywood Road, Belfast, County Antrim, BT4 1NY', 'The Strand Cinema opened its doors on 7 December 1935, with one screen and 1170 seats. It has evolved over the years and taken on many guises including ‘picturehouse’, variety theatre, four screen multiplex, and arts centre incorporating a cinema. Today, the Strand holds the label of the oldest surviving cinema in Northern Ireland.', 'Join us on Sunday morning to explore the building, take a peek into our projection booths, and uncover the fascinating history of this iconic venue. You’ll also get a chance to learn more about our ongoing ‘Strand Stories’ project, supported by The National Lottery Heritage Fund.\r\n\r\nThere will be lots of activities for kids, including ‘scavenger hunts’ around the building!\r\n\r\nGuided tours will take place at 11am and 12pm. Booking is advised. Book a place on a tour by emailing our Heritage Officer, Rosie Hickey, at rosie@strandartscentre.com', 0, 'https://www.eventbrite.co.uk/e/strand-arts-centre-virtual-tour-ehod-tickets-156710566523', 'strandarts.jpg', 0, 78, 0, 1),
(24, 'Paddington 2 — Newcastle Community Cinema', 23, '2022-09-15', '6pm', 'St Mary\'s Hall Main Street, Newcastle', 'Tickets are now available for Paddington 2 at Newcastle Community Cinema , County Down on Thu 15 Sep 2022 at 6:00PM. ', 'Please note tickets must be booked in advance.', 0, 'https://www.ticketsource.co.uk/whats-on/county-down/newcastle-community-cinema/paddington-2/e-zdmere', '3a942f03a7946e6c4da616d675ad13bf.jpg', 0, 36, 0, 1),
(33, 'Belfast Championship Dog Show', 20, '2022-09-24', '9am-6pm', 'Eikon Exhibition Centre', 'This dog show is an exciting way to meet other dog owners, to socialise your pet, and test his/her abilities should you choose to enter.  They also represent a great opportunity to get up-to-date information on caring and training for dogs.  The show takes place at the Eikon Exhibiton Centre, Lisburn.', 'The show will feature agility tests, obedience tests and working tests.  This show normally has over 2,000 entrants and different judges will choose the best in breeds and the coveted BEST IN SHOW Award.\r\n\r\nA vast variety of trade stands will also be available where you can buy anything from leads and collars to dog food and dog beds to health products.\r\n\r\nWe welcome the public to the show but ONLY DOGS ENTERED may be at the venue during the event.  Admission £10 per vehicle and pay on arrival.', 0, '', 'dogshow.jpg', 0, 237, 17, 1),
(60, 'MAMMA MIA!', 24, '2022-11-08', '7.30pm', 'Grand Opera House Belfast', 'A mother. A daughter. 3 possible dads and a trip down the aisle you’ll never forget!', 'Join us at MAMMA MIA! for the must-see musical of the year in the newly restored Grand Opera House, and enjoy the ultimate feel-good show from 8th November 2022 for 3 weeks only!\n\nSet on a beautiful Greek island, MAMMA MIA! is a story of love, friendship and identity told through the timeless songs of ABBA.\n\nSophie’s quest to discover the father she’s never known brings her mother face to face with three men from her distant romantic past on the eve of a wedding they’ll never forget.\n\nOver 65 million people all around the world have fallen in love with the characters, the story and the music that make MAMMA MIA! such a sensation.\n\nWhatever age you are, you can’t help but have the time of your life at MAMMA MIA!', 0, 'https://www.goh.co.uk/book-now/31001/', '228f398a72f0451e1dfa6f4ff04133d0.jpg', 0, 490, 12, 0),
(67, 'Fairground', 20, '2022-10-27', '9pm', 'Eikon Exhibition Centre', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 1, '', '1662480938931.jpg', 0, 0, 33, 0);

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `genre_name`) VALUES
(16, 'Music'),
(17, 'Comedy'),
(18, 'Sight-seeing'),
(19, 'Nightlife'),
(20, 'Family Events'),
(21, 'Sport'),
(22, 'Art'),
(23, 'Film'),
(24, 'Entertainment'),
(25, 'Food');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `user_account_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_profile_picture` varchar(500) NOT NULL,
  `user_bio` varchar(500) NOT NULL,
  `admin_status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`user_account_id`, `first_name`, `last_name`, `email_address`, `password`, `user_profile_picture`, `user_bio`, `admin_status`) VALUES
(6, 'Luna', 'Lovegood', 'lloveyyy@gmail.com', '$2b$10$fqwYa.Waah72Iy.IFgWhyegr6rmwThKCg.1KlMLpi7FW0n4lAGppe', '', '', 0),
(11, 'Lucy', 'Smith', 'lucyloo@gmail.com', '$2b$10$FbomRqna9zOEE3SSM4mhpeV7jRbbNgjf2QAxChT5qZGBh76NoqP/G', '', '', 0),
(12, 'Louise', 'Smith', 'lsmith1234444@gmail.com', '$2b$10$N4SrQr0k5sqPpM8uC1zrkuptUErCVkThqlfJB3TW2bJxEB2Ysfm8y', '1662070193260.jpg', 'hello there', 0),
(16, 'Rupert', 'Grint', 'rupert@gmail.com', '$2b$10$WAN1xq54ibZUrja7GArrUef1B.QncuSgwteKZItNHw0Z1DXEOTnQu', '', '', 0),
(17, 'Jonny', 'Johnston', 'jonnyboy@outlook.com', '$2b$10$xRP4G9FklhF4b1pFkXWLaugkxBDlaTp2gTRsc1SHqOpniU9a95oE.', '1661885550640.jpg', 'bio change test', 0),
(19, 'Thomas', 'Holland', 'spidermanfan@outlook.com', '$2b$10$VhpgGqPA2vx5edBPhwd5rux5vKnp3osW2ENM/GV5A4CC3OFuXwggC', '', 'Just a spiderman fanatic who loves concerts and comedy gigs. Not much else to see here.', 0),
(20, 'Teresa', 'Green', 'teresa45@gmail.com', '$2b$10$2ZQCafnH7kBbRpPOue1Lcer0p2CZaPZ4mB6.UfskrrryczWKuQmui', '', '', 0),
(21, 'Joe', 'Bloggs', 'joebloggs@gmail.com', '$2b$10$6QuQaLw.idm0XnQA7xkdpet61Fai1wK4OJVie0ZFcc1miKqnAqH6y', '1661613066922.jpg', 'Love nature and hiking. Super excited for this year\'s Rock The Mournes!', 1),
(22, 'Jenny', 'Franklin', 'jennygirl01@outlook.com', '$2b$10$6IzFqyFpIvWm98jJ9bPxjObojxuvSVhpyGbMKzSC6SZKXddShU4ui', '', '', 0),
(23, 'Elizabeth', 'Kelly', 'lizkelly@gmail.com', '$2b$10$SXmgtLjV4IHR1TePwM9I9.WCFHrJSmEb/BDCWyUt4PZ7/NH.YxF82', '', '', 0),
(24, 'Nuala', 'Matthews', 'nunu17@gmail.com', '$2b$10$e679EDYma6MI7/u4IwGrw.jcEkTfIT4qSEG1LxOowLUdhchEWKdmC', '', '', 0),
(25, 'Brian', 'Connolly', 'brianc6@gmail.com', '$2b$10$1MXvaXKJL3voVXPEqHqxPeeWZdStRYSc/KJfOyZlZRGPvSu4aF3tC', '', 'Brian, 26, massive fan of all things sport and outdoors. Love to see what events are coming up in NI.', 0),
(33, 'Jonny ', 'Smith', 'eventureprojecttest@gmail.com', '$2b$10$eZeQXrwUg3rLnMaBWuHCuOx0HTbThWV2FZcI8/iH4JepJ6m.DN61W', '1662480548376.jpg', 'hello everyone!', 0),
(34, 'Caroline', 'Forbes', 'sweetcaroline15@gmail.com', '$2b$10$lZB26US/wV26rU3aZL2ImOrwzxGwzu6G6cBm.39VJE.0zwCD9TUy6', '', '', 0),
(36, 'jo', 'jooooo', 'kbridges@gmail.com', '$2b$10$zhqoxY2qNxQv35ZXuK2Bb.BXnF5refb81lu.6fgbb9km3TPfb7Ggu', '1662474657381.jpg', 'hello everyone', 0),
(38, 'Gerry', 'Jones', 'gjones@gmail.com', '$2b$10$q.1jT2Qxt8/7yzlYWAqf/.wbXwdyqdOwytHdXCIz.xflzl5yIVhP6', '', '', 0),
(39, 'Tom', 'Jones', 'tjones@gmail.com', '$2b$10$N5Klm49d2baK/w9ydImPO.IcV11gPQUUAvoHnxQVV1UbmTsmJCyIO', '', '', 0),
(40, 'Rupert', 'Grint', 'rupert@gmail.com', '$2b$10$uxHe/suYjfzVrkJCtDIqSOdyDZ0A4wTWPR6bV3u6NPMVHJg8ojsxG', '', '', 0),
(58, 'test', 'test', 'test_email@email.com', '$2b$10$Ga42eIG1aZEFVqRTU8iYM.f57Bt1KJq/TlxW0h9SuCVbYx8Ivl6Pi', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_events_interested`
--

CREATE TABLE `user_events_interested` (
  `user_events_interested_id` int(11) NOT NULL,
  `user_account_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_events_interested`
--

INSERT INTO `user_events_interested` (`user_events_interested_id`, `user_account_id`, `event_id`) VALUES
(1, 17, 6),
(2, 17, 10),
(7, 17, 5),
(13, 17, 9),
(14, 17, 4),
(16, 17, 13),
(17, 17, 24),
(18, 12, 10),
(19, 12, 9),
(20, 12, 22),
(22, 12, 21),
(25, 12, 23),
(26, 12, 33),
(2214, 21, 4),
(2216, 12, 20),
(2217, 36, 4),
(2218, 33, 5),
(2219, 40, 5),
(2223, 58, 5),
(2228, 58, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`user_account_id`);

--
-- Indexes for table `user_events_interested`
--
ALTER TABLE `user_events_interested`
  ADD PRIMARY KEY (`user_events_interested_id`),
  ADD KEY `user_user_events_interested` (`user_account_id`) USING BTREE,
  ADD KEY `events_user_events_interested` (`event_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `user_account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `user_events_interested`
--
ALTER TABLE `user_events_interested`
  MODIFY `user_events_interested_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2229;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_events_interested`
--
ALTER TABLE `user_events_interested`
  ADD CONSTRAINT `events_user_events_going` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`),
  ADD CONSTRAINT `user_user_events_going` FOREIGN KEY (`user_account_id`) REFERENCES `user_account` (`user_account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-28 12:52:33
-- 服务器版本： 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_four2nine`
--

-- --------------------------------------------------------

--
-- 表的结构 `tb_admin`
--

CREATE TABLE `tb_admin` (
  `id`            INT(10) UNSIGNED NOT NULL,
  `token`         VARCHAR(60)      NOT NULL,
  `username`      VARCHAR(20)      NOT NULL,
  `password`      VARCHAR(60)      NOT NULL,
  `is_active`     INT(1)           NOT NULL DEFAULT '1',
  `is_boss`       INT(1)           NOT NULL DEFAULT '0',
  `register_time` TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- 转存表中的数据 `tb_admin`
--

INSERT INTO `tb_admin` (`id`, `token`, `username`, `password`, `is_active`, `is_boss`, `register_time`) VALUES
  (1, 'ef90b6341c3009b205da6eaeecfe948e', 'intelshare', 'df3a614484eb775d575e42691e6991c5', 1, 1,
   '2017-03-28 01:41:18');

-- --------------------------------------------------------

--
-- 表的结构 `tb_apply`
--

CREATE TABLE `tb_apply` (
  `id`                             BIGINT(20) UNSIGNED NOT NULL,
  `user_id`                        BIGINT(20)          NOT NULL
  COMMENT '会员id',
  `project_id`                     INT(11)             NOT NULL,
  `name`                           VARCHAR(20)         NOT NULL,
  `gender`                         INT(1)              NOT NULL,
  `nationality`                    VARCHAR(20)         NOT NULL,
  `phone_number`                   VARCHAR(20)         NOT NULL,
  `email`                          VARCHAR(40)         NOT NULL,
  `wechat`                         VARCHAR(30)         NOT NULL,
  `id_card_number`                 VARCHAR(20)         NOT NULL,
  `passport_number`                VARCHAR(30)         NOT NULL,
  `province`                       VARCHAR(15)         NOT NULL,
  `post_address`                   VARCHAR(100)        NOT NULL,
  `city_of_departure`              VARCHAR(10)         NOT NULL,
  `emergency_contact_name`         VARCHAR(10)         NOT NULL,
  `emergency_contact_phone_number` VARCHAR(20)         NOT NULL,
  `occupation`                     INT(1) UNSIGNED     NOT NULL
  COMMENT '您的身份（高中生/大学生/工作）',
  `duration`                       INT(1) UNSIGNED     NOT NULL
  COMMENT '项目时长(周)',
  `start_date`                     VARCHAR(20)         NOT NULL
  COMMENT '预计项目开始时间',
  `diet_requirement`               VARCHAR(100)        NOT NULL
  COMMENT '饮食要求',
  `is_medical_history`             INT(1)              NOT NULL
  COMMENT '有无历史重大疾病',
  `medical_history`                VARCHAR(500)        NOT NULL
  COMMENT '重大历史疾病',
  `is_first_go_abroad`             INT(1)              NOT NULL
  COMMENT '是否是第一次出国',
  `english_level`                  INT(1)              NOT NULL
  COMMENT '英语水平(例如大学英语四级、高中)',
  `is_need_insurance`              INT(1)              NOT NULL
  COMMENT '是否需要签证保险业协助办理',
  `is_apply_interview`             INT(1)              NOT NULL
  COMMENT '是否申请面试',
  `interview_date`                 VARCHAR(20)         NOT NULL
  COMMENT '合适的面试时间',
  `status`                         INT(1) UNSIGNED     NOT NULL DEFAULT '0',
  `apply_time`                     TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tb_city`
--

CREATE TABLE `tb_city` (
  `id`           BIGINT(20)  NOT NULL,
  `name`         VARCHAR(50) NOT NULL,
  `parent_id`    BIGINT(20)  NOT NULL DEFAULT '0',
  `is_avaliable` INT(1)      NOT NULL DEFAULT '1'
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tb_industry`
--

CREATE TABLE `tb_industry` (
  `id`            BIGINT(20)  NOT NULL,
  `industry_name` VARCHAR(20) NOT NULL,
  `description`   VARCHAR(200)         DEFAULT NULL,
  `parent_id`     BIGINT(20)  NOT NULL DEFAULT '0',
  `is_avaliable`  INT(1)      NOT NULL DEFAULT '1'
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tb_message`
--

CREATE TABLE `tb_message` (
  `id`           INT(10)       NOT NULL,
  `name`         VARCHAR(100)  NOT NULL,
  `content`      VARCHAR(2000) NOT NULL,
  `ip`           VARCHAR(60)   NOT NULL,
  `publish_time` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email`        VARCHAR(100)  NOT NULL,
  `is_solved`    INT(1)        NOT NULL DEFAULT '0'
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tb_news`
--

CREATE TABLE `tb_news` (
  `id`           INT(10) UNSIGNED NOT NULL,
  `title`        VARCHAR(60)      NOT NULL,
  `content`      TEXT             NOT NULL,
  `publish_time` TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_path`   VARCHAR(2000)    NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tb_project`
--

CREATE TABLE `tb_project` (
  `id`          INT(10)          NOT NULL,
  `acpname`     VARCHAR(50)      NOT NULL,
  `acpcity`     VARCHAR(30)      NOT NULL,
  `acpdate`     VARCHAR(50)      NOT NULL,
  `acpday`      INT(10) UNSIGNED NOT NULL,
  `acptheme`    VARCHAR(500)     NOT NULL,
  `acpbright`   VARCHAR(2000)    NOT NULL,
  `acpmean`     VARCHAR(2000)    NOT NULL,
  `acpdetail`   TEXT             NOT NULL,
  `acptip`      TEXT             NOT NULL,
  `acppicture`  VARCHAR(2000)    NOT NULL,
  `acpfilepath` VARCHAR(200)              DEFAULT NULL,
  `acppushdate` TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `acpistop`    INT(10)                   DEFAULT NULL,
  `acpbf`       VARCHAR(500)              DEFAULT NULL,
  `acpfinal`    VARCHAR(1000)             DEFAULT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tb_service`
--

CREATE TABLE `tb_service` (
  `id`                   BIGINT(20)   NOT NULL,
  `company_name`         VARCHAR(100) NOT NULL,
  `company_website`      VARCHAR(100) NOT NULL,
  `contact_name`         VARCHAR(10)  NOT NULL,
  `contact_phone_number` VARCHAR(20)  NOT NULL,
  `contact_email`        VARCHAR(100) NOT NULL,
  `service_description`  TEXT         NOT NULL,
  `apply_time`           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_pass`              INT(1)       NOT NULL DEFAULT '0',
  `service_type`         INT(11)               DEFAULT NULL,
  `service_city`         INT(11)               DEFAULT NULL,
  `industry`             INT(11)               DEFAULT NULL,
  `company_logo`         VARCHAR(200)          DEFAULT NULL,
  `service_price`        INT(11)      NOT NULL DEFAULT '-1',
  `view_count`           BIGINT(20)   NOT NULL DEFAULT '0',
  `banner_image`         VARCHAR(200)          DEFAULT NULL,
  `banner_text`          TEXT,
  `service_detail_image` VARCHAR(200)          DEFAULT NULL,
  `additional`           TEXT,
  `is_complete`          INT(1)       NOT NULL DEFAULT '0'
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- 转存表中的数据 `tb_service`
--

INSERT INTO `tb_service` (`id`, `company_name`, `company_website`, `contact_name`, `contact_phone_number`, `contact_email`, `service_description`, `apply_time`, `is_pass`, `service_type`, `service_city`, `industry`, `company_logo`, `service_price`, `view_count`, `banner_image`, `banner_text`, `service_detail_image`, `additional`, `is_complete`)
VALUES
  (1, 'Four2Nine', 'www.four2nine.com', 'liuyang', '110', 'liuyang@f2n.com', '要什么服务都有', '2017-03-28 10:50:09', 1, NULL,
      NULL, NULL, NULL, -1, 0, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- 表的结构 `tb_service_type`
--

CREATE TABLE `tb_service_type` (
  `id`           BIGINT(20)  NOT NULL,
  `type_name`    VARCHAR(20) NOT NULL,
  `description`  VARCHAR(200)         DEFAULT NULL,
  `parent_id`    BIGINT(20)  NOT NULL DEFAULT '0',
  `is_avaliable` INT(1)      NOT NULL DEFAULT '1'
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tb_slider`
--

CREATE TABLE `tb_slider` (
  `id`       INT(10) UNSIGNED NOT NULL,
  `img_path` VARCHAR(100)     NOT NULL,
  `title`    VARCHAR(100)     NOT NULL,
  `subtitle` VARCHAR(300)     NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- 转存表中的数据 `tb_slider`
--

INSERT INTO `tb_slider` (`id`, `img_path`, `title`, `subtitle`) VALUES
  (1, 'bg1.jpg', 'Amarasiri Coordinator''s Project(ACP)', '向导Amara的英雄梦 Amara是斯里兰卡志愿者组织elephantfree的官方向导，现向全球召集志愿者。'),
  (2, 'bg2.jpg', '生活于我，不只是一场英雄梦', '大象、瀑布、徒步、泰北烹饪课程、庙宇探寻……远离繁华的闹市，在泰国清迈，志愿者们将真正体会到原汁原味的泰国自然风光。'),
  (3, 'bg3.jpg', '大象保护、泰北文化深度体验', 'ACP团队每位成员均多次参加国际志工活动，用心做小，用心做好。');

-- --------------------------------------------------------

--
-- 表的结构 `tb_user`
--

CREATE TABLE `tb_user` (
  `id`              BIGINT(20) UNSIGNED NOT NULL
  COMMENT 'id',
  `token`           VARCHAR(60)         NOT NULL,
  `username`        VARCHAR(20)         NOT NULL
  COMMENT '用户名',
  `password`        VARCHAR(60)         NOT NULL
  COMMENT '密码',
  `balance`         DOUBLE UNSIGNED     NOT NULL DEFAULT '0'
  COMMENT '账户余额',
  `invitation_code` VARCHAR(36)         NOT NULL
  COMMENT '邀请码',
  `register_time`   TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '用户信息表';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_admin`
--
ALTER TABLE `tb_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_apply`
--
ALTER TABLE `tb_apply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_city`
--
ALTER TABLE `tb_city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_industry`
--
ALTER TABLE `tb_industry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_message`
--
ALTER TABLE `tb_message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_news`
--
ALTER TABLE `tb_news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_project`
--
ALTER TABLE `tb_project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acpname` (`acpname`);

--
-- Indexes for table `tb_service`
--
ALTER TABLE `tb_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_service_type`
--
ALTER TABLE `tb_service_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_slider`
--
ALTER TABLE `tb_slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `invitation_code` (`invitation_code`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `username_2` (`username`),
  ADD KEY `id_2` (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `tb_admin`
--
ALTER TABLE `tb_admin`
  MODIFY `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
--
-- 使用表AUTO_INCREMENT `tb_apply`
--
ALTER TABLE `tb_apply`
  MODIFY `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `tb_city`
--
ALTER TABLE `tb_city`
  MODIFY `id` BIGINT(20) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `tb_industry`
--
ALTER TABLE `tb_industry`
  MODIFY `id` BIGINT(20) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `tb_message`
--
ALTER TABLE `tb_message`
  MODIFY `id` INT(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `tb_news`
--
ALTER TABLE `tb_news`
  MODIFY `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `tb_project`
--
ALTER TABLE `tb_project`
  MODIFY `id` INT(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `tb_service`
--
ALTER TABLE `tb_service`
  MODIFY `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
--
-- 使用表AUTO_INCREMENT `tb_service_type`
--
ALTER TABLE `tb_service_type`
  MODIFY `id` BIGINT(20) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `tb_slider`
--
ALTER TABLE `tb_slider`
  MODIFY `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;
--
-- 使用表AUTO_INCREMENT `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT
  COMMENT 'id',
  AUTO_INCREMENT = 19;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;

/*
 Navicat Premium Data Transfer

 Source Server         : LUU
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : nodepro

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 26/05/2022 00:15:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (1, '88387b4b0c367a17e229a6bec56b2797', 'image/jpeg', 545497, 1, '2022-05-24 18:52:51', '2022-05-24 18:52:51');
INSERT INTO `avatar` VALUES (5, '3236b79463ab2e8a49e6925486e88454', 'image/jpeg', 545497, 1, '2022-05-24 21:21:58', '2022-05-24 21:21:58');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `moment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fkey_moment_id`(`moment_id`) USING BTREE,
  INDEX `fkey_comment_user_id`(`user_id`) USING BTREE,
  INDEX `fkey_comment_id`(`comment_id`) USING BTREE,
  CONSTRAINT `fkey_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkey_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkey_moment_id` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (3, '李瑞源真的太帅了~', 1, 1, NULL, '2022-05-10 23:05:16', '2022-05-10 23:05:16');
INSERT INTO `comment` VALUES (4, '李瑞源太帅了~', 1, 1, NULL, '2022-05-10 23:05:56', '2022-05-10 23:05:56');
INSERT INTO `comment` VALUES (5, '春招真的太难了，毕业即失业~', 1, 2, NULL, '2022-05-10 23:07:07', '2022-05-10 23:07:07');
INSERT INTO `comment` VALUES (6, '李瑞源真的很帅？？', 1, 2, 3, '2022-05-10 23:07:28', '2022-05-10 23:07:28');
INSERT INTO `comment` VALUES (7, '工作到底要怎么找啊！！', 1, 1, 5, '2022-05-10 23:08:03', '2022-05-10 23:08:03');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `moment_id` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (1, '99d2f2185cdeca1114e283bf8ad3abbc', 'image/svg+xml', 8993, 1, 1, '2022-05-24 23:41:12', '2022-05-24 23:41:12');
INSERT INTO `file` VALUES (2, 'db9df1485260c8a43c90dd48f9375b8f', 'image/svg+xml', 1539, 1, 1, '2022-05-24 23:41:12', '2022-05-24 23:41:12');
INSERT INTO `file` VALUES (3, '23a8b0688a2b65e4c5ab8852e146a21e', 'image/jpeg', 545497, 2, 1, '2022-05-25 22:11:41', '2022-05-25 22:11:41');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES (1, '前端', '2022-05-11 18:03:36', '2022-05-11 18:03:36');
INSERT INTO `label` VALUES (2, '李瑞源', '2022-05-11 18:07:41', '2022-05-11 18:07:41');
INSERT INTO `label` VALUES (3, '帅气', '2022-05-11 18:07:47', '2022-05-11 18:07:47');
INSERT INTO `label` VALUES (4, '大学生', '2022-05-11 18:07:58', '2022-05-11 18:07:58');
INSERT INTO `label` VALUES (5, '春招', '2022-05-11 18:40:01', '2022-05-11 18:40:01');
INSERT INTO `label` VALUES (6, '考研', '2022-05-23 23:20:50', '2022-05-23 23:20:50');
INSERT INTO `label` VALUES (7, '迷茫', '2022-05-23 23:20:50', '2022-05-23 23:20:50');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fkey_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `fkey_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (1, '李瑞源是世界上最帅的人', 1, '2022-05-10 14:40:34', '2022-05-10 14:40:34');
INSERT INTO `moment` VALUES (2, '李瑞源长得真帅~', 1, '2022-05-10 15:05:43', '2022-05-10 16:01:58');
INSERT INTO `moment` VALUES (3, '人生若只如初见，何事秋风悲画扇。', 1, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (4, '绿竹入幽径，青萝拂行衣。', 1, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (5, '燕草如碧丝，秦桑低绿枝。', 1, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (6, '声喧乱石中，色静深松里。', 2, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (7, '天边树若荠，江畔洲如月。', 2, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (8, '松月生夜凉，风泉满清听。', 2, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (9, '清辉澹水木，演漾在窗户。', 2, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (10, '草色新雨中，松声晚窗里。', 2, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (11, '松际露微月，清光犹为君。', 3, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (12, '杨柳散和风，青山澹吾虑。', 3, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (13, '人归山郭暗，雁下芦洲白。', 3, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (14, '云青青兮欲雨，水澹澹兮生烟。', 3, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (15, '郎骑竹马来，绕床弄青梅。', 3, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (16, '鸿飞冥冥日月白，青枫叶赤天雨霜。', 4, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (17, '夜深静卧百虫绝，清月出岭光入扉。', 4, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (18, '玉容寂寞泪阑干，梨花一枝春带雨。', 4, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (19, '坐看红树不知远，行尽青溪不见人。', 4, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (20, '海上生明月，天涯共此时。', 4, '2022-05-10 15:05:43', '2022-05-10 15:05:43');
INSERT INTO `moment` VALUES (22, '李瑞源长得真帅~', 1, '2022-05-10 16:38:09', '2022-05-10 17:07:47');
INSERT INTO `moment` VALUES (23, '李瑞源真的太帅了~~', 1, '2022-05-10 16:41:47', '2022-05-10 16:41:47');
INSERT INTO `moment` VALUES (24, '爱了爱了哈哈哈哈~~', 1, '2022-05-10 16:48:21', '2022-05-10 16:48:21');

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label`  (
  `moment_id` int NOT NULL,
  `label_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`moment_id`, `label_id`) USING BTREE,
  INDEX `label_id`(`label_id`) USING BTREE,
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_label
-- ----------------------------
INSERT INTO `moment_label` VALUES (1, 2, '2022-05-11 22:59:27', '2022-05-11 22:59:27');
INSERT INTO `moment_label` VALUES (1, 3, '2022-05-11 22:59:27', '2022-05-11 22:59:27');
INSERT INTO `moment_label` VALUES (1, 4, '2022-05-11 22:59:27', '2022-05-11 22:59:27');
INSERT INTO `moment_label` VALUES (1, 5, '2022-05-11 22:59:27', '2022-05-11 22:59:27');
INSERT INTO `moment_label` VALUES (2, 1, '2022-05-23 23:20:50', '2022-05-23 23:20:50');
INSERT INTO `moment_label` VALUES (2, 2, '2022-05-23 23:20:50', '2022-05-23 23:20:50');
INSERT INTO `moment_label` VALUES (2, 4, '2022-05-23 23:20:50', '2022-05-23 23:20:50');
INSERT INTO `moment_label` VALUES (2, 5, '2022-05-23 23:20:50', '2022-05-23 23:20:50');
INSERT INTO `moment_label` VALUES (2, 6, '2022-05-23 23:20:50', '2022-05-23 23:20:50');
INSERT INTO `moment_label` VALUES (2, 7, '2022-05-23 23:20:50', '2022-05-23 23:20:50');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'lry', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-10 01:46:42', '2022-05-24 20:54:01', 'http://localhost/8000/user/1/avatar');
INSERT INTO `user` VALUES (2, 'zzy', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-10 14:21:45', '2022-05-10 14:21:45', NULL);
INSERT INTO `user` VALUES (3, 'zy', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-10 14:59:36', '2022-05-10 14:59:36', NULL);
INSERT INTO `user` VALUES (4, 'zcy', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-10 14:59:39', '2022-05-10 14:59:39', NULL);
INSERT INTO `user` VALUES (5, 'ljm', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-10 14:59:45', '2022-05-10 14:59:45', NULL);
INSERT INTO `user` VALUES (6, 'cjc', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-10 14:59:52', '2022-05-10 14:59:52', NULL);
INSERT INTO `user` VALUES (12, 'wj', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-21 12:18:23', '2022-05-21 12:18:23', NULL);

SET FOREIGN_KEY_CHECKS = 1;

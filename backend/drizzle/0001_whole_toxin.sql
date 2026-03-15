CREATE TABLE `messages` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`from` int NOT NULL,
	`to` int NOT NULL,
	`message` varchar(255) NOT NULL,
	`file` varchar(255),
	`created_at` date NOT NULL,
	`updated_at` date NOT NULL,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `users`;
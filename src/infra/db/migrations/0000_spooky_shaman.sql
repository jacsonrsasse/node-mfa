CREATE TABLE `user` (
	`user_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint

CREATE TABLE `user_second_factor` (
	`user_id` integer PRIMARY KEY NOT NULL,
	`hash` text NOT NULL,
	`validated_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint

CREATE TABLE `user_token` (
	`user_token_id` text PRIMARY KEY NOT NULL,
	`user_id` integer,
	`refresh_token` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE no action
);

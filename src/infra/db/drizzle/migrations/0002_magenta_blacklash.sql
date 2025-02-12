PRAGMA foreign_keys=OFF;
--> statement-breakpoint

CREATE TABLE `__new_user_second_factor` (
	`user_id` integer PRIMARY KEY NOT NULL,
	`type` text DEFAULT 'one_time_password' NOT NULL,
	`otp_hash` text,
	`otp_validated_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint

INSERT 
  INTO `__new_user_second_factor`("user_id", "type", "otp_hash", "otp_validated_at", "created_at") 
SELECT "user_id", 'one_time_password' AS "type", "hash", "validated_at", "created_at" FROM `user_second_factor`;
--> statement-breakpoint

DROP TABLE `user_second_factor`;
--> statement-breakpoint

ALTER TABLE `__new_user_second_factor` RENAME TO `user_second_factor`;
--> statement-breakpoint

PRAGMA foreign_keys=ON;
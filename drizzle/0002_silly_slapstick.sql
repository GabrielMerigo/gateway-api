ALTER TABLE "accounts" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "accounts_email_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "accounts_apiKey_unique";--> statement-breakpoint
ALTER TABLE "invoices" DROP COLUMN "number";--> statement-breakpoint
ALTER TABLE "invoices" DROP COLUMN "cvv";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_apiKey_unique" UNIQUE("apiKey");
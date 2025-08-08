CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"accountId" uuid NOT NULL,
	"amount" integer NOT NULL,
	"status" varchar(255) DEFAULT 'PENDING' NOT NULL,
	"description" varchar(255) NOT NULL,
	"paymentType" varchar(255) DEFAULT 'PIX' NOT NULL,
	"cardLastDigits" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "id" DROP IDENTITY;
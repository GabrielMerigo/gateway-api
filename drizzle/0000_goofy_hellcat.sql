CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"apiKey" varchar(255) NOT NULL,
	"balance" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_email_unique" UNIQUE("email"),
	CONSTRAINT "accounts_apiKey_unique" UNIQUE("apiKey")
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"accountId" uuid NOT NULL,
	"amount" integer NOT NULL,
	"status" varchar(255) DEFAULT 'PENDING' NOT NULL,
	"description" varchar(255) NOT NULL,
	"paymentType" varchar(255) DEFAULT 'PIX' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"number" varchar(255) NOT NULL,
	"cvv" varchar(255) NOT NULL,
	"expiryMonth" integer NOT NULL,
	"expiryYear" integer NOT NULL,
	"cardholderName" varchar(255) NOT NULL,
	"cardLastDigits" varchar(255)
);

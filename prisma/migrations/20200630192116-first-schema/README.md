# Migration `20200630192116-first-schema`

This migration has been generated at 6/30/2020, 7:21:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

DROP INDEX "quaint"."User.email"

CREATE TABLE "quaint"."Role" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  )

CREATE TABLE "quaint"."Unit" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"measure" TEXT NOT NULL  ,"name" TEXT NOT NULL  )

CREATE TABLE "quaint"."Provider" (
"address" TEXT   ,"bankAddress" TEXT   ,"bankExpense" TEXT   ,"bankMfo" TEXT   ,"bankName" TEXT   ,"email" TEXT   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"phone" TEXT   ,"taxId" TEXT   )

CREATE TABLE "quaint"."Product" (
"categoryId" INTEGER NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"markup" INTEGER NOT NULL DEFAULT 0 ,"name" TEXT NOT NULL  ,"purchasePrice" INTEGER NOT NULL DEFAULT 0 ,"qty" INTEGER NOT NULL DEFAULT 0 ,"unitId" INTEGER NOT NULL  ,FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."Category" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"order" INTEGER  DEFAULT 0 ,"parentId" INTEGER   )

CREATE TABLE "quaint"."ProductMovement" (
"comment" TEXT   ,"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"number" TEXT   ,"price" TEXT NOT NULL  ,"productId" INTEGER NOT NULL  ,"providerId" INTEGER NOT NULL  ,"qty" INTEGER NOT NULL  ,"userId" INTEGER NOT NULL  ,FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."_RoleToUser" (
"A" INTEGER NOT NULL  ,"B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."new_User" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"password" TEXT NOT NULL  )

INSERT INTO "quaint"."new_User" ("id", "name") SELECT "id", "name" FROM "quaint"."User"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."User";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_User" RENAME TO "User";

CREATE UNIQUE INDEX "quaint"."_RoleToUser_AB_unique" ON "_RoleToUser"("A","B")

CREATE  INDEX "quaint"."_RoleToUser_B_index" ON "_RoleToUser"("B")

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Post";;
PRAGMA foreign_keys=on

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200630192116-first-schema
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,80 @@
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id               Int               @id @default(autoincrement())
+  name             String
+  password         String
+  roles            Role[]            @relation(references: [id])
+  ProductMovements ProductMovement[]
+}
+
+model Role {
+  id    Int    @id @default(autoincrement())
+  name  String
+  users User[] @relation(references: [id])
+}
+
+model Unit {
+  id         Int        @id @default(autoincrement())
+  name       String
+  measure    String
+  Products   Product[]
+}
+
+model Provider {
+  id               Int               @id @default(autoincrement())
+  name             String
+  address          String?
+  taxId            String? // unp / abn
+  phone            String?
+  email            String?
+  bankName         String?
+  bankAddress      String?
+  bankMfo          String?
+  bankExpense      String?
+  ProductMovements ProductMovement[]
+}
+
+model Product {
+  id               Int               @id @default(autoincrement())
+  name             String
+  qty              Int               @default(0)
+  purchasePrice    Int               @default(0) // purchase price
+  markup           Int               @default(0)
+  category         Category          @relation(fields: [categoryId], references: [id])
+  categoryId       Int
+  unit             Unit              @relation(fields: [unitId], references: [id])
+  unitId           Int
+  ProductMovements ProductMovement[]
+}
+
+model Category {
+  id         Int        @id @default(autoincrement())
+  name       String
+  order      Int?       @default(0)
+  parentId   Int?
+  Products   Product[]
+}
+
+model ProductMovement {
+  id         Int      @id @default(autoincrement())
+  number     String?
+  qty        Int
+  // type
+  price      String
+  comment    String?
+  product    Product  @relation(fields: [productId], references: [id])
+  productId  Int
+  user       User     @relation(fields: [userId], references: [id])
+  userId     Int
+  provider   Provider @relation(fields: [providerId], references: [id])
+  providerId Int
+  createdAt  DateTime @default(now())
+}
```



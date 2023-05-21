
CREATE TABLE "task-list" (
"id" serial primary key,
"task" varchar (120) not null,
"complete" BOOLEAN DEFAULT FALSE)

INSERT INTO "task-list" ("task")
VALUES
('weed garden'), 
('fold laundry'), 
('go grocery shopping')
('meal prep for the week')
('walk the dog')
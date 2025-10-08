--
-- PostgreSQL database dump
--

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

--
-- Data for Name: anyone_can_read_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."anyone_can_read_table" ("created_at", "descr") VALUES
	(now(), 'You all can read this!'),
	(now(), 'This is world-readable too.');

--
-- Data for Name: only_auth_users_can_read; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."only_auth_users_can_read" ("created_at", "text_note", "user_id") VALUES
	(now(), 'THIS CAN''T BE READ BY ANYONE -- SPURIOUS USER_ID', '17ddeefd-5fff-66ee-bccc-66aabbccddef');

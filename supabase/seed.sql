--
-- PostgreSQL database dump
--

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

--
-- Data for Name: anyone_can_read_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."anyone_can_read_table" ("id", "created_at", "descr") VALUES
	(1, '2025-10-08 11:56:45+00', 'You all can read this!'),
	(2, '2025-10-08 11:57:08+00', 'This is world-readable too.');

--
-- Data for Name: only_auth_users_can_read; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."only_auth_users_can_read" ("id", "created_at", "text_note", "user_id") VALUES
	(1, '2025-10-08 12:04:56+00', 'THIS CAN''T BE READ BY ANYONE -- SPURIOUS USER_ID', '17ddeefd-5fff-66ee-bccc-66aabbccddef'),
	(2, '2025-10-08 12:06:17+00', 'This is for Dude!', 'ca3cc9b0-3635-4f4e-9429-c40cbf9d12a2');

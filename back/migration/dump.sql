CREATE DATABASE virusbook
    WITH
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


   CREATE TABLE public.users
   (
       userid integer NOT NULL,
       parentid integer,
       fio character varying(60) COLLATE pg_catalog."default",
       is_default_user boolean DEFAULT false,
       rules_check boolean DEFAULT false,
       CONSTRAINT user_pk PRIMARY KEY (userid)
   );

   CREATE TABLE public.sentbooks
   (
       userid integer NOT NULL,
       bookdescription character varying(500) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
       delivered integer,
       senderid integer,
       CONSTRAINT sentbooks_pk PRIMARY KEY (userid)
   );

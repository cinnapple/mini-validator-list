------------------------------------------------------
-- validator report calendar
------------------------------------------------------

create or replace view validatorreportcalendar(date, month_of_year, day_of_week_num, validation_public_key, chain,
                                               score, total, missed, last_updated, domain, unl) as
SELECT c.cal_date                                                       AS date,
       c.month_of_year,
       c.day_of_week_num,
       vr.validation_public_key,
       vr.chain,
       vr.score,
       vr.total,
       vr.missed,
       vr.last_updated,
       COALESCE(NULLIF((vs.domain)::text, ''::text), (dk.domain)::text) AS domain,
       CASE
           WHEN (vs.unl = true) THEN 'Y'::text
           ELSE 'N'::text
           END                                                          AS unl
FROM (((calendar c
    LEFT JOIN validationreport vr ON ((vr.date = c.cal_date)))
    LEFT JOIN domainkeymap dk ON (((dk.validation_public_key)::text = (vr.validation_public_key)::text)))
         LEFT JOIN validatorssnapshot vs ON (((vs.validation_public_key)::text = (vr.validation_public_key)::text)));

alter table validatorreportcalendar
    owner to minivalist;

------------------------------------------------------
-- domain details
------------------------------------------------------

create or replace view domaindetails(domain, city, continent_name, country_code, country_name, latitude, longitude,
                                     name, twitter, web, description, icon, last_updated, validator_count, validators,
                                     unl_count, main_chain_count, altnet_chain_count) as
SELECT dk.domain,
       g.city,
       g.continent_name,
       g.country_code,
       g.country_name,
       COALESCE(g.latitude, (0.00)::double precision)          AS latitude,
       COALESCE(g.longitude, (0.00)::double precision)         AS longitude,
       p.name,
       p.twitter,
       p.web,
       p.description,
       p.icon,
       p.last_updated,
       count(dk.validation_public_key)                         AS validator_count,
       string_agg((dk.validation_public_key)::text, ';'::text) AS validators,
       sum(
               CASE
                   WHEN (v.unl = true) THEN 1
                   ELSE 0
                   END)                                        AS unl_count,
       sum(
               CASE
                   WHEN ((v.chain)::text = 'main'::text) THEN 1
                   ELSE 0
                   END)                                        AS main_chain_count,
       sum(
               CASE
                   WHEN ((v.chain)::text = 'altnet'::text) THEN 1
                   ELSE 0
                   END)                                        AS altnet_chain_count
FROM (((domainkeymap dk
    LEFT JOIN geolocation g ON (((dk.domain)::text = (g.domain)::text)))
    LEFT JOIN profiles p ON (((dk.domain)::text = (p.domain)::text)))
         LEFT JOIN validatorssnapshot v ON (((v.validation_public_key)::text = (dk.validation_public_key)::text)))
GROUP BY dk.domain, g.city, g.continent_name, g.country_code, g.country_name, g.latitude, g.longitude, p.name,
         p.twitter, p.web, p.description, p.icon, p.last_updated;

alter table domaindetails
    owner to minivalist;

------------------------------------------------------
-- unl validator history
------------------------------------------------------

create view unlvalidatorhistory(domain, validator_public_key, host, as_of_date, last_updated, created) as
SELECT DISTINCT dk.domain,
                unl.validator_public_key,
                unl.host,
                unl.as_of_date,
                unl.last_updated,
                unl.created
FROM (SELECT max(unl_1.as_of_date) OVER (PARTITION BY (date_trunc('month'::text,
                                                                  timezone('UTC'::text, (unl_1.as_of_date)::timestamp with time zone)))) AS as_of_date
      FROM unlhistory unl_1) dates,
     (unlhistory unl
         LEFT JOIN domainkeymap dk ON (((dk.validation_public_key)::text = (unl.validator_public_key)::text)))
WHERE (unl.as_of_date = dates.as_of_date);

alter table unlvalidatorhistory
    owner to minivalist;


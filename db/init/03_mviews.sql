create materialized view m_domaindetails as
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

alter materialized view m_domaindetails owner to minivalist;

create unique index m_domaindetails_idx
	on m_domaindetails (domain);


create materialized view m_validatordetails as
SELECT COALESCE(NULLIF((v.domain)::text, ''::text), (dk.domain)::text)                AS domain,
       v.validation_public_key,
       v.chain,
       v.unl,
       v.last_updated                                                                 AS last_seen,
       v.agreement_1h_incomplete,
       v.agreement_1h_missed,
       v.agreement_1h_score,
       v.agreement_1h_total,
       v.agreement_24h_incomplete,
       v.agreement_24h_missed,
       v.agreement_24h_score,
       v.agreement_24h_total,
       v.current_index,
       v.partial,
       g.country_name,
       g.country_code,
       g.continent_name,
       g.continent_code,
       round((NULLIF(g.latitude, (0.00)::double precision))::numeric, 4)              AS latitude,
       round((NULLIF(g.longitude, (0.00)::double precision))::numeric, 4)             AS longitude,
       p.name,
       p.twitter,
       p.description,
       p.web,
       p.icon,
       now()                                                                          AS last_updated,
       (SELECT string_agg(((((((vc.date || ':'::text) || round((vc.score)::numeric, 2)) || ':'::text) || vc.total) ||
                            ':'::text) || vc.missed), ';'::text ORDER BY vc.date) AS string_agg
        FROM validatorreportcalendar vc
        WHERE (((v.validation_public_key)::text = (vc.validation_public_key)::text) AND
               (vc.date >= (date_trunc('week'::text, now()) - '14 days'::interval)))) AS scores_2_weeks,
       (SELECT string_agg(((((((vc.date || ':'::text) || round((vc.score)::numeric, 2)) || ':'::text) || vc.total) ||
                            ':'::text) || vc.missed), ';'::text ORDER BY vc.date) AS string_agg
        FROM validatorreportcalendar vc
        WHERE (((v.validation_public_key)::text = (vc.validation_public_key)::text) AND
               (vc.date >= (date_trunc('month'::text, now()) - '3 mons'::interval)))) AS scores_3_months,
       (SELECT string_agg(((((((vc.date || ':'::text) || round((vc.score)::numeric, 2)) || ':'::text) || vc.total) ||
                            ':'::text) || vc.missed), ';'::text ORDER BY vc.date) AS string_agg
        FROM validatorreportcalendar vc
        WHERE (((v.validation_public_key)::text = (vc.validation_public_key)::text) AND
               (vc.date >= (date_trunc('month'::text, now()) - '6 mons'::interval)))) AS scores_6_months,
       (SELECT string_agg((u_1.host)::text, ';'::text ORDER BY (u_1.host)::text) AS string_agg
        FROM unlsnapshot u_1
        WHERE ((u_1.validator_public_key)::text = (v.validation_public_key)::text))   AS hosts
FROM ((((validatorssnapshot v
    LEFT JOIN domainkeymap dk ON (((dk.validation_public_key)::text = (v.validation_public_key)::text)))
    LEFT JOIN geolocation g ON ((COALESCE(NULLIF((v.domain)::text, ''::text), (dk.domain)::text) = (g.domain)::text)))
    LEFT JOIN profiles p ON ((COALESCE(NULLIF((v.domain)::text, ''::text), (dk.domain)::text) = (p.domain)::text)))
         LEFT JOIN (SELECT u1.host,
                           u1.validator_public_key
                    FROM unlsnapshot u1) u ON (((u.validator_public_key)::text = (v.validation_public_key)::text)))
GROUP BY COALESCE(NULLIF((v.domain)::text, ''::text), (dk.domain)::text), v.validation_public_key, v.chain, v.unl,
         v.last_updated, v.agreement_1h_incomplete, v.agreement_1h_missed, v.agreement_1h_score, v.agreement_1h_total,
         v.agreement_24h_incomplete, v.agreement_24h_missed, v.agreement_24h_score, v.agreement_24h_total,
         v.current_index, v.partial, g.country_name, g.country_code, g.continent_name, g.continent_code,
         (round((NULLIF(g.latitude, (0.00)::double precision))::numeric, 4)),
         (round((NULLIF(g.longitude, (0.00)::double precision))::numeric, 4)), p.name, p.twitter, p.description, p.web,
         p.icon, (now());

alter materialized view m_validatordetails owner to minivalist;

create unique index m_validatordetails_idx
	on m_validatordetails (validation_public_key, domain);


create materialized view m_validatorreportcalendar as
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

alter materialized view m_validatorreportcalendar owner to minivalist;

create unique index m_validatorreportcalendar_idx
	on m_validatorreportcalendar (date, validation_public_key);


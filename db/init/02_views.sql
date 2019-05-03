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


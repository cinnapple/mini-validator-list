create table if not exists validatorssnapshot
(
    validation_public_key    varchar(60)                            not null
        constraint validatorssnapshot_pk
            primary key,
    domain                   varchar(60),
    chain                    varchar(60),
    current_index            integer,
    agreement_1h_missed      integer,
    agreement_1h_total       integer,
    agreement_1h_score       double precision,
    agreement_1h_incomplete  boolean,
    agreement_24h_missed     integer,
    agreement_24h_total      integer,
    agreement_24h_score      double precision,
    agreement_24h_incomplete boolean,
    partial                  boolean,
    unl                      boolean,
    last_updated             timestamp with time zone default now(),
    created                  timestamp with time zone default now() not null
);

alter table validatorssnapshot
    owner to minivalist;

create table if not exists unlsnapshot
(
    validator_public_key varchar(60)                            not null,
    host                 varchar(50)                            not null,
    last_updated         timestamp with time zone default now() not null,
    created              timestamp with time zone default now() not null,
    constraint unique_key
        unique (validator_public_key, host)
);

alter table unlsnapshot
    owner to minivalist;

create table if not exists geolocation
(
    domain         varchar(60)                            not null
        constraint geoinfo_pk
            primary key,
    continent_name varchar(60),
    continent_code varchar(5),
    country_code   varchar(5),
    country_name   varchar(60),
    region_code    varchar(5),
    region_name    varchar(60),
    city           varchar(60),
    latitude       double precision,
    longitude      double precision,
    last_updated   timestamp with time zone default now(),
    created        timestamp with time zone default now() not null
);

alter table geolocation
    owner to minivalist;

create table if not exists unlhistory
(
    validator_public_key varchar(60)                            not null,
    host                 varchar(50)                            not null,
    as_of_date           date                                   not null,
    last_updated         timestamp with time zone default now() not null,
    created              timestamp with time zone default now() not null,
    constraint unlhistory_pk
        primary key (validator_public_key, host, as_of_date),
    constraint unique_pk
        unique (validator_public_key, as_of_date, host)
);

alter table unlhistory
    owner to minivalist;

create table if not exists domainkeymap
(
    validation_public_key varchar(60) not null
        constraint domainkeymap_pk
            primary key,
    domain                varchar(60) not null,
    last_updated          timestamp with time zone,
    created               timestamp with time zone
);

alter table domainkeymap
    owner to minivalist;

create table if not exists profiles
(
    domain       varchar(60)  not null
        constraint profiles_pk
            primary key,
    name         varchar(256) not null,
    twitter      varchar(20),
    description  text,
    web          text,
    icon         text,
    last_updated timestamp with time zone,
    created      timestamp with time zone
);

alter table profiles
    owner to minivalist;

create table if not exists validationreport
(
    validation_public_key varchar(60)                            not null,
    chain                 varchar(60),
    date                  date                                   not null,
    score                 double precision         default 0     not null,
    total                 integer                  default 0     not null,
    missed                integer                  default 0     not null,
    last_updated          timestamp with time zone default now() not null,
    created               timestamp with time zone default now() not null,
    constraint validationreport_pk
        primary key (validation_public_key, date)
);

alter table validationreport
    owner to minivalist;

create table if not exists calendar
(
    cal_date             date    not null
        constraint calendar_pkey
            primary key,
    year_of_date         integer not null,
    month_of_year        integer not null,
    day_of_month         integer not null,
    day_of_week          char(3) not null,
    day_of_week_num      integer not null,
    week_of_year         integer not null,
    days_to_end_of_month integer not null,
    constraint calendar_check
        check ((year_of_date)::double precision = date_part('year'::text, cal_date)),
    constraint calendar_check1
        check ((month_of_year)::double precision = date_part('month'::text, cal_date)),
    constraint calendar_check2
        check ((day_of_month)::double precision = date_part('day'::text, cal_date)),
    constraint calendar_check3
        check ((day_of_week)::text = CASE
                                         WHEN (date_part('dow'::text, cal_date) = (0)::double precision) THEN 'Sun'::text
                                         WHEN (date_part('dow'::text, cal_date) = (1)::double precision) THEN 'Mon'::text
                                         WHEN (date_part('dow'::text, cal_date) = (2)::double precision) THEN 'Tue'::text
                                         WHEN (date_part('dow'::text, cal_date) = (3)::double precision) THEN 'Wed'::text
                                         WHEN (date_part('dow'::text, cal_date) = (4)::double precision) THEN 'Thu'::text
                                         WHEN (date_part('dow'::text, cal_date) = (5)::double precision) THEN 'Fri'::text
                                         WHEN (date_part('dow'::text, cal_date) = (6)::double precision) THEN 'Sat'::text
                                         ELSE NULL::text END)
);

alter table calendar
    owner to minivalist;

create index if not exists calendar_day_of_month
    on calendar (day_of_month);

create index if not exists calendar_day_of_week
    on calendar (day_of_week);

create index if not exists calendar_month_of_year
    on calendar (month_of_year);

create index if not exists calendar_year_of_date
    on calendar (year_of_date);

create index if not exists calendar_day_of_week_num
    on calendar (day_of_week_num);

create index if not exists calendar_week_of_year
    on calendar (week_of_year);

create index if not exists calendar_days_to_end_of_month
    on calendar (days_to_end_of_month);

create table if not exists manifests
(
    master_public_key    varchar(60)                            not null
        constraint manifests_pk
            primary key,
    ephemeral_public_key varchar(60),
    master_signature     text,
    signature            text,
    count                integer,
    sequence             integer,
    first_datetime       timestamp with time zone default now() not null,
    last_datetime        timestamp with time zone default now() not null,
    last_updated         timestamp with time zone,
    created              timestamp with time zone
);

alter table manifests
    owner to minivalist;


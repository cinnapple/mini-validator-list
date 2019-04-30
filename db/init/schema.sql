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


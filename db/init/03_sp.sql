create function insert_range_into_calendar(from_date date, to_date date) returns void
    language plpgsql
as
$$
DECLARE
    this_date date := from_date;
BEGIN

    while (this_date <= to_date) LOOP

        INSERT INTO calendar
            (cal_date
           , year_of_date
           , month_of_year
           , day_of_month
           , day_of_week
           , day_of_week_num
           , week_of_year
           , days_to_end_of_month
           )
        VALUES (this_date
        , extract(year from this_date)
        , extract(month from this_date)
        , extract(day from this_date)
        , case when extract(dow from this_date) = 0 then 'Sun'
             when extract(dow from this_date) = 1 then 'Mon'
             when extract(dow from this_date) = 2 then 'Tue'
             when extract(dow from this_date) = 3 then 'Wed'
             when extract(dow from this_date) = 4 then 'Thu'
             when extract(dow from this_date) = 5 then 'Fri'
             when extract(dow from this_date) = 6 then 'Sat'
        end
        , extract(dow from this_date)
        , cast (to_char(this_date, 'IW') as integer)
        , date_part('day', age((date_trunc('month', this_date) + interval '1 month' - interval '1 day')::date, this_date))
        );
        this_date = this_date + interval '1 day';
    end loop;



END;
$$;

alter function insert_range_into_calendar(date, date) owner to minivalist;


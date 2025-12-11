CREATE TABLE sleep_records (
                               id SERIAL PRIMARY KEY,
                               date DATE NOT NULL,
                               sleep_time TIME NOT NULL,
                               wake_time TIME NOT NULL,
                               sleep_hours NUMERIC(4,2) NOT NULL
);

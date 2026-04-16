-- Certificates table — tracks issued completion certificates
create table if not exists certificates (
  id               uuid default gen_random_uuid() primary key,
  user_id          uuid references auth.users(id) on delete cascade not null,
  course_id        text not null,
  package_name     text not null,
  recipient_name   text not null,
  issued_at        timestamptz default now() not null,
  unique(user_id, course_id)
);

alter table certificates enable row level security;

create policy "Users can read own certificates"
  on certificates for select
  using (auth.uid() = user_id);

-- Service role inserts certificates (bypasses RLS)
create index if not exists certificates_user_idx on certificates(user_id);
create index if not exists certificates_course_idx on certificates(user_id, course_id);

CREATE TABLE system_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  active_disaster_type TEXT CHECK (
    active_disaster_type IN ('earthquake', 'flood', 'cyclone')
  ),
  activated_by UUID REFERENCES profiles(id),
  activated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

ALTER TABLE daily_reports
ADD CONSTRAINT unique_area_daily_report
UNIQUE (area_id, report_date);

ALTER TABLE shelters
ADD COLUMN is_active BOOLEAN DEFAULT true;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE drills ENABLE ROW LEVEL SECURITY;
ALTER TABLE drill_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE danger_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_state ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
USING (id = auth.uid());

CREATE POLICY "Authorities can read all profiles"
ON profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.role = 'authority'
  )
);

CREATE POLICY "Public can read areas"
ON areas
FOR SELECT
USING (true);

CREATE POLICY "Authority can update areas"
ON areas
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);


CREATE POLICY "Public can read shelters"
ON shelters
FOR SELECT
USING (true);

CREATE POLICY "Authority can add shelters"
ON shelters
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

CREATE POLICY "Authority can update shelters"
ON shelters
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

CREATE POLICY "Users can create drills"
ON drills
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own drills"
ON drills
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Public can read drill questions"
ON drill_questions
FOR SELECT
USING (true);

CREATE POLICY "Users can submit feedback"
ON feedback
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own feedback"
ON feedback
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Authority can read all feedback"
ON feedback
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);


CREATE POLICY "Authority can update feedback"
ON feedback
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

CREATE POLICY "Authority can create reports"
ON daily_reports
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

CREATE POLICY "Public can read reports"
ON daily_reports
FOR SELECT
USING (true);

CREATE POLICY "Public can read alerts"
ON emergency_alerts
FOR SELECT
USING (true);

CREATE POLICY "Authority can create alerts"
ON emergency_alerts
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

CREATE POLICY "Authority can update alerts"
ON emergency_alerts
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

CREATE POLICY "Public can read danger zones"
ON danger_zones
FOR SELECT
USING (is_active = true);

CREATE POLICY "Authority can manage danger zones"
ON danger_zones
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

CREATE POLICY "Public can read system state"
ON system_state
FOR SELECT
USING (true);

CREATE POLICY "Authority can insert system state"
ON system_state
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

CREATE POLICY "Authority can update system state"
ON system_state
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'authority'
  )
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'civilian')
  );
  return new;
end;
$$ language plpgsql security definer;


select * from pg_trigger
where tgname = 'on_auth_user_created';

DROP POLICY IF EXISTS "Authority can read all feedback" ON feedback;

CREATE POLICY "Authority can read all feedback"
ON feedback
FOR SELECT
USING (
  (auth.jwt() ->> 'role') = 'authority'
);

update auth.users
set raw_user_meta_data = jsonb_set(
  coalesce(raw_user_meta_data, '{}'),
  '{role}',
  '"authority"',
  true
)
where email = 'anusha@gmail.com';

create or replace function public.sync_role_to_auth()
returns trigger as $$
begin
  update auth.users
  set raw_user_meta_data = jsonb_set(
    coalesce(raw_user_meta_data, '{}'),
    '{role}',
    to_jsonb(new.role),
    true
  )
  where id = new.id;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists sync_role_trigger on profiles;

create trigger sync_role_trigger
after insert or update of role
on profiles
for each row
execute function public.sync_role_to_auth();

update profiles
set role = role;

DROP POLICY IF EXISTS "Authority can read all feedback" ON feedback;

create policy "Authority can read all feedback"
on feedback
for select
using (
  auth.jwt() ->> 'role' = 'authority'
);

DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Authorities can read all profiles" ON profiles;


CREATE POLICY "User reads own profile"
ON profiles
FOR SELECT
USING (
  id = auth.uid()
);


CREATE POLICY "Authority reads all profiles"
ON profiles
FOR SELECT
USING (
  auth.jwt() ->> 'role' = 'authority'
);

CREATE UNIQUE INDEX only_one_active_disaster
ON system_state (is_active)
WHERE is_active = true;



CREATE POLICY "Authority can activate disaster"
ON system_state
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'role' = 'authority'
);

CREATE POLICY "Authority can update disaster"
ON system_state
FOR UPDATE
USING (
  auth.jwt() ->> 'role' = 'authority'
);




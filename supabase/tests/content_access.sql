-- Execute as the database owner. All fixtures and changes are rolled back.
begin;

select set_config('test.hidden_scenario_id',
  (select id::text from public.scenarios where slug = 'from-idea-to-brand'), true);

update public.blog_posts set status = 'draft' where slug = 'identity-does-not-start-with-logo';
update public.services set is_active = false where number = '01';
update public.scenarios set is_published = false where slug = 'from-idea-to-brand';

set local role anon;
do $$
begin
  if exists (select 1 from public.blog_posts where slug = 'identity-does-not-start-with-logo') then
    raise exception 'Draft article exposed';
  end if;
  if exists (select 1 from public.services where number = '01') then
    raise exception 'Inactive service exposed';
  end if;
  if exists (select 1 from public.scenarios where slug = 'from-idea-to-brand') then
    raise exception 'Unpublished scenario exposed';
  end if;
  if exists (select 1 from public.scenario_steps
    where scenario_id = current_setting('test.hidden_scenario_id')::uuid) then
    raise exception 'Steps of unpublished scenario exposed';
  end if;
  begin
    insert into public.site_settings (key, value) values ('access_test', '{}'::jsonb);
    raise exception 'Anonymous content write allowed';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into storage.objects (bucket_id, name) values ('website-media', 'access-test.txt');
    raise exception 'Anonymous storage upload allowed';
  exception when insufficient_privilege then null;
  end;
  begin
    perform 1 from public.profiles;
    raise exception 'Anonymous profiles read allowed';
  exception when insufficient_privilege then null;
  end;
end;
$$;
reset role;

select set_config('test.editor_id', gen_random_uuid()::text, true);
insert into auth.users (id) values (current_setting('test.editor_id')::uuid);
insert into public.profiles (id, full_name, role)
values (current_setting('test.editor_id')::uuid, 'Transactional access test', 'editor');
select set_config('request.jwt.claim.sub', current_setting('test.editor_id'), true);
set local role authenticated;
do $$
begin
  if not private.is_content_editor() or private.is_admin() then
    raise exception 'Editor role resolution failed';
  end if;
  insert into public.site_settings (key, value) values ('access_test', '{}'::jsonb);
  update public.profiles set role = 'admin' where id = (select auth.uid());
  if found then raise exception 'Editor can escalate their own role'; end if;
end;
$$;
reset role;

update public.profiles set role = 'admin' where id = current_setting('test.editor_id')::uuid;
set local role authenticated;
do $$
begin
  if not private.is_admin() then raise exception 'Admin role resolution failed'; end if;
  update public.profiles set full_name = 'Transactional admin test' where id = (select auth.uid());
  if not found then raise exception 'Admin cannot manage profiles'; end if;
end;
$$;
reset role;
rollback;

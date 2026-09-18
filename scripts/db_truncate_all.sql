SELECT format('TRUNCATE TABLE %I RESTART IDENTITY CASCADE', tablename)
FROM pg_tables
WHERE schemaname = current_schema()
  AND tablename <> 'schema_migrations'
\gexec

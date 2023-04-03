INSERT INTO public.questionnaire_importer (id, name, organization_id, importer_id, version, metamodel_version, description, readme, license, allowed_packages, url, enabled, app_uuid, created_at, updated_at)
VALUES (
  'dsw:ro-crate-importer:0.1.0',
  'DSW RO-Crate Importer',
  'dsw',
  'ro-crate-importer',
  '0.1.0',
  1,
  'Import from RO-Crate in ZIP',
  '# DSW RO-Crate Importer\n\n*Import from RO-Crate in ZIP*\n\nSupported template metamodel version: >=4,<11',
  'Apache-2.0',
  '[
    {
      "orgId": null,
      "kmId": null,
      "minVersion": null,
      "maxVersion": null
    }
  ]',
  'http://localhost:8000',
  true,
  '00000000-0000-0000-0000-000000000000',
  '2022-09-10 07:51:32.892000 +00:00',
  '2022-09-10 07:51:35.709000 +00:00'
);

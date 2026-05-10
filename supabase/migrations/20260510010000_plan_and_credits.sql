-- Rename trial → free for existing tenants
UPDATE tenants SET plan = 'free' WHERE plan = 'trial';

-- New registrations default to 5 credits on the free plan
ALTER TABLE tenants ALTER COLUMN credits_balance SET DEFAULT 5;

-- Upgrade filipe.daumas@icloud.com to enterprise (credits_balance = -1 = unlimited)
UPDATE tenants
SET plan = 'enterprise', credits_balance = -1
WHERE id = (
  SELECT tenant_id FROM users WHERE email = 'filipe.daumas@icloud.com' LIMIT 1
);

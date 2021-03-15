db.auth('dev', 'dev')
db = db.getSiblingDB('plant-monitor')
db.grantRolesToUser('dev', ['root'])
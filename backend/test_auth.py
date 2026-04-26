from app.core.security import verify_password
hp = "$2b$12$oJB1az0RK82Ry5YBMd1WEOD01H9v81B6nrpwKx2uuavI.9Dlt.4WG"
p = "Petnou$2026*Auth"
print(f"Verifying: {p} against {hp}")
print(f"Result: {verify_password(p, hp)}")

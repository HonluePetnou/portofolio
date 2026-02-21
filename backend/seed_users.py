from sqlmodel import Session, select
from app.models.database import engine
from app.models.portfolio import User
from app.core.security import get_password_hash

def seed_users():
    users_to_create = [
        {"username": "Dieuba", "password": "Dieuba@2026!Secure", "full_name": "Dieuba"},
        {"username": "Lontsie", "password": "Lontsie#2026?Board", "full_name": "Lontsie"},
        {"username": "Petnou", "password": "Petnou$2026*Auth", "full_name": "Petnou"},
        {"username": "Abogo", "password": "Abogo^2026%Admin", "full_name": "Abogo"},
    ]
    
    with Session(engine) as session:
        for user_data in users_to_create:
            # Check if user already exists
            statement = select(User).where(User.username == user_data["username"])
            existing_user = session.exec(statement).first()
            if not existing_user:
                print(f"Creating user: {user_data['username']}")
                user = User(
                    username=user_data["username"],
                    hashed_password=get_password_hash(user_data["password"]),
                    full_name=user_data["full_name"]
                )
                session.add(user)
            else:
                print(f"User {user_data['username']} already exists.")
        
        session.commit()

if __name__ == "__main__":
    seed_users()

import uuid
from datetime import datetime
from sqlmodel import Session, select
from app.models.database import engine
from app.models.portfolio import User, Profile, Project, Testimonial, ContactMessage, ContactStatus, PriorityLevel
from app.models.blog import BlogStatus
from app.models.portfolio import Article

def seed_data():
    with Session(engine) as session:
        # 1. Get the first user
        user = session.exec(select(User)).first()
        if not user:
            print("No users found. Please run seed_users.py first.")
            return
        
        user_id = user.id

        # 2. Seed Profile
        profile = session.exec(select(Profile).where(Profile.user_id == user_id)).first()
        if not profile:
            print("Seeding Profile...")
            profile = Profile(
                name="Honlue Petnou Frederic Armel",
                hero_title="Full-Stack Developer & AI Enthusiast",
                hero_subtitle="Building scalable web applications and intelligent solutions with Next.js and FastAPI.",
                bio_summary="Passionate about creating efficient, user-centric software. Expert in modern web technologies and cloud architecture.",
                about_text="With over 5 years of experience in software engineering, I specialize in building robust backend systems and intuitive frontend interfaces. My journey started with a deep curiosity for how things work, which led me to master a diverse stack including Python, TypeScript, and Go.",
                profile_image_url="https://ui-avatars.com/api/?name=Honlue+Petnou&size=512",
                social_links=[
                    {"platform": "LinkedIn", "url": "https://linkedin.com/in/honlue"},
                    {"platform": "GitHub", "url": "https://github.com/honlue"}
                ],
                tech_stack_summary=["React", "Next.js", "FastAPI", "PostgreSQL", "Tailwind CSS", "Docker"],
                user_id=user_id
            )
            session.add(profile)

        # 3. Seed Projects
        if session.exec(select(Project)).first() is None:
            print("Seeding Projects...")
            p1 = Project(
                title="E-Commerce Platform",
                slug="e-commerce-platform",
                client_name="Soluty Stores",
                industry="Retail",
                services=["Web Development", "Payment Integration"],
                description={
                    "problem": "The client needed a high-performance store that could handle thousands of concurrent users.",
                    "objectives": "Maximize load speed and ensure 100% uptime during sales.",
                    "solution": "Built with Next.js and a microservices backend using Go."
                },
                results=[
                    {"label": "Performance Score", "value": "98/100"},
                    {"label": "Sales Increase", "value": "45%"}
                ],
                stack=["Next.js", "Go", "Redis", "PostgreSQL"],
                is_featured=True,
                user_id=user_id
            )
            p2 = Project(
                title="AI Content Studio",
                slug="ai-content-studio",
                client_name="Digital Agency",
                industry="Marketing",
                services=["AI Integration", "Full-Stack Dev"],
                description={
                    "problem": "Manual content creation was too slow and expensive.",
                    "objectives": "Automate content generation while maintaining quality.",
                    "solution": "Integrated OpenAI GPT-4 into a custom CMS for automated drafting."
                },
                stack=["FastAPI", "OpenAI", "React", "Python"],
                is_featured=True,
                user_id=user_id
            )
            session.add(p1)
            session.add(p2)

        # 4. Seed Testimonials
        if session.exec(select(Testimonial)).first() is None:
            print("Seeding Testimonials...")
            t1 = Testimonial(
                name="John Doe",
                role="CEO",
                company="TechCorp",
                content="Honlue delivered an exceptional platform that exceeded our expectations. His attention to detail is unmatched.",
                rating=5,
                user_id=user_id
            )
            t2 = Testimonial(
                name="Jane Smith",
                role="Product Manager",
                company="InnovateLab",
                content="Working with Frederic was a breeze. He understands complex requirements and turns them into elegant code.",
                rating=5,
                user_id=user_id
            )
            session.add(t1)
            session.add(t2)

        # 5. Seed Articles
        if session.exec(select(Article)).first() is None:
            print("Seeding Articles...")
            a1 = Article(
                title="Mastering FastAPI for High-Performance APIs",
                slug="mastering-fastapi",
                excerpt="Learn how to build lightning-fast APIs using Python's most modern framework.",
                status=BlogStatus.published,
                published=True,
                tags=["Python", "FastAPI", "Backend"],
                reading_time=8,
                content={
                    "intro": "FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints.",
                    "sections": [
                        {"heading": "Why FastAPI?", "body": "The key features include performance, fast-to-code, fewer bugs, and intuitive design."},
                        {"heading": "Getting Started", "body": "Install with pip install fastapi[all] and start building your first endpoint."}
                    ]
                }
            )
            a2 = Article(
                title="The Future of Web Development with Next.js 15",
                slug="future-of-nextjs",
                excerpt="Exploring the latest features and architectural changes in Next.js 15.",
                status=BlogStatus.draft,
                published=False,
                tags=["JavaScript", "Next.js", "Frontend"],
                reading_time=12,
                content={
                    "intro": "Next.js continues to push the boundaries of what's possible on the web.",
                    "sections": [
                        {"heading": "Server Actions", "body": "Mutate data with zero client-side JavaScript."},
                        {"heading": "Turbopack", "body": "Incremental bundling for faster development cycles."}
                    ]
                }
            )
            session.add(a1)
            session.add(a2)

        # 6. Seed Contact Messages
        if session.exec(select(ContactMessage)).first() is None:
            print("Seeding Contact Messages...")
            m1 = ContactMessage(
                name="Alice Wonder",
                email="alice@example.com",
                subject="Project Inquiry",
                message="Hi, I'm interested in building a custom CRM for my team. Are you available for a chat?",
                status=ContactStatus.NEW,
                priority=PriorityLevel.HIGH
            )
            session.add(m1)

        session.commit()
        print("Data seeding completed successfully!")

if __name__ == "__main__":
    seed_data()

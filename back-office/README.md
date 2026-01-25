# Portfolio Back-Office

The administrative dashboard for managing the portfolio's content. It provides a rich UI for editing profile data, reading messages, writing blogs, and planning content.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [Radix UI](https://www.radix-ui.com/) (Primitives)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form (Recommended)
- **Icons**: Lucide React

## Modules

### 1. Profile Management

- Edit general information (Hero text, Bio).
- Update tech stack and skills.
- Manage professional experience timeline.
- Upload CV and Profile Picture.

### 2. Inbox

- View messages sent via the frontend contact form.
- Mark messages as read/starred.
- Reply to inquiries (integration pending).

### 3. Blog System

- Write and edit articles with a rich text editor.
- Manage drafts and published posts.
- AI-powered idea generation.

### 4. Content Studio

- Kanban-style board for managing social media content.
- Plan posts for Twitter, LinkedIn, and Facebook.
- Track content status (Idea -> Writing -> Ready -> Published).

## Getting Started

1.  **Install Dependencies**:

    ```bash
    npm install
    # or
    pnpm install
    ```

2.  **Run Development Server**:

    ```bash
    npm run dev
    # or
    pnpm dev
    ```

3.  Open [http://localhost:3001](http://localhost:3001) (or typically port 3001 if 3000 is taken) with your browser.

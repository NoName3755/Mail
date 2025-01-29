# Mail

## Overview
Mail is a web-based email client that mimics the functionality of traditional email services. Users can send, receive, archive, and manage emails with a user-friendly interface. The project is built using Django for the backend and JavaScript for dynamic interactions on the frontend.

## Features
- User authentication (login, logout, registration)
- Compose and send emails to other registered users
- View inbox, sent emails, and archived emails
- Mark emails as read or unread
- Archive and unarchive emails
- Responsive and dynamic UI using JavaScript

## Technologies Used
- **Backend:** Django, Python, SQLite
- **Frontend:** JavaScript, HTML, CSS, Bootstrap
- **Authentication:** Django's built-in authentication system
- **API Handling:** Fetch API for asynchronous data fetching

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git https://github.com/NoName3755/Mail.git
   cd Mail
   ```
3. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
4. **Apply database migrations:**
   ```sh
   python manage.py migrate
   ```
5. **Create a superuser (for admin access):**
   ```sh
   python manage.py createsuperuser
   ```
6. **Run the development server:**
   ```sh
   python manage.py runserver
   ```
7. **Access the application:**
   Open `http://127.0.0.1:8000/` in your browser.

## Usage
- Register and log in to access the email system.
- Compose and send emails to other users.
- View received emails in the inbox and mark them as read/unread.
- Archive emails for better organization.
- Manage sent emails in the "Sent" folder.

## Future Improvements
- Implement real-time email notifications.
- Improve UI/UX with a modern design.
- Add search and filtering functionalities for emails.
- Allow users to create folders for better email management.

## License
This project is part of CS50W and follows the course guidelines. Feel free to modify and improve it.

## Acknowledgments
- CS50W by Harvard University for providing the foundational knowledge.
- Django documentation for backend development guidance.

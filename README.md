# 🩺 Doctor Appointment Booking Platform

A full-stack platform for booking and conducting video consultations with verified doctors. Patients can view availability, book appointments using credits, and join secure video calls. Doctors can manage slots, add notes, and complete appointments.

---

## 🚀 Features

- Role-based access for Patients, Doctors
- View and book available 30-minute slots
- Secure video calls via Vonage (OpenTok)
- Notes, completion, and cancellation support
- Credit-based booking system

---

## 🧱 Tech Stack

- **Frontend**: Next.js 14 (App Router), TailwindCSS, shadcn/ui
- **Backend**: Next.js Server Actions
- **Auth**: Clerk.dev
- **ORM/DB**: Prisma + PostgreSQL
- **Video API**: Vonage Video SDK



---

## 🛠️ Setup

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd my-app
   npm install
   ```

2. **Environment**
   Create `.env`:
   ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
    CLERK_SECRET_KEY=dummy_check_XXXXXX
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
    NEXT_PUBLIC_VONAGE_APPLICATION_ID=your-vonage-app-id
    VONAGE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----"
    DATABASE_URL=postgresql://your_username:your_password@localhost:5432/your_database_name

   ```

3. **Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run**
   ```bash
   npm run dev
   ```

---

## 📹 Video Call

- Enabled 30 minutes before appointment time.
- Token-based access (patient & doctor only).
- Uses `Vonage.Video.createSession()` + `generateClientToken()`.

---

## 💳 Credits System

- 2 credits = 1 appointment
- Patients start with default credits
- `CreditTransaction` tracks usage and changes

---

## ✅ Roles

| Role    | Features                          |
|---------|-----------------------------------|
| PATIENT | Book/cancel, join call, view notes |
| DOCTOR  | Set availability, notes, complete |
| ADMIN   | (Optional) verify, credit adjust   |

---

## 📌 Extras

- Respects overlapping slot checks
- All server actions use Next.js Server Actions
- Fully responsive UI

---


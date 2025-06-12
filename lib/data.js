import { Calendar, Video, CreditCard, User, FileText, ShieldCheck} from "lucide-react";

export const features = [
  {
    icon: <User className="h-6 w-6 text-emerald-400" />,
    title: "Personalized Profiles",
    description:
      "Set up your account and let us tailor healthcare recommendations based on your profile and preferences.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "Instant Appointments",
    description:
      "Find trusted doctors, view real-time availability, and book appointments in just a few taps.",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-400" />,
    title: "Online Consultations",
    description:
      "Consult with verified doctors via secure HD video — anytime, anywhere.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
    title: "Flexible Credit System",
    description:
      "Use credits to pay for consultations. Choose from affordable bundles or subscribe monthly.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Verified Professionals",
    description:
      "Every doctor is thoroughly vetted for credentials, experience, and patient satisfaction.",
  },
  {
    icon: <FileText className="h-6 w-6 text-emerald-400" />,
    title: "Your Health Records",
    description:
      "Access consultation notes, prescriptions, and medical history — all in one secure place.",
  },
];


// JSON data for testimonials
export const testimonials = [
  {
    initials: "SP",
    name: "Sarah Patel",
    role: "Patient",
    quote:
      "Booking an online consultation was seamless. I received quality care without leaving my home.",
  },
  {
    initials: "RM",
    name: "Dr. Rohan Mehta",
    role: "Dermatologist",
    quote:
      "This platform allows me to connect with patients more efficiently. The experience is smooth and professional.",
  },
  {
    initials: "JT",
    name: "Jayesh Trivedi",
    role: "Working Professional",
    quote:
      "The credit system is brilliant. I shared credits with my family and booked multiple consultations with ease.",
  },
];


// JSON data for credit system benefits
export const creditBenefits = [
  "Every consultation uses <strong class='text-emerald-400'>2 credits</strong>, no matter the duration",
  "<strong class='text-emerald-400'>Credits never expire</strong> — use them whenever you need care",
  "Monthly plans give you <strong class='text-emerald-400'>fresh credits every month</strong> automatically",
  "Pause or cancel your plan <strong class='text-emerald-400'>anytime</strong> — no questions asked",
];

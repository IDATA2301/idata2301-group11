import type { User } from "../types/User";

export const adminUsers: User[] = [
  {
    id: 1,
    user_name: "dave",
    email: "dave@gmail.com",
    user_password: "Dangerous2026",
    user_role: "USER",
    user_address: "NTNU Ålesund",
    user_country: "Norway",
  },
  {
    id: 2,
    user_name: "chuck",
    email: "chuck@gmail.com",
    user_password: "Nunchucks2026",
    user_role: "ADMIN",
    user_address: "Sørnesvågen",
    user_country: "Norway",
  },
];

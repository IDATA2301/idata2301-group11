import { apiFetch } from "./apiFetch";

export type ContactMessage = {
  id: number;
  senderEmail: string;
  contactmessage_subject: string;
  contactmessage_message: string;
  created_at: string;
  user: { id: number; user_name: string; email: string } | null;
};

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const res = await apiFetch("/contact");
  if (!res.ok) throw new Error(`Failed to fetch messages (HTTP ${res.status})`);
  return res.json();
}

export async function deleteContactMessage(id: number): Promise<void> {
  const res = await apiFetch(`/contact/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error(`Failed to delete message (HTTP ${res.status})`);
}

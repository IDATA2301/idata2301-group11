import { apiFetch } from "./apiFetch";

export type AdminDestination = {
  id: number;
  city: string;
  country: string;
  imageUrl: string | null;
  imageAlt: string | null;
};

export type AdminDestinationInput = {
  city?: string;
  country?: string;
  imageUrl?: string;
  imageAlt?: string;
};

async function parseJsonOrThrow<T>(response: Response, action: string): Promise<T> {
  if (response.status === 204) return undefined as unknown as T;
  if (!response.ok) {
    let message = `Failed to ${action} (HTTP ${response.status})`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return response.json();
}

export async function fetchAdminDestinations(): Promise<AdminDestination[]> {
  const response = await apiFetch(`/admin/destinations`);
  return parseJsonOrThrow(response, "load destinations");
}

export async function fetchAdminDestination(id: number): Promise<AdminDestination> {
  const response = await apiFetch(`/admin/destinations/${id}`);
  return parseJsonOrThrow(response, "load destination");
}

export async function createAdminDestination(input: AdminDestinationInput): Promise<AdminDestination> {
  const response = await apiFetch(`/admin/destinations`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(response, "create destination");
}

export async function updateAdminDestinationById(
  id: number,
  input: AdminDestinationInput,
): Promise<AdminDestination> {
  const response = await apiFetch(`/admin/destinations/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(response, "save destination");
}

export async function deleteAdminDestination(id: number): Promise<void> {
  const response = await apiFetch(`/admin/destinations/${id}`, { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    let message = `Failed to delete destination (HTTP ${response.status})`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}

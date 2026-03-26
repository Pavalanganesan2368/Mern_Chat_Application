/**
 * Format a date to a human-readable time string (e.g., "2:45 PM")
 */
export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

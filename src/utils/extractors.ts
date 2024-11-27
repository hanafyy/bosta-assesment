export function getLastReason(
  transitEvents: Array<{ state: string; timestamp: string; reason?: string }>
): string | null {
  // Filter the events to only those that have a reason
  const eventsWithReason = transitEvents.filter((event) => event.reason);

  // If there are no events with a reason, return null
  if (eventsWithReason.length === 0) {
    return null;
  }

  // Return the reason of the last event in the filtered array
  return eventsWithReason[eventsWithReason.length - 1].reason || null;
}

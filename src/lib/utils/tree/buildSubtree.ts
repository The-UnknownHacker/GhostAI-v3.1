import type { Conversation } from "$lib/types/Conversation";
import type { Message } from "$lib/types/Message";

export function buildSubtree(
	conv: Pick<Conversation, "messages" | "rootMessageId">,
	id: Message["id"]
): Message[] {
	if (!conv.rootMessageId) {
		if (conv.messages.length === 0) return [];
		// legacy conversation slice up to id
		const index = conv.messages.findIndex((m) => m.id === id);
		if (index === -1) throw new Error("Message not found");
		return conv.messages.slice(0, index + 1);
	} else {
		// find the message with the right id then create the ancestor tree
		const message = conv.messages.find((m) => m.id === id);
		if (!message) throw new Error("Message not found");

		return [
			...(message.ancestors?.map((ancestorId) => {
				const ancestor = conv.messages.find((m) => m.id === ancestorId);
				if (!ancestor) throw new Error("Ancestor not found");
				return ancestor;
			}) ?? []),
			message,
		];
	}
}

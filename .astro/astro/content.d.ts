declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">;
  render(): Render[".md"];
}>;
"faq": {
"how-do-i-register-for-the-portal.md": {
	id: "how-do-i-register-for-the-portal.md";
  slug: "how-do-i-register-for-the-portal";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"if-the-doctor-orders-me-blood-work-where-can-i-get-it-done.md": {
	id: "if-the-doctor-orders-me-blood-work-where-can-i-get-it-done.md";
  slug: "if-the-doctor-orders-me-blood-work-where-can-i-get-it-done";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-if-im-not-able-to-come-in-for-an-office-visit-but-i-want-to-see-the-doctor.md": {
	id: "what-if-im-not-able-to-come-in-for-an-office-visit-but-i-want-to-see-the-doctor.md";
  slug: "what-if-im-not-able-to-come-in-for-an-office-visit-but-i-want-to-see-the-doctor";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-insurances-do-you-all-accept.md": {
	id: "what-insurances-do-you-all-accept.md";
  slug: "what-insurances-do-you-all-accept";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-is-healow.md": {
	id: "what-is-healow.md";
  slug: "what-is-healow";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-is-the-patient-portal.md": {
	id: "what-is-the-patient-portal.md";
  slug: "what-is-the-patient-portal";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"which-credit-cards-do-you-all-accept.md": {
	id: "which-credit-cards-do-you-all-accept.md";
  slug: "which-credit-cards-do-you-all-accept";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
};
"services": {
"blood-work.md": {
	id: "blood-work.md";
  slug: "blood-work";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"health-screenings.md": {
	id: "health-screenings.md";
  slug: "health-screenings";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"preventative-medicine.md": {
	id: "preventative-medicine.md";
  slug: "preventative-medicine";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"telehealth-appointments.md": {
	id: "telehealth-appointments.md";
  slug: "telehealth-appointments";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
};
"team": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "team";
  data: InferEntrySchema<"team">;
  render(): Render[".md"];
}>;
"testimonials": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}

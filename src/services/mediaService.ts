import prisma from "../config/db/client";

export type RelatedType = "Project" | "Release" | "KnowledgeDoc" | string; //do not need to add all the types

export interface MediaInput {
  url: string;
  type: string; // "cover", "logo", etc.
}

export const MediaService = {
  async attachMany(
    relatedType: RelatedType,
    relatedId: string,
    items: MediaInput[]
  ) {
    if (!items || items.length === 0) return [];

    const data = items.map((m) => ({
      relatedType,
      relatedId,
      url: m.url,
      type: m.type,
    }));

    return prisma.media.createMany({ data });
  },

  async replaceMany(
    relatedType: RelatedType,
    relatedId: string,
    items: MediaInput[]
  ) {
    // remove old media
    await prisma.media.deleteMany({
      where: { relatedType, relatedId },
    });

    if (!items || items.length === 0) return [];

    const data = items.map((m) => ({
      relatedType,
      relatedId,
      url: m.url,
      type: m.type,
    }));

    return prisma.media.createMany({ data });
  },

  async getFor(relatedType: RelatedType, relatedId: string) {
    return prisma.media.findMany({
      where: { relatedType, relatedId },
      orderBy: { createdAt: "asc" },
    });
  },

  async deleteFor(relatedType: RelatedType, relatedId: string) {
    return prisma.media.deleteMany({
      where: { relatedType, relatedId },
    });
  },
};

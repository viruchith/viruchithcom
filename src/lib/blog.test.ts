import { describe, it, expect } from "vitest";
import { formatArticleDate, getReadingTime, getBlogSlug } from "./blog";

describe("formatArticleDate", () => {
  it("formats a date in en-US short format", () => {
    const date = new Date("2025-03-15T00:00:00Z");
    const result = formatArticleDate(date);
    expect(result).toBe("Mar 15, 2025");
  });
});

describe("getReadingTime", () => {
  it("returns 1 min read for short content", () => {
    const content = "Hello world";
    expect(getReadingTime(content)).toBe("1 min read");
  });

  it("calculates reading time based on 220 wpm", () => {
    const words = Array(660).fill("word").join(" ");
    expect(getReadingTime(words)).toBe("3 min read");
  });

  it("rounds to nearest minute", () => {
    const words = Array(330).fill("word").join(" ");
    expect(getReadingTime(words)).toBe("2 min read");
  });
});

describe("getBlogSlug", () => {
  it("returns slug field if present", () => {
    const post = { slug: "my-post", id: "2025/my-post.md" } as any;
    expect(getBlogSlug(post)).toBe("my-post");
  });

  it("derives slug from id when slug is empty", () => {
    const post = { slug: "", id: "2025/hello-world.md" } as any;
    expect(getBlogSlug(post)).toBe("2025/hello-world");
  });

  it("strips /index suffix", () => {
    const post = { slug: "", id: "2025/hello-world/index.mdx" } as any;
    expect(getBlogSlug(post)).toBe("2025/hello-world");
  });
});

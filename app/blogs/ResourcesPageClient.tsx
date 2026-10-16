"use client";

/**
 * The Blogs landing UI: hero, type filter, search, featured card and the resource grid.
 *
 * This is the former /resources page's implementation, carried over unchanged and now the
 * shell for /blogs: app/blogs/page.tsx feeds it Category 1 (Tax & Compliance Guides) of the
 * 31 migrated articles from app/blogs/articles.ts, in place of the old placeholder
 * Fermor-press content. `includeExtraSections` (default true) also renders NewsPressSection
 * and WebinarsReportsSection below, which now carry Category 2 and Category 3 of the same
 * article set rather than their old placeholder "Fermor in the news"/"Case Studies" and
 * "Webinars"/"E-books" content. Nothing about the layout, typography, spacing or responsive
 * behavior below is caller-specific.
 */

import { FormEvent, useMemo, useState } from "react";
import { searchScore } from "@/utils/searchMatch";
import Link from "next/link";
import FloatingNav from "../_home/FloatingNav";
import SectionPanels from "../_home/SectionPanels";
import { Footer } from "../_home/Footer";
import NewsPressSection from "@/components/resources/NewsPressSection";
import WebinarsReportsSection from "@/components/resources/WebinarsReportsSection";
import {
  CATEGORY_1_NAME,
  CATEGORY_2_NAME,
  CATEGORY_3_NAME,
  CATEGORY_NAMES,
  FEATURED_RESOURCE_ITEMS,
} from "./blogCategories";
import { preserveScroll } from "./preserveScroll";

/** A resource's `type` is now always one of the three real /blogs categories (see
    CATEGORY_NAMES in blogCategories.ts) - the old five make-believe resource types
    (ARTICLES/NEWS/CASE STUDIES/WEBINARS/E-BOOKS) are gone. Kept as `string` rather than a
    hardcoded union so this file never has to be edited if a category is ever renamed - the
    name lives in exactly one place, blogCategories.ts. */
export type ResourceType = string;

export type ResourceItem = {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  publicationLabel: string;
  source?: string;
  /** Full destination URL for this card, e.g. "/blogs/gst-rates". */
  href: string;
  /** Human-readable date, shown on the card as-is. */
  date: string;
  /** ISO-8601 date for the <time dateTime> attribute. */
  isoDate: string;
  /** Extra text the search box matches against (full lead, sub-category, tickers). Not shown. */
  searchText?: string;
};

/** The three real /blogs categories, not the old five placeholder resource types. */
export const RESOURCE_TYPES: ResourceType[] = CATEGORY_NAMES;

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M3 9h11" />
      <path d="m9.5 4.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m4.5 4.5 9 9" />
      <path d="m13.5 4.5-9 9" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M9 3v12" />
      <path d="M3 9h12" />
    </svg>
  );
}

function ResourceCard({
  resource,
  revealing,
  featured,
}: {
  resource: ResourceItem;
  revealing?: boolean;
  /** Only the 3 Featured Articles cards pass this - a colour variant only, everything else
      about the card (markup, dimensions, links, hover, responsive behaviour) is identical. */
  featured?: boolean;
}) {
  return (
    <Link
      href={resource.href}
      className={`resource-card${featured ? " resource-card-featured" : ""}${revealing ? " resource-card-revealing" : ""}`}
    >
      <div>
        <span className="resource-card-type">{resource.type}</span>
        {resource.source ? (
          <span className="resource-card-source">{resource.source}</span>
        ) : null}
      </div>

      <div className="resource-card-content">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
      </div>

      <time dateTime={resource.isoDate}>{resource.date}</time>

      <span className="resource-card-arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export default function ResourcesPageClient({
  resources,
  includeExtraSections = true,
}: {
  resources: ResourceItem[];
  /** Category 2 ("Markets & Current Affairs", black) and Category 3 ("Government & Utility
      Services", white) -- the two bands below Category 1's hero/grid section. */
  includeExtraSections?: boolean;
}) {
  const [selectedType, setSelectedType] = useState<ResourceType | "ALL TYPES">(
    "ALL TYPES",
  );
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllResources, setShowAllResources] = useState(false);

  const visibleResources = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const categoryResources =
      selectedType === "ALL TYPES"
        ? resources
        : resources.filter((resource) => resource.type === selectedType);

    if (!normalizedSearchTerm) {
      return categoryResources;
    }

    // Score every article, drop non-matches, and put the best matches first. Ties keep the
    // original newest-first order (Array.prototype.sort is stable).
    return categoryResources
      .map((resource) => ({
        resource,
        score: searchScore(
          normalizedSearchTerm,
          resource.title,
          [
            resource.description,
            resource.type,
            resource.source ?? "",
            resource.searchText ?? "",
          ].join(" "),
        ),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ resource }) => resource);
  }, [resources, searchTerm, selectedType]);

  const isSearching = searchTerm.trim().length > 0;
  // Searching or picking a category both switch the page into results mode: Featured Articles
  // and the category bands hide, and every matching article shows straight under the controls.
  const isFiltering = isSearching || selectedType !== "ALL TYPES";

  const typeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const resource of resources) {
      counts.set(resource.type, (counts.get(resource.type) ?? 0) + 1);
    }
    return counts;
  }, [resources]);

  // In results mode every match is shown, so nothing is hidden behind "See more".
  const displayedResources =
    showAllResources || isFiltering
      ? visibleResources
      : visibleResources.slice(0, 3);
  const revealedCount = displayedResources.length - Math.min(3, visibleResources.length);

  function handleTypeSelect(type: ResourceType | "ALL TYPES") {
    setSelectedType(type);
    setSearchTerm("");
    setShowAllResources(false);
    setIsTypeMenuOpen(false);
  }

  function handleTypeControlClick() {
    setIsTypeMenuOpen((currentValue) => !currentValue);
    setIsSearchOpen(false);
    setSearchTerm("");
    setShowAllResources(false);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsTypeMenuOpen(false);
  }

  function handleSearchOpen() {
    setIsSearchOpen(true);
    setIsTypeMenuOpen(false);
    setShowAllResources(false);
  }

  function handleSearchClose() {
    setSearchTerm("");
    setIsSearchOpen(false);
  }

  const sectionLabel =
    selectedType === "ALL TYPES"
      ? "Articles"
      : selectedType
          .toLowerCase()
          .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const sectionHeading =
    selectedType === "ALL TYPES"
      ? "Deep dives into personal finance"
      : selectedType === CATEGORY_1_NAME
        ? "Deep dives into personal finance"
        : selectedType === CATEGORY_2_NAME
          ? "What moved the markets, and what it means for you"
          : "Government and utility services, explained end to end";

  const sectionDescription =
    selectedType === "ALL TYPES"
      ? "Practical insights to help you make clearer, more confident financial decisions."
      : selectedType === CATEGORY_1_NAME
        ? "Ideas and practical insights for making better financial decisions."
        : selectedType === CATEGORY_2_NAME
          ? "Updates and perspectives on the markets and the headlines that move them."
          : "Straightforward steps for EPF, GST, and other government and utility services.";

  return (
    <div data-fp-page="">
      {/* The homepage frame, unchanged: dark ground, inset gutters, rounded panels and the
          same scroll-linked recede. SectionPanels drives whatever `main > section[data-section]`
          it finds, so this needs no second transition engine. */}
      <SectionPanels />
      <main>
      <section data-section="1" className="resources-page">
      <FloatingNav />

      <section
        className={`resources-hero ${isFiltering ? "resources-hero-searching" : ""}`}
        aria-labelledby="resources-title"
      >
        <h1 id="resources-title">Blogs</h1>

        <div className="resources-controls">
          <div className="type-control">
            <button
              type="button"
              className={`type-trigger ${
                isTypeMenuOpen ? "type-trigger-open" : ""
              }`}
              aria-expanded={isTypeMenuOpen}
              aria-haspopup="listbox"
              onClick={handleTypeControlClick}
            >
              <span>{selectedType}</span>

              <span
                className={`type-trigger-icon ${
                  isTypeMenuOpen ? "is-open" : ""
                }`}
                aria-hidden="true"
              >
                <span className="type-icon-plus">
                  <PlusIcon />
                </span>
                <span className="type-icon-close">
                  <CloseIcon />
                </span>
              </span>
            </button>

            <div
              className={`type-menu ${
                isTypeMenuOpen ? "type-menu-visible" : ""
              }`}
              role="listbox"
              aria-label="Resource type"
              aria-hidden={!isTypeMenuOpen}
            >
              <button
                type="button"
                role="option"
                aria-selected={selectedType === "ALL TYPES"}
                onClick={() => handleTypeSelect("ALL TYPES")}
              >
                ALL TYPES ({resources.length})
              </button>

              {RESOURCE_TYPES.map((type) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedType === type}
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                >
                  {type} ({typeCounts.get(type) ?? 0})
                </button>
              ))}
            </div>
          </div>

          <div
            className={`search-control ${
              isSearchOpen ? "search-control-open" : ""
            }`}
          >
            <button
              type="button"
              className={`search-trigger ${
                isSearchOpen ? "search-trigger-hidden" : ""
              }`}
              onClick={handleSearchOpen}
              aria-label="Open resource search"
              tabIndex={isSearchOpen ? -1 : 0}
            >
              <SearchIcon />
              <span>SEARCH</span>
            </button>

            <form
              className={`search-form ${
                isSearchOpen ? "search-form-visible" : ""
              }`}
              onSubmit={handleSearchSubmit}
              aria-hidden={!isSearchOpen}
            >
              <SearchIcon />

              <input
                autoFocus={isSearchOpen}
                required
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search resources"
                placeholder="Search"
                spellCheck={false}
                tabIndex={isSearchOpen ? 0 : -1}
              />

              <button
                type="button"
                className="search-close"
                onClick={handleSearchClose}
                aria-label="Clear and close search"
                tabIndex={isSearchOpen ? 0 : -1}
              >
                <CloseIcon />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Articles: always the 3 latest across all 31, regardless of the type filter
          below - see FEATURED_RESOURCE_ITEMS in blogCategories.ts. Reuses ResourceCard exactly,
          no bespoke card design. */}
      {!isFiltering && (
        <section className="resources-featured" aria-labelledby="featured-articles-title">
          <h2 id="featured-articles-title">Featured Articles</h2>
          <div className="resource-grid">
            {FEATURED_RESOURCE_ITEMS.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} featured />
            ))}
          </div>
        </section>
      )}

      <section
        className={`resources-content ${isFiltering ? "resources-content-searching" : ""}`}
        {...(isFiltering
          ? { "aria-label": isSearching ? "Search results" : `${selectedType} articles` }
          : { "aria-labelledby": "resource-section-title" })}
      >
        {/* In results mode the articles sit straight under the controls with no heading.
            The match count is still announced to screen readers, but never shown. */}
        <p className="resources-sr-only" aria-live="polite">
          {isFiltering
            ? `${visibleResources.length} ${visibleResources.length === 1 ? "article" : "articles"} found`
            : ""}
        </p>

        {!isFiltering && (
          <div className="resources-section-heading">
            <p>{sectionLabel}</p>
            <h2 id="resource-section-title">{sectionHeading}</h2>
            <span>{sectionDescription}</span>
          </div>
        )}

        {displayedResources.length > 0 ? (
          <div className="resource-grid">
            {displayedResources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                revealing={index >= displayedResources.length - revealedCount}
              />
            ))}
          </div>
        ) : (
          <div className="resource-empty-state">
            <h3>No resources found</h3>
            <p>Try another search term.</p>
          </div>
        )}

        {/* Works for any selected category now, not just ALL TYPES - Category 1 alone has 11
            articles, so capping it at 3 with no way to see the rest was a real gap. */}
        {visibleResources.length > 3 && !isFiltering ? (
          <button
            type="button"
            className="see-more-button"
            onClick={() => preserveScroll(() => setShowAllResources((currentValue) => !currentValue))}
          >
            {showAllResources
              ? "SHOW LESS"
              : "SEE MORE"}
          </button>
        ) : null}
      </section>

      <style jsx global>{`
        :root {
          --resources-ink: #0a0b0a;
          --resources-muted: #27413a;
          --resources-border: #d7e1dd;
          --resources-green: #75FB90;
        }

        html {
          scroll-behavior: smooth;
        }

        .resources-page {
          min-height: 100vh;
          overflow-x: hidden;
          background: #F2F3F4;
          color: var(--resources-ink);
          font-family: var(--font-inter), Inter, Arial, sans-serif;
          /* The copy sat a shade too tight at these sizes. Small enough not to read as
             letterspacing, large enough that words stop touching. */
          word-spacing: 0.035em;
          /* The page header that used to sit here was 88px tall and in flow. FloatingNav
             replaces it and is position: fixed, so it reserves no height; this puts the same
             88px back and keeps every offset below it exactly where the page had it. */
          padding-top: 88px;
        }

        .resources-page *,
        .resources-page *::before,
        .resources-page *::after {
          box-sizing: border-box;
        }

        .resources-nav {
          position: relative;
          z-index: 20;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          min-height: 88px;
          padding: 0 60px;
          border-bottom: 1px solid #edf1ef;
          background: #ffffff;
        }

        .resources-brand {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 12px;
          color: #0b0c0b;
          text-decoration: none;
        }

        .fermOR-logo-mark {
          width: 40px;
          height: 30px;
          flex: 0 0 auto;
          color: #75FB90;
        }

        .resources-brand span {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .resources-nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .resources-nav-links a {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          padding: 0 14px;
          border-radius: 13px;
          color: #111311;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition:
            background-color 220ms ease,
            color 220ms ease;
        }

        .resources-nav-links a:hover {
          background: #f1f7f4;
        }

        .resources-nav-links .resources-nav-active {
          background: rgba(117,251,144,.10);
          color: #75FB90;
        }

        .resources-nav-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 26px;
        }

        .resources-login {
          color: #0b0c0b;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }

        .resources-get-started {
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          gap: 14px;
          padding: 0 20px;
          border-radius: 13px;
          background: #111311;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }

        .resources-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 112px 24px 127px;
          text-align: center;
        }

        .resources-hero h1 {
          margin: 0;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: clamp(72px, 7.4vw, 116px);
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: -0.075em;
        }

        .resources-controls {
          position: relative;
          z-index: 15;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 34px;
        }

        .type-control,
        .search-control {
          position: relative;
          height: 42px;
        }

        .type-control {
          /* Widened from 118px: the three real category names ("Government & Utility
             Services") run much longer than the old five placeholder types ("WEBINARS",
             "E-BOOKS") ever did. The trigger's own text still ellipsises if it's ever tight
             (see .type-trigger span below); this is just enough room that it normally doesn't
             have to. */
          width: 190px;
        }

        .search-control {
          width: 98px;
          transition: width 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .search-control-open {
          width: 216px;
        }

        .type-trigger,
        .search-trigger,
        .search-form {
          height: 42px;
          border: 1px solid #d4dfdb;
          border-radius: 10px;
          background: #ffffff;
          color: #0b0c0b;
        }

        .type-trigger {
          display: flex;
          width: 190px;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px 0 14px;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 750;
          letter-spacing: -0.01em;
          text-align: left;
          transition:
            border-color 300ms ease,
            background-color 300ms ease;
        }

        .type-trigger span:first-child {
          flex: 1 1 auto;
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-transform: uppercase;
        }

        .type-trigger:hover,
        .type-trigger-open {
          border-color: #c8d5d0;
        }

        .type-trigger-icon {
          position: relative;
          display: inline-flex;
          width: 15px;
          height: 15px;
          align-items: center;
          justify-content: center;
        }

        .type-icon-plus,
        .type-icon-close {
          position: absolute;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition:
            opacity 700ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .type-icon-plus {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .type-icon-close {
          opacity: 0;
          transform: rotate(-90deg) scale(0.7);
        }

        .type-trigger-icon.is-open .type-icon-plus {
          opacity: 0;
          transform: rotate(90deg) scale(0.7);
        }

        .type-trigger-icon.is-open .type-icon-close {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .type-menu {
          position: absolute;
          top: 48px;
          left: 0;
          z-index: 30;
          /* Widened alongside .type-trigger, and by more: "Government & Utility Services" at
             11px still needs real room even on one line, and unlike the trigger this panel has
             no reason to ellipsis its own options away. */
          width: 258px;
          height: 150px;
          padding: 7px;
          overflow: hidden;
          border: 1px solid #d9e2df;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0 15px 30px rgba(24, 47, 39, 0.08);
          opacity: 0;
          pointer-events: none;
          transform: translateY(-7px);
          transform-origin: top center;
          transition:
            opacity 260ms ease,
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .type-menu-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .type-menu button {
          display: flex;
          width: 100%;
          height: 27px;
          align-items: center;
          padding: 0 8px;
          border: 0;
          border-radius: 5px;
          background: transparent;
          color: #101311;
          cursor: pointer;
          font-family: inherit;
          font-size: 11px;
          font-weight: 650;
          text-align: left;
          text-transform: uppercase;
          white-space: nowrap;
          transition: background-color 180ms ease;
        }

        .type-menu button:hover,
        .type-menu button:focus-visible {
          outline: none;
          background: #f2f6f4;
        }

        .search-trigger {
          display: flex;
          width: 98px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 750;
          opacity: 1;
          transition:
            opacity 260ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .search-trigger-hidden {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.94);
        }

        .search-form {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 9px 0 12px;
          opacity: 0;
          pointer-events: none;
          transform: scaleX(0.72);
          transform-origin: right center;
          transition:
            opacity 300ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .search-form-visible {
          opacity: 1;
          pointer-events: auto;
          transform: scaleX(1);
        }

        .search-form:focus-within {
          border-color: #d4dfdb;
          outline: none;
          box-shadow: none;
        }

        .search-form input {
          min-width: 0;
          flex: 1;
          height: 40px;
          margin-left: 8px;
          border: 0;
          outline: none !important;
          box-shadow: none !important;
          background: transparent;
          color: #101311;
          font: inherit;
          font-size: 13px;
        }

        .search-form input:focus,
        .search-form input:focus-visible {
          outline: none !important;
          border: 0 !important;
          box-shadow: none !important;
        }

        .search-form input::placeholder {
          color: #5b625f;
          opacity: 1;
        }

        .search-close {
          display: inline-flex;
          width: 20px;
          height: 24px;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          background: transparent;
          color: #111311;
          cursor: pointer;
        }

        .resources-content {
          padding: 0 4.1vw 90px;
        }

        .resources-section-heading {
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
        }

        .resources-section-heading p {
          margin: 0 0 25px;
          color: var(--resources-muted);
          font-size: 15px;
          line-height: 1;
        }

        .resources-section-heading h2 {
          max-width: 1200px;
          margin: 0 auto;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: clamp(50px, 4.45vw, 76px);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.065em;
        }

        .resources-section-heading span {
          display: block;
          margin-top: 25px;
          color: #24423a;
          font-size: 16px;
          line-height: 1.5;
        }

        .resources-featured {
          /* Same side gutter as .resources-content (Section 1/2/3) - was 0, which let this
             section's own resource-grid stretch wider than every other section's and touch the
             page edges instead of matching their card size. */
          padding: 0 4.1vw 32px;
          text-align: center;
        }

        .resources-featured h2 {
          margin: 0;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: clamp(34px, 3.2vw, 52px);
          font-weight: 400;
          line-height: 1.02;
          letter-spacing: -0.055em;
        }

        .resources-featured .resource-grid {
          margin-top: 44px;
        }

        /* Cards revealed by "See more" fade and rise into place rather than simply appearing,
           since they are new DOM nodes on mount (not a visibility toggle on existing ones) - a
           CSS transition can't animate that on its own, but a keyframe animation on mount can. */
        @keyframes resource-card-reveal {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .resource-card-revealing {
          animation: resource-card-reveal 0.5s cubic-bezier(0.2, 0.8, 0.28, 1) both;
        }

        .resource-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          max-width: 1500px;
          margin: 66px auto 0;
          /* "See more" grows this grid in place. Without this, the browser's scroll-anchoring
             heuristic (which exists to stop the page jumping when content changes ABOVE the
             viewport, e.g. an ad loading in) sees this grid resize and "corrects" the scroll
             position anyway when the grid overlaps the current viewport - producing exactly the
             unwanted jump the See more interaction must not have. */
          overflow-anchor: none;
        }

        .resource-card {
          position: relative;
          display: flex;
          min-height: 450px;
          flex-direction: column;
          padding: 35px 38px 30px;
          overflow: hidden;
          border: 1px solid #dce5e1;
          border-radius: 20px;
          background: #f7f9f8;
          color: var(--resources-ink);
          text-decoration: none;
          transition:
            transform 240ms ease,
            border-color 240ms ease,
            box-shadow 240ms ease;
        }

        .resource-card:hover {
          transform: translateY(-3px);
          border-color: #c3d3cd;
          box-shadow: 0 16px 34px rgba(22, 55, 45, 0.07);
        }

        .resource-card-type {
          color: var(--resources-muted);
          font-size: 12px;
          font-weight: 750;
        }

        .resource-card-source {
          display: block;
          margin-top: 6px;
          color: #63716c;
          font-size: 10px;
          font-weight: 650;
          text-transform: uppercase;
        }

        .resource-card-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 10px;
          text-align: center;
        }

        .resource-card h3 {
          max-width: 410px;
          margin: 0;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: clamp(31px, 2.25vw, 42px);
          font-weight: 400;
          line-height: 1.02;
          letter-spacing: -0.055em;
        }

        .resource-card p {
          max-width: 380px;
          margin: 20px 0 0;
          color: #3d504a;
          font-size: 14px;
          line-height: 1.5;
        }

        .resource-card time {
          color: #5d6c66;
          font-size: 12px;
        }

        .resource-card-arrow {
          position: absolute;
          right: 24px;
          bottom: 23px;
          display: inline-flex;
          width: 30px;
          height: 30px;
          align-items: center;
          justify-content: center;
          border: 1px solid #d1ddd8;
          border-radius: 50%;
          opacity: 0;
          transform: translateX(-4px);
          transition:
            opacity 220ms ease,
            transform 220ms ease;
        }

        .resource-card:hover .resource-card-arrow,
        .resource-card:focus-visible .resource-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* The 3 Featured Articles cards only - everything else about .resource-card (size,
           padding, border-radius, hover lift, transition timing) is untouched; only the colour
           changes, plus the text colours it takes to keep them readable on blue instead of the
           card's usual off-white. */
        .resource-card-featured {
          background: #106ea9;
          border-color: rgba(255, 255, 255, 0.16);
          color: #ffffff;
        }

        .resource-card-featured:hover {
          border-color: rgba(255, 255, 255, 0.32);
          box-shadow: 0 16px 34px rgba(9, 45, 68, 0.35);
        }

        .resource-card-featured .resource-card-type {
          color: rgba(255, 255, 255, 0.78);
        }

        .resource-card-featured p {
          color: rgba(255, 255, 255, 0.82);
        }

        .resource-card-featured time {
          color: rgba(255, 255, 255, 0.65);
        }

        .resource-card-featured .resource-card-arrow {
          border-color: rgba(255, 255, 255, 0.35);
        }

        .see-more-button {
          display: block;
          min-height: 42px;
          margin: 34px auto 0;
          padding: 0 20px;
          border: 1px solid #d3dfda;
          border-radius: 10px;
          background: #ffffff;
          color: #101311;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          font-weight: 750;
          transition:
            background-color 220ms ease,
            border-color 220ms ease;
        }

        .see-more-button:hover {
          border-color: #bfcfc9;
          background: #f5f8f7;
        }

        .resource-empty-state {
          padding: 80px 20px;
          text-align: center;
        }

        /* Search mode: no heading between the search box and the results, so close the gap,
           and centre a partial row (1 or 2 matches) instead of leaving it flush left. The
           track width leaves 1px of slack so rounding can never drop the row to 2 columns. */
        .resources-hero-searching {
          padding-bottom: 64px;
        }

        .resources-content-searching .resource-grid {
          grid-template-columns: repeat(auto-fit, calc((100% - 40px) / 3 - 1px));
          justify-content: center;
          margin-top: 0;
        }

        .resources-content-searching .resource-empty-state {
          padding: 16px 20px 80px;
        }

        .resources-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }

        .resource-empty-state h3 {
          margin: 0;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: 42px;
          font-weight: 400;
          letter-spacing: -0.05em;
        }

        .resource-empty-state p {
          margin: 12px 0 0;
          color: var(--resources-muted);
          font-size: 15px;
        }

        @media (max-width: 1180px) {
          .resources-nav {
            grid-template-columns: 1fr auto;
            gap: 12px;
            padding: 0 34px;
          }

          .resources-nav-links {
            grid-column: 1 / -1;
            grid-row: 2;
            padding-bottom: 10px;
          }

          .resources-nav-actions {
            grid-column: 2;
            grid-row: 1;
          }

          .resource-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .resources-content-searching .resource-grid {
            grid-template-columns: repeat(auto-fit, calc((100% - 20px) / 2 - 1px));
          }
        }

        @media (max-width: 760px) {
          /* Matches the removed header's 74px mobile min-height, same reason as above. */
          .resources-page {
            padding-top: 74px;
          }

          .resources-nav {
            display: flex;
            min-height: 74px;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 18px 9px;
          }

          .resources-brand span {
            font-size: 20px;
          }

          .resources-nav-actions {
            gap: 0;
          }

          .resources-login {
            display: none;
          }

          .resources-get-started {
            min-height: 42px;
            padding: 0 14px;
            font-size: 11px;
          }

          .resources-nav-links {
            order: 3;
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
            padding-top: 7px;
            scrollbar-width: none;
          }

          .resources-nav-links::-webkit-scrollbar {
            display: none;
          }

          .resources-nav-links a {
            min-height: 40px;
            padding: 0 11px;
            font-size: 13px;
          }

          .resources-hero {
            padding: 78px 18px 97px;
          }

          .resources-hero h1 {
            font-size: clamp(60px, 17vw, 88px);
          }

          .resources-controls {
            margin-top: 29px;
          }

          .resources-content {
            padding: 0 18px 70px;
          }

          .resources-featured {
            padding: 0 18px 32px;
          }

          .resources-section-heading p {
            margin-bottom: 18px;
            font-size: 14px;
          }

          .resources-section-heading h2 {
            font-size: clamp(42px, 10vw, 60px);
          }

          .resources-section-heading span {
            margin-top: 17px;
            font-size: 14px;
          }

          .resources-featured .resource-grid {
            margin-top: 34px;
          }

          .resource-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 44px;
          }

          .resources-content-searching .resource-grid {
            grid-template-columns: 1fr;
            margin-top: 0;
          }

          .resources-hero-searching {
            padding-bottom: 48px;
          }

          .resource-card {
            min-height: 390px;
            padding: 30px 27px;
          }

          .type-menu {
            width: 258px;
          }
        }

        @media (max-width: 460px) {
          .resources-brand {
            gap: 8px;
          }

          .fermOR-logo-mark {
            width: 38px;
            height: 28px;
          }

          .resources-get-started {
            padding: 0 11px;
          }

          .resources-controls {
            gap: 7px;
          }

          .type-control,
          .type-trigger {
            width: 150px;
          }

          .search-control {
            width: 98px;
          }

          .search-control-open {
            width: min(205px, calc(100vw - 36px));
          }

          .search-trigger {
            width: 98px;
          }

          .resources-section-heading h2 {
            font-size: 40px;
          }

          .resource-card {
            min-height: 370px;
            padding: 27px 23px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .resources-page *,
          .resources-page *::before,
          .resources-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      </section>

      {includeExtraSections && !isFiltering && (
        <>
          {/* Section 2 -- Category 2, "Markets & Current Affairs" (black). */}
          <section data-section="2" style={{ background: "#1A1C1E" }}>
            <NewsPressSection />
          </section>

          {/* Section 3 -- Category 3, "Government & Utility Services" (white). */}
          <section data-section="3" style={{ background: "#ffffff" }}>
            <WebinarsReportsSection />
          </section>
        </>
      )}
      </main>

      {/* The homepage footer component itself, not a copy of it. */}
      <Footer minimal />
    </div>
  );
}

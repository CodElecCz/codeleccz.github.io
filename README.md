# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## Search indexing

The build generates `sitemap-index.xml` and its sitemap automatically at `https://codeleccz.github.io/sitemap-index.xml`, including the Hoerbiger reports site at `https://codeleccz.github.io/hoerbiger-reports/`. Submit the sitemap URL in Google Search Console.

The `public/robots.txt` file is published at the domain root and points search engines to both the main sitemap and the Hoerbiger reports sitemap.

## GitHub projects and articles

The Czech and English project pages fetch public repositories from the CodElecCz GitHub account during the build, excluding forks and this website repository. If the GitHub API is unavailable or rate-limited, the pages show a warning and link to the profile; rebuild when the API is available to refresh the list.

Add Markdown or MDX articles to `src/content/blog/` using the schema in `src/content.config.ts`. The articles section is hidden when there are no posts. The English page links to the original Czech articles.

Project repositories can also provide articles in `blog/index.cs.md` and `blog/index.en.md`. Register each project article in `src/data/external-articles.json` with its metadata and source files, then add its Czech and English routes under `src/pages/blog/` and `src/pages/en/blog/`. The build fetches the Markdown from the project repository, rewrites relative image links, and uses GitHub's `pushed_at` as the date in both languages. If the API is unavailable or returns an invalid date, the manifest dates are retained. Set `GITHUB_TOKEN` in the build environment to increase the GitHub API rate limit. Both publication pages sort repository and local articles together, newest first.

## Editing references

Edit [references.csv](src/data/references.csv) in a spreadsheet or text editor. Save it as UTF-8 CSV with a semicolon (`;`) delimiter and keep the header row. Both reference pages read this file when the site builds.

- Set `show_cs` and `show_en` to `1` to publish a language, or `0` to hide it. Published languages require a customer and their localized `title` and `description`. Use `eol`, `plc`, or `software` for `category`.
- Both reference pages accept `?oblast=eol`, `?oblast=pc-embedded`, or `?oblast=plc` to select the corresponding filter on load. The `pc-embedded` parameter selects references with the `software` category.
- Use `starší` in `year` for a reference spanning the older years; it appears in the localized older-reference group alongside entries from 2014–2016.
- Separate multiple technologies or badges with ` | `. The pages display `end_customer`, or `customer` if no separate end customer is known. The `commissioned_by` field is data only.
- When the displayed customer matches a `name` in [customers.csv](src/data/customers.csv), its `full_name` appears as a hover hint and its `website`, if present, is linked. Names without a match remain plain text; website URLs must use HTTP or HTTPS.
- The combined file contains one row per offer plus website references without a matching offer. Offers that are not verified references have both visibility fields set to `0`. To publish one, fill in the required public fields and set the appropriate visibility field to `1`. Only one reference with the same `reference_group` may be published per language.
- The `offer_number`, `source_folder`, `offer_project`, and `project_description` columns identify and describe entries from [offers.csv](src/data/offers.csv). The `customer` uses the corresponding name in [customers.csv](src/data/customers.csv), including the correction of `HUYNDAI` to `HYUNDAI`. The source files retain the original offer customer values and customer details without duplicating them here.
- The `website_source_cs` and `website_details_cs` columns preserve descriptions from the saved original website. Website-only references may have no known direct `customer`; their `end_customer` is taken from the website.
- Offer `project_description` values are editable Czech descriptions, based on matching offer PDFs or references where available. They are not updated automatically; some offers have no description.
- [customers.csv](src/data/customers.csv) is an editable snapshot of distinct customer and end-customer names from the offers. Its `direct_customer` and `end_customer` columns indicate each role with `1` or `0`. The combined file is a snapshot and is not updated automatically when the source CSVs change.
- Folder-derived names are provisional, not proof that a project was completed.
- The 2014–2016 Magneti Marelli projects are consolidated into one card in both languages; the individual rows are kept unpublished.

The CSV files contain customer and offer metadata. Unpublished fields are not included in the generated site, but they **will be visible in the repository** if committed to a public repository.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

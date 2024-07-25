Here's an updated version of the README to reflect your preferences:

```markdown
# Remark Extract Headers Example with SvelteKit

This repository contains the completed code for a custom [Remark](https://remark.js.org/) plugin integrated into a SvelteKit project. This example accompanies a tutorial on my blog, [JimsCode](https://jimscode.com), where I explain how to build and use this plugin step-by-step.

## Overview

The custom Remark plugin `remarkExtractHeaders` performs the following tasks:

1. **Extract Headers:**
   - Iterates through the heading nodes in the Markdown Abstract Syntax Tree (AST).
   - Generates unique IDs for each heading based on their text content.
   - Structures headers into a hierarchy, with h3 headers being children of the nearest h2 or higher-level header.

2. **Add IDs to Nodes:**
   - Adds generated IDs to the `id` property of each heading node, making it easy to create anchors for each section.

3. **Attach Headers Data:**
   - Attaches the structured header data to the `file.data.fm.headers` property of the file object.

## Purpose

This repository is intended for testing and running the completed code example. For detailed instructions on building and integrating this plugin into your own SvelteKit project, please refer to the tutorial on my blog: [How to Extract Headers from Markdown in SvelteKit with Remark](https://jimscode.com/your-tutorial-link).

## Installation

To test the completed code, follow these steps:

1. **Clone this repository:**

   ```bash
   git clone https://github.com/scionsamurai/remark-extract-headers-sveltekit.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd remark-extract-headers-sveltekit
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the SvelteKit development server:**

   ```bash
   npm run dev
   ```

## Usage

- **Header Extraction:**
  - The plugin processes headings of depth 2 and 3.
  - Headers of depth 2 (h2) are added to the main headers array.
  - Headers of depth 3 (h3) are nested under their corresponding h2 headers.

- **Generated Data:**
  - The `file.data.headers` array contains objects with `text`, `id`, and `depth` properties for each header.
  - Headers of depth 3 are included as children of their parent h2 headers.

## Example

An example Markdown document processed by this plugin might look like this:

```markdown
## Introduction
Some introduction text.

### Subsection
Details about the subsection.

## Another Section
Content for another section.
```

After processing, the header data will be structured as follows:

```json
[
  {
    "text": "Introduction",
    "id": "introduction",
    "depth": 2,
    "children": [
      {
        "text": "Subsection",
        "id": "subsection",
        "depth": 3
      }
    ]
  },
  {
    "text": "Another Section",
    "id": "another-section",
    "depth": 2
  }
]
```
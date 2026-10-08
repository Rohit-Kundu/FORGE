# FORGE project website

Website: https://rohit-kundu.github.io/FORGE/

Repository: https://github.com/Rohit-Kundu/FORGE

A complete static research website for **FORGE: Forensic Reasoning with Grounded Evidence**.

## Open it

Unzip this folder and open `index.html` in a browser. No build step, npm packages, API keys, external fonts, or JavaScript frameworks are required. An internet connection is only needed to follow external author links.

For a local server, run `python3 -m http.server 8000` from this directory, then open http://localhost:8000.

## Publish it

Upload the contents of this folder to your existing static host, keeping `index.html` at the site's root and preserving the relative paths. It also works in a GitHub Pages project subdirectory. No hosting-specific configuration is required. Published with GitHub Pages from the main branch (repository root).

## Edit links and citation

Edit `config.js`:

- `paperUrl`: defaults to the included paper and appendix.
- `codeUrl`: set the public repository URL when ready. The button remains hidden while empty.
- `bibtex`: paste the official citation when available. The fallback includes verified title and authors only; it deliberately makes no venue, year, DOI, or arXiv-ID assumption.

Author ordering follows the FORGE paper.

## Included assets — no missing files required

| File | Use / source |
| --- | --- |
| `assets/papers/forge.pdf` | Your supplied FORGE paper, including appendix |
| `assets/images/method.png` | Architecture, Figure 3, rendered directly from the supplied PDF |
| `assets/images/face.png` | Original `360_437.png`; hero and face example |
| `assets/images/real.png` | Original `392.png`; authentic example |
| `assets/images/doctor.png` | Original `554_572.png`; available for an extra example |
| `assets/images/qualitative.png` | Original supplementary qualitative figure / Figure A1; the cyclist is displayed using CSS cropping |
| `assets/images/teaser.png` | Original teaser / Figure 1; expandable baseline comparison |
| `assets/images/comparison.png` | Original `missed_vs_captured.png`; available for an extra comparison |
| `assets/authors/*` | Five author photographs |
| `assets/favicon.svg` | Small FORGE lettermark |

No AI-redrawn photographs from the poster mockup are used. The supplied image files are copied unchanged. Boxes are CSS overlays and never change the underlying source image. The architecture is a PDF rendering, not a generative reconstruction.

You can replace `method.png` with a sharper export using the same filename. Keep the other image framing unchanged if you want the region callouts to stay aligned. If you replace a photo with a differently framed crop, adjust the percentage coordinates in `styles.css` (hero) or `script.js` (interactive example).

## Page structure

1. Hero with annotated original image and response excerpt.
2. Research overview and expandable longer description.
3. Interactive, precomputed examples: face-manipulated, fully synthetic, authentic.
4. Method cards, expandable original architecture, and two training stages.
5. Dataset switcher for DD-VQA / DVF; detection accuracy, hallucinations, human evaluation, and architectural ablation.
6. Author cards.
7. Paper download and copyable citation.

## Content provenance

- Detection accuracy: Table 1.
- Architectural ablation: Table 2.
- Region hallucination and forensic precision: Table 4.
- Human evaluation means: Table A3, 300 stratified samples and three annotators.
- Example responses: supplied supplementary qualitative figure / Figure A1. The synthetic example is explicitly labeled as condensed; the others use excerpts.
- Architecture: Figure 3.

Results are recreated as accessible HTML/CSS charts and a table, so you do not need to add result screenshots. All figures are descriptive paper examples, not a live inference service. The site explicitly distinguishes illustrative region boxes from predicted localization outputs.

## Adding more paper figures

Place an image in `assets/images/`, then add a figure block to `index.html`:

```html
<figure class="architecture">
  <button class="figure-button" data-lightbox="assets/images/additional-results.png"
          aria-label="Enlarge additional results">
    <img src="assets/images/additional-results.png" loading="lazy"
         alt="Describe the specific result and dataset here">
  </button>
  <figcaption><span>ADDITIONAL RESULTS</span><span>Click to enlarge ↗</span></figcaption>
</figure>
```

The existing script automatically enables the lightbox for these buttons. Add a concise caption that identifies the table/figure and evaluation setting.

## Accessibility and maintenance

Responsive desktop/mobile layouts, keyboard-accessible controls, skip link, visible focus indicators, reduced-motion support, modal Escape handling, descriptive alt text, and textual chart values are included. Native details sections work without JavaScript; interactive charts and switches require JavaScript. Clipboard copying falls back to selecting the citation if the browser blocks clipboard access on local files.

The design uses system fonts to keep the package self-contained. There are no tracking scripts, embedded services, or analytics. This package contains no repository history or credentials.

Publication rights for the supplied paper and images remain with their respective owners. No new license is imposed on those assets.

## Validation performed

JavaScript syntax checks passed. All referenced local assets and in-page anchors resolve, and IDs are unique. Dataset switching, example switching, the overlay toggle, and modal open/close passed a DOM-simulation check. A real-browser visual preview could not be completed in the build environment because a browser binary was unavailable and its download failed; review the page in your browser before publication.

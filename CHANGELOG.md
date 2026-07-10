# Changelog

All notable changes to this project are documented in this file.

## [1.4.2] - 2026-07-10

### Changed
- Tuned homepage mobile rendering performance with lighter above-the-fold visual effects on small screens.
- Deferred non-critical homepage content rendering to reduce initial mobile paint cost.
- Optimized font loading behavior for mobile to reduce layout instability risk.
- Updated analytics loading strategy to reduce first-load contention on mobile.

### Infrastructure
- Updated project version to `1.4.2`.

## [1.4.1] - 2026-07-07

### Changed
- Added deferred loading for the cat widget one minute after page initialization.
- Added graceful runtime checks for unsupported environments before initializing the widget.
- Externalized stylesheet output for production to avoid inline CSS bloat in built HTML.

### Infrastructure
- Updated project version to `1.4.1`.

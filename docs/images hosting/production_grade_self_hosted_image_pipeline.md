# Production-Grade Self-Hosted Image Pipeline

This document describes a **practical, production-grade image processing pipeline** for self-hosted systems where:

- Images are customer-facing and performance-critical
- Upload frequency is low
- Runtime transformations are avoided
- All required variants are pre-generated and cached

The goal is **predictability, speed, and operational safety**.

---

## 1. Core Architectural Principle

> **Never perform image transformations on hot request paths.**

All image processing happens:
- Once (on upload or async job)
- In isolation
- Producing immutable outputs

Serving images must be static and CPU-free.

---

## 2. High-Level Architecture

```
[ Client Upload ]
      ↓
[ Upload API ]
      ↓
[ Original Image Store ]  (immutable)
      ↓
[ Async Image Processor ]
      ↓
[ Variant Store ]  (pre-generated)
      ↓
[ Nginx / CDN ]
```

Key properties:
- Originals are never modified
- Variants are deterministic
- URLs are immutable

---

## 3. Image Formats Strategy

### 3.1 Originals

- Store original files exactly as uploaded
- Do NOT recompress
- Do NOT resize
- Treat as source of truth

---

### 3.2 Output Formats (Opinionated Set)

| Image Type | Formats to Generate |
|----------|------------------|
| Photos | AVIF, WebP, JPEG |
| Graphics / Icons | WebP, PNG |
| Transparent assets | WebP, PNG |

Notes:
- AVIF is primary
- WebP is broad fallback
- JPEG exists only for legacy compatibility

---

## 4. Image Sizes (Keep This Small)

Avoid infinite or user-defined dimensions.

### 4.1 Content / Product Images

```
320px
640px
960px
1280px
```

### 4.2 Thumbnails / Lists

```
64px
128px
256px
```

No other sizes should exist.

---

## 5. Naming, Versioning & URLs

### 5.1 URL Structure

```
/images/{image_id}/v{version}/{width}w.{format}
```

Example:
```
/images/abc123/v1/640w.avif
```

### 5.2 Rules

- URLs are immutable
- Any change bumps `version`
- Cache forever
- No query parameters

---

## 6. Image Processing Library

### 6.1 Mandatory Choice: libvips

Reasons:
- Low memory usage
- Fast resize and encode
- Designed for server workloads

---

### 6.2 Language Bindings

| Language | Library |
|-------|--------|
| Go | bimg |
| Node.js | sharp |
| Rust | libvips-rs |
| C/C++ | native libvips |

Avoid ImageMagick and GD for production.

---

## 7. Processing Rules

### 7.1 Resize Strategy

- Always resize from the original
- Never resize from another variant

Recommended modes:
- `fit=inside` for content images
- `fit=cover` for thumbnails

---

### 7.2 Quality Settings

| Format | Quality |
|------|--------|
| AVIF | 45–55 |
| WebP | 75–82 |
| JPEG | 80–85 |

Strip:
- EXIF
- GPS
- Unused ICC profiles

---

## 8. Variant Generation Timing

### Recommended: On Upload (Async)

Flow:
1. Upload original
2. Persist metadata
3. Enqueue processing job
4. Generate all variants
5. Mark image as ready

Uploads are infrequent → predictable load.

---

## 9. Backend Integration

### 9.1 Database Model (Minimal)

```
images
- id
- version
- original_path
- width
- height
- mime_type
- status
```

Variants are **derived assets** and not stored as rows.

---

### 9.2 Backend Responsibilities

- Validate uploads
- Persist metadata
- Trigger processing
- Expose image URLs

Backend must NOT:
- Stream images
- Resize images
- Rewrite variants

---

## 10. Serving Strategy

- Static file serving via Nginx
- Optional CDN in front
- Backend only generates URLs

Images are never proxied through application servers.

---

## 11. Caching Strategy

Because URLs are immutable:

```
Cache-Control: public, max-age=31536000, immutable
```

- Cache forever
- No invalidation
- No purging

---

## 12. Operational Guidelines

Monitor:
- Variant generation failures
- Processing latency
- Disk growth rate

Do NOT:
- Log every image request
- Add runtime transforms later

---

## 13. Explicit Non-Goals

This pipeline intentionally avoids:
- Dynamic resize endpoints
- User-defined transformations
- Query-based image parameters
- Runtime CPU work

---

## 14. Final Outcome

This pipeline delivers:
- High performance
- Strong cacheability
- Minimal operational risk
- No vendor lock-in

Scaling requires adding storage and CDN capacity — not redesign.


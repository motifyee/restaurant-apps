# Self‑Hosted Image Backend – Implementation Guide

This document defines **mandatory protections** and **Nginx serving configuration** for a production‑grade, self‑hosted image backend.

Scope:
- Customer‑facing images
- Pre‑generated variants (no runtime transforms)
- High cacheability
- Minimal attack surface

---

## 1. Threat Model (What You Must Defend Against)

Image systems are abused even when uploads are infrequent.

Primary risks:
- Decompression bombs (huge pixel counts)
- Oversized uploads (disk + memory exhaustion)
- Crafted headers / MIME spoofing
- CPU exhaustion during decode
- Path traversal / object overwrite
- Hotlinking bandwidth abuse

Design assumption:
> **Never trust client input. Ever.**

---

## 2. Mandatory Protections (Non‑Optional)

### 2.1 Upload Limits (Hard Stops)

Apply at **multiple layers**.

| Control | Value (Recommended) |
|------|------------------|
| Max request body | 10–20 MB |
| Max pixel count | 40–50 MP |
| Max width/height | 10,000 px |
| Upload timeout | ≤ 30s |

Reject early. Do not stream blindly.

---

### 2.2 MIME & Content Validation

Never trust `Content-Type`.

Required checks:
- Detect real format via magic bytes
- Decode header only (not full image)
- Reject unknown / unsupported formats

Allowed input formats:
- JPEG
- PNG
- WebP
- HEIC (optional)

Reject everything else.

---

### 2.3 Decode Isolation

Image decoding is dangerous.

Minimum:
- Dedicated worker pool
- Memory limits
- CPU quotas

Best practice:
- Separate process or container
- No shared memory with API

If decoder crashes → API survives.

---

### 2.4 Idempotent Processing

Image processing **must be replay‑safe**.

Rules:
- Originals are immutable
- Variant paths are deterministic
- Regeneration overwrites safely

Never generate variants twice under different paths.

---

### 2.5 Rate Limiting (Upload Only)

Serving images is cheap.
Uploads are not.

Apply rate limits **only** to:
- Upload endpoints
- Metadata endpoints

Do NOT rate‑limit static image delivery.

---

## 3. Storage Layout (Security‑Friendly)

Filesystem or object storage layout:

```
/images/
  originals/
    ab/cd/uuid-original.ext
  variants/
    ab/cd/uuid/
      v1/
        320w.avif
        640w.webp
        1280w.jpg
```

Rules:
- No user‑controlled paths
- Hash‑based fan‑out directories
- Originals never served publicly

---

## 4. Nginx: Static Image Serving Configuration

### 4.1 Core Principles

- Nginx serves images directly
- Backend never streams images
- URLs are immutable

---

### 4.2 Minimal Secure Nginx Config

```nginx
server {
    listen 443 ssl http2;
    server_name images.example.com;

    root /data/images/variants;

    # Only allow static files
    location / {
        try_files $uri =404;

        access_log off;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Prevent hidden file access
    location ~ /\. {
        deny all;
    }

    # Disable methods
    if ($request_method !~ ^(GET|HEAD)$) {
        return 405;
    }
}
```

---

### 4.3 Security Headers (Images Only)

Optional but safe:

```nginx
add_header X-Content-Type-Options nosniff;
add_header Referrer-Policy same-origin;
```

Do NOT add CSP here (irrelevant for images).

---

## 5. Nginx: Upload Endpoint Protection

Uploads should **not** hit the same server block as static images.

```nginx
server {
    listen 443 ssl;
    server_name api.example.com;

    client_max_body_size 20m;

    location /upload/image {
        limit_req zone=upload burst=5 nodelay;

        proxy_pass http://backend;
        proxy_request_buffering on;
    }
}
```

---

### 5.1 Rate Limit Definition

```nginx
limit_req_zone $binary_remote_addr zone=upload:10m rate=1r/s;
```

Uploads are controlled. Serving is free.

---

## 6. Hotlinking & Bandwidth Control

If needed (later phase):

```nginx
valid_referers none blocked example.com *.example.com;

if ($invalid_referer) {
    return 403;
}
```

Only apply if bandwidth abuse occurs.

---

## 7. Cache Strategy (Strong by Design)

Because URLs are immutable:

- Cache forever
- No purging
- No version guessing

Headers:
```
Cache-Control: public, max-age=31536000, immutable
```

CDN (optional) will Just Work.

---

## 8. Observability (Minimum Signals)

Track:
- Upload failures by reason
- Decode failures
- Variant generation time
- Disk growth rate

Do NOT log every image request.

---

## 9. What This Design Explicitly Avoids

- Dynamic resize endpoints
- Query‑based transforms
- Backend image streaming
- Runtime CPU usage on hot paths
- Cache invalidation logic

---

## 10. Summary (Non‑Negotiables)

- Pre‑generate all variants
- libvips‑based processing
- Immutable URLs
- Static serving via Nginx
- Strict upload validation
- Decode isolation

This setup is **fast, predictable, and safe**.

It scales by adding disk + CDN, not complexity.


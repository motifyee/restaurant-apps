# Self-Hosted Image Platform – Advanced Design & Operations

This document extends the base image pipeline and backend guides into a **complete production system**, covering:

- Go-based reference implementation
- Job queue & worker isolation
- Storage evolution (local FS → object storage → CDN)
- Capacity planning & cost math
- Failure modes and recovery playbooks

The intent is to move from *correct architecture* to *operational maturity*.

---

## 1. Reframed Roadmap (Why This Order)

Instead of treating steps independently, they should be layered:

1. **Deterministic processing model** (workers, idempotency)
2. **Concrete Go reference implementation** (upload + async)
3. **Storage abstraction & migration path**
4. **Capacity math & scaling limits**
5. **Failure playbooks**

Each layer assumes the previous one is solid.

---

## 2. Worker & Job Queue Design (Foundation)

### 2.1 Design Goals

- Image processing must never block API threads
- Jobs must be replayable and idempotent
- Worker crashes must not corrupt state

---

### 2.2 Job Model

Each image upload produces **one logical job**:

```
ImageJob
- image_id
- version
- original_path
- formats[]
- sizes[]
- created_at
```

Rules:
- Jobs are immutable
- Re-running a job is always safe

---

### 2.3 Queue Options (Opinionated)

| Option | Use Case |
|-----|--------|
| In-process + DB | Small systems, single node |
| SQLite / Postgres queue | Early production |
| Redis | Medium scale |
| Kafka / NATS | High scale, multi-region |

Start simple. Design interfaces so queues are swappable.

---

### 2.4 Worker Isolation

Workers must:
- Run in separate process or container
- Have memory limits
- Have CPU quotas

Why:
> Image decoding is untrusted code execution.

---

### 2.5 libvips Invocation Pattern

Rules:
- One image decode per job
- Fan-out resize/encode from decoded buffer
- Free memory aggressively

Avoid:
- Fork-per-variant
- Pipelining multiple images per worker

---

## 3. Go-Based Reference Implementation

### 3.1 Upload API (Synchronous)

Responsibilities:
- Validate upload
- Persist original
- Create DB record
- Enqueue job

Never:
- Decode image
- Resize image

---

### 3.2 Async Worker (Go + libvips)

Flow:
1. Fetch job
2. Load original
3. Decode once
4. Generate all variants
5. Write to variant store
6. Mark job complete

Failures retry safely.

---

### 3.3 Pseudocode Skeleton

```go
func ProcessImage(job ImageJob) error {
    img := vips.Load(job.OriginalPath)
    defer img.Close()

    for _, size := range job.Sizes {
        resized := img.Resize(size)
        for _, fmt := range job.Formats {
            resized.Encode(fmt, outputPath(job, size, fmt))
        }
    }
    return nil
}
```

Error anywhere → retry whole job.

---

## 4. Storage Strategy & Migration Path

### 4.1 Phase 1: Local Filesystem

Use when:
- Single region
- Moderate traffic

Pros:
- Fast
- Simple

Cons:
- Node affinity
- Manual backups

---

### 4.2 Phase 2: Object Storage (S3-Compatible)

Introduce abstraction:

```
Storage.Put(path, reader)
Storage.Get(path)
```

Swap backend:
- Local FS → S3 / MinIO

Pros:
- Durability
- Horizontal scaling

---

### 4.3 Phase 3: CDN in Front

CDN sees:
- Immutable URLs
- Long TTLs

Backend sees:
- Fewer requests
- Predictable load

No code changes required.

---

## 5. Disk vs Object Storage Tradeoffs

| Concern | Local FS | Object Storage |
|------|---------|---------------|
| Latency | Lowest | Higher |
| Scaling | Manual | Automatic |
| Cost | Cheap | Pay-per-use |
| Ops | You manage | Provider manages |

Design once. Switch later.

---

## 6. Capacity Planning Math

### 6.1 Variant Explosion Formula

```
Total Variants = Images × Sizes × Formats
```

Example:
- 100k images
- 7 sizes
- 3 formats

→ **2.1M files**

---

### 6.2 Disk Usage Estimation

Typical photo:
- Original: 4 MB
- Variants (avg): 600 KB

```
Total ≈ Originals + Variants
Total ≈ 100k × (4MB + 0.6MB) ≈ 460 GB
```

Plan headroom ×2.

---

### 6.3 IO & Throughput

Processing:
- CPU-bound on upload
- Read-heavy on serve

Serving with CDN:
- 90–99% cache hit
- Backend IO near zero

---

## 7. Failure Playbooks (Critical)

### 7.1 Corrupt Upload

Detection:
- Decode failure

Action:
- Reject upload
- Mark image failed
- Notify client

Never retry.

---

### 7.2 Partial Variant Generation

Cause:
- Worker crash

Detection:
- Missing expected files

Action:
- Retry full job
- Overwrite variants

Idempotency saves you.

---

### 7.3 Storage Failure

Local FS:
- Stop uploads
- Serve cached images

Object storage:
- Rely on provider durability

---

## 8. Operational Maturity Checklist

- [ ] Immutable URLs
- [ ] Idempotent jobs
- [ ] Worker isolation
- [ ] Storage abstraction
- [ ] CDN in front
- [ ] Capacity math validated
- [ ] Failure playbooks documented

---

## 9. Final Positioning

This system is:
- Explicitly not "dynamic"
- Designed for correctness
- Optimized for cacheability
- Easy to scale operationally

It grows by **adding infrastructure**, not complexity.


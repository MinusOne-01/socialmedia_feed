# Social Media Feed Backend (Fanout-on-Write)

A backend service built around **feed generation**, **background job processing**, and **timeline data modeling** using a fanout-on-write strategy.

---

## 🎯 Purpose

This project was built to practice:

- Feed system design
- Fanout-on-write tradeoffs
- Background job processing with BullMQ
- Timeline-oriented data modeling
- Modular backend architecture

---

## 🔧 Tech Stack

- Node.js
- Express
- PostgreSQL
- Prisma
- Redis
- BullMQ

---

## 🏗️ Overview

The service implements core social media features and a **personalized feed system**.

Supported features:
- User registration
- Post creation
- Follow / unfollow users
- Like posts
- Comment on posts
- Personalized feed generation

---

## 📰 Feed Model (Fanout-on-Write)

This project uses a **fanout-on-write** approach.

### Flow
1. User creates a post
2. A fanout job is enqueued
3. A background worker processes the job
4. Feed rows are written for:
   - The post author
   - All followers

This shifts feed computation to write-time and makes feed reads fast.

---

## ⚡ Background Processing

- Post creation enqueues a feed fanout job
- A BullMQ worker consumes jobs and writes feed entries
- Feed generation happens asynchronously

---

## 📥 Feed API

- Feed API reads directly from the `Feed` table
- Results are hydrated with:
  - Post data
  - Author information
  - Like counts

This avoids expensive joins or aggregation during feed reads.

---


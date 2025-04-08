# Subscription Tracker API

## Overview
The Subscription Tracker API is a robust backend solution designed to manage user subscriptions, send automated reminders, and handle various backend operations. This project is built using Node.js, Express, MongoDB, and BullMQ for job queues.

## Features
- **User authentication and authorization** using JWT.
- **CRUD operations** for managing subscriptions.
- **Automated email reminders** for subscription renewals.
- **Custom rate limiting** for request management.
- **Secure and scalable architecture** with middleware for error handling.

## Installation

### Prerequisites
- **Node.js** (v14 or later)
- **MongoDB** (local or cloud-based)
- **Redis** (for job queue management)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/subscription-tracker.git
   cd subscription-tracker

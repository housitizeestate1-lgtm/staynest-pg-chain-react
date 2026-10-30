# StayNest — PG Chain Website

A responsive React + Vite starter website for a multi-location PG / co-living brand.

## Features
- Premium responsive landing page
- Search by Noida sector, resident category and monthly budget
- Property cards with amenities, rent and availability labels
- Property detail modal
- Save/favourite property interaction
- WhatsApp enquiry links (global and property-specific)
- Click-to-call phone links
- Locations section, benefits, contact details and footer

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP and open the project folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL shown by Vite.

## Important: customize before publishing
Open `src/main.jsx` and replace:
- `WHATSAPP_NUMBER` with your WhatsApp number in international digits format (India example: `919876543210`, no `+` or spaces).
- `CONTACT_PHONE` with your business phone number.
- The sample property data, rents, availability, amenities and location names in the `properties` array.
- Brand name “StayNest” with your own brand.
- Replace the sample Unsplash images with your own licensed property photos.

## Production build
Run `npm run build`. The optimized site is created in `dist/`.

## Current scope
This is a front-end starter. Property cards and filters use sample data in the browser. There is no backend, database, authentication, payment processing, live inventory sync or admin login yet. Those can be added as a separate backend/admin module.

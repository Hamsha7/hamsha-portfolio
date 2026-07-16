# Coding Profiles & Achievements Section

## Overview
This section displays your competitive programming presence with live statistics from LeetCode and HackerRank.

## Features Implemented

### LeetCode Integration
- **Username**: hamsha07
- **Profile URL**: https://leetcode.com/u/hamsha07/
- **Data Displayed**:
  - Total problems solved (with count-up animation)
  - Difficulty breakdown (Easy/Medium/Hard)
  - Current ranking
  - Badges earned
  - Last updated timestamp

### HackerRank Integration
- **Username**: Hamsha266
- **Profile URL**: https://www.hackerrank.com/profile/Hamsha266
- **Data Displayed**:
  - Badges earned
  - Certifications
  - Last updated timestamp

## API Implementation

### LeetCode
The component attempts to fetch data from:
1. **Primary**: Public LeetCode Stats API (`leetcode-api-faisalshohag.vercel.app`)
2. **Fallback**: LeetCode GraphQL API (may have CORS restrictions)
3. **Final Fallback**: Cached data or placeholder values

### HackerRank
- HackerRank doesn't have an official public API, so the component:
  1. Fetches from the internal REST profile API proxied through `api.allorigins.win` (to bypass CORS restrictions)
  2. Parses and maps the badge structure to render stars and names dynamically
  3. Falls back to cached data or placeholders if the service is unreachable

## Caching Strategy

- Data is cached in `localStorage` for 6 hours
- Stale data is still displayed with a warning
- Manual cache refresh happens on page load (if cache expired)

## Manual Data Update

If APIs don't work, you can manually update the cache:

```javascript
// Open browser console and run:

// For LeetCode
localStorage.setItem('leetcode_data', JSON.stringify({
  data: {
    total: 150,
    easy: 80,
    medium: 60,
    hard: 10,
    rank: 50000,
    badges: [],
    lastUpdated: new Date().toISOString()
  },
  timestamp: Date.now()
}))

// For HackerRank
localStorage.setItem('hackerrank_data', JSON.stringify({
  data: {
    badges: [
      { name: 'Problem Solving', stars: '★★★' },
      { name: 'Python', stars: '★★' },
      { name: 'Java', stars: '★★' }
    ],
    certificates: [],
    lastUpdated: new Date().toISOString()
  },
  timestamp: Date.now()
}))
```

## Production Recommendations

For production use, consider:

1. **Backend Proxy**: Create a backend service that:
   - Fetches data from LeetCode/HackerRank APIs
   - Caches results server-side
   - Provides a CORS-enabled endpoint for your frontend

2. **Third-party Services**: Use services like:
   - `leetcode-api-faisalshohag` (already implemented)
   - Custom scraping service
   - Webhook-based updates

3. **Manual Updates**: If APIs are unreliable, update localStorage manually periodically

## Design Features

- ✅ Animated stat cards with hover effects
- ✅ Count-up animations for numeric stats
- ✅ Smooth scale animations on hover
- ✅ Platform brand colors (Orange for LeetCode, Green for HackerRank)
- ✅ Responsive grid layout (2 columns desktop, 1 column mobile)
- ✅ Loading skeletons while fetching
- ✅ Error handling with fallback UI
- ✅ ARIA labels for accessibility
- ✅ Semantic HTML structure

## Social Links Updated

All social links have been updated with your actual profiles:
- **GitHub**: https://github.com/Hamsha7
- **LinkedIn**: https://www.linkedin.com/in/hamsha-n-93a2972a5
- **Instagram**: https://www.instagram.com/hamsha_26/

## Navigation

The new section is accessible via:
- Navigation bar: "Coding" link
- Direct URL: `#coding-profiles`
- Smooth scroll animation


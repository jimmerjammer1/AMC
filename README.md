# AMC Compliance Tracker

A web-based application for tracking AMC (Appraisal Management Company) compliance, E&O insurance renewals, and appraiser license renewals.

## Features

✅ **AMC Management**
- Track unlimited AMC clients
- Store contact information, websites, and costs
- Categorize AMCs by status (Active, Pending, No Longer in Business, Trash)
- Add activity notes with timestamps and status categories

✅ **Compliance Tracking**
- Per-appraiser, per-AMC, per-year tracking
- E&O Insurance renewal tracking (Annual - March 20)
- License renewal tracking (Biennial - November 30, even years only)
- Year selector (2026-2036)

✅ **Activity Logging**
- Add timestamped notes to any AMC
- 10+ status categories (Sent Email, No Response, Follow Up Needed, etc.)
- Filter notes by category
- Real-time note updates

✅ **Search & Filter**
- Search AMCs by name
- Filter by E&O completion status
- Filter by AMC status category
- Results counter

✅ **Firebase Integration**
- Cloud-based shared database
- Real-time sync across users
- No authentication required (configure security rules as needed)

## Quick Start

### Option 1: GitHub Pages Deployment

1. Fork or clone this repository
2. Enable GitHub Pages in repository settings
3. Select "main" branch and "/ (root)" folder
4. Access your site at: `https://[username].github.io/[repo-name]`

### Option 2: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init hosting
   ```

4. Deploy:
   ```bash
   firebase deploy
   ```

### Option 3: Local Development

Simply open `index.html` in any modern web browser. The app will connect to the Firebase database automatically.

## Firebase Configuration

The app is pre-configured with a Firebase project. To use your own Firebase database:

1. Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Replace the `firebaseConfig` object in `index.html` with your project's config
4. Set up Firestore security rules (see below)

### Firestore Security Rules

For production use, configure appropriate security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read/write (current setting)
    match /{document=**} {
      allow read, write: if true;
    }
    
    // Or restrict to authenticated users:
    // match /{document=**} {
    //   allow read, write: if request.auth != null;
    // }
  }
}
```

## Data Structure

### Collections

**appraisers**
```javascript
{
  id: string,  // e.g., "james-1"
  name: string // e.g., "James"
}
```

**amcs**
```javascript
{
  id: string,                    // e.g., "amc-1"
  name: string,                  // Company name
  website: string,               // URL
  email: string,                 // Contact email
  phone: string,                 // Phone number
  baseCost: string,              // Base appraisal cost
  status: string,                // Active, Pending, No Longer in Business, Trash
  approvedAppraisers: array,     // Array of appraiser IDs
  appraiserCompliance: object,   // { appraiserId: { eo2026: bool, license2026: bool, ... } }
  notes: array                   // [{ id, text, status, date }]
}
```

## Compliance Rules

- **E&O Insurance**: Renews annually on March 20
- **License Renewal**: Renews biennially on November 30 (even years only: 2026, 2028, 2030, etc.)
- Tracking is per-appraiser, per-AMC, per-year

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with ES6+ support

## Tech Stack

- React 18 (via CDN)
- Tailwind CSS
- Firebase/Firestore
- Lucide Icons
- Babel (JSX transform)

## License

MIT License - feel free to use and modify for your needs.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for appraisal compliance tracking

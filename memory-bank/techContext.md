# Technical Context: Hembra

## Tech Stack
- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Runtime**: Node.js (Windows PowerShell environment)

## TiendaNube API Integration

### API Configuration
- **Base URL**: `https://api.tiendanube.com/2025-03/{store_id}`
- **Version**: 2025-03 (official latest)
- **Authentication**: Bearer token via `Authentication` header (not `Authorization`)
- **User-Agent**: Required format: `tienda_demo (marianoberton.ds@gmail.com)`

### Authentication Details
```
STORE_ID: 6434140
CLIENT_ID: 19142
CLIENT_SECRET: baf820e29599a64063e56f03bfde784ae71b9d5000a0f46d
ACCESS_TOKEN: 262d4b661aa70dde3fa726ede3a95212fe63ff2e
```

### Key API Findings
1. **Authentication Header**: Must use `Authentication: bearer TOKEN` (not `Authorization`)
2. **API Versions**: 
   - `v1` returns array of products directly
   - `2025-03` returns wrapper object containing products
3. **User-Agent**: Mandatory - returns 400 without it
4. **Rate Limiting**: 40 requests burst, 2/second sustained

## Environment Variables (.env.local)
```
TN_STORE_ID=6434140
TN_ACCESS_TOKEN=262d4b661aa70dde3fa726ede3a95212fe63ff2e
NEXT_PUBLIC_TN_CLIENT_ID=19142
TN_CLIENT_SECRET=baf820e29599a64063e56f03bfde784ae71b9d5000a0f46d
```

## Dependencies
```json
{
  "dependencies": {
    "next": "15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^8",
    "eslint-config-next": "15.3.2",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

## Development Environment
- **OS**: Windows 10.0.26100
- **Shell**: PowerShell
- **Dev Server**: localhost:3000
- **Terminal Path**: C:\projects\hembra

## Build Configuration
- **Next.js**: App Router with TypeScript
- **Tailwind**: PostCSS integration
- **TypeScript**: Strict mode enabled 
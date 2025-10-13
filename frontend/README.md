# ethglobal-project
Verify once, Login anywhere

## Tech Stack

This is a modern Next.js 15 boilerplate with the following technologies:

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable UI components built with Radix UI
- **Lucide Icons** - Beautiful and consistent icon library
- **TanStack React Query** - Powerful data synchronization for React
- **Middleware** - Custom Next.js middleware for request processing

## Project Structure

```
├── app/
│   ├── api/              # API routes (backend)
│   │   └── hello/        # Example API endpoint
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Home page
│   └── providers.tsx     # React Query provider
├── components/
│   └── ui/               # shadcn/ui components
│       └── button.tsx    # Button component
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
├── public/               # Static assets
├── middleware.ts         # Next.js middleware
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.ts        # Next.js configuration
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint

Run ESLint:

```bash
npm run lint
```

## Features

### API Routes

API routes are located in `app/api/`. Example:

```typescript
// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello from the API!" });
}
```

### Middleware

The middleware file (`middleware.ts`) processes all requests and can be used for authentication, logging, redirects, etc.

### shadcn/ui Components

Add more shadcn/ui components using:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

### React Query

React Query is pre-configured in `app/providers.tsx`. Use it for data fetching:

```typescript
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await fetch("/api/hello");
      return res.json();
    },
  });
}
```

### Lucide Icons

Import and use Lucide icons anywhere:

```typescript
import { Shield, Lock, Key } from "lucide-react";

<Shield className="w-6 h-6" />
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)


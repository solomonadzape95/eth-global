import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Add custom headers
  const response = NextResponse.next();
  const {pathname} = request.nextUrl
if(pathname.includes("/dashboard")){

  // Check for wallet connection using wagmi.store cookie
  const cookies = request.cookies;
  const wagmiStoreCookie = cookies.get("wagmi.store");
  let isWalletConnected = false;
  let connectedAddress = null;
  if (wagmiStoreCookie) {
    try {
      const wagmiStore = JSON.parse(wagmiStoreCookie.value);
      const connectionsMap = wagmiStore?.state?.connections;
      if (connectionsMap && connectionsMap.__type === "Map" && Array.isArray(connectionsMap.value)) {
        // Check if there is at least 1 connection (the array has length > 0)
        if (connectionsMap.value.length > 0) {
          isWalletConnected = true;
          // Optionally extract the first connected address
          connectedAddress = connectionsMap.value[0][1]?.accounts?.[0] || null;
        }
      }
    } catch (e) {
      // ignore malformed cookie
    }
  }
  // Set a response header indicating wallet connection status
  response.headers.set("x-wallet-connected", isWalletConnected ? "true" : "false");
  if (connectedAddress) {
    response.headers.set("x-wallet-address", connectedAddress);
  }
  if(!isWalletConnected){
    console.log("not connected")
    return NextResponse.redirect(new URL("/", request.url))
  }else{
    console.log("yes connected")
    return NextResponse.next( )
  }
}
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)", '/dashboard/(.*)'
  ],
};
